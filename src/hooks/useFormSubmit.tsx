"use client";
import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import * as z from 'zod';
import { MessageResponse } from '@/modules/auth/types/auth';

type FormMessage = {
  type: 'error' | 'success';
  message: string;
};

interface CaptchaOptions {
  enableCaptcha: boolean;
  executeRecaptcha?: (action?: string) => Promise<string>;
  action?: string;
}

export const useFormSubmit = <T extends z.ZodSchema<any>>(
  schema: T,
  defaultValues: z.infer<T>,
  captcha?: CaptchaOptions
) => {
  const form: UseFormReturn<z.infer<T>> = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [captchaValidating , setCaptchaValidating] = useState(false)
  const [message, setMessage] = useState<FormMessage>({ type: 'error', message: '' });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (
    action: (data: z.infer<T>, captchaToken?: string, captchaAction?: string) => Promise<{ success: boolean; message: string }>
  ) => {

    const setResponseMessage = (res: MessageResponse) => {
      if (res && 'success' in res && 'message' in res) {
        setMessage({
          type: res.success ? 'success' : 'error',
          message: res.message,
        });
      }
    };

    return async (data: z.infer<T>) => {
      setMessage({ type: 'error', message: '' });

      // Perform async CAPTCHA validation before the transition
      let captchaToken: string | undefined;

      if (captcha?.enableCaptcha) {
        if (!captcha.executeRecaptcha) {
          setMessage({ message: 'Captcha not available', type: 'error' });
          return;
        }
       setCaptchaValidating(true)
        try {
          captchaToken = await captcha.executeRecaptcha(captcha.action || 'default_action');
        } catch (error) {
          setMessage({ message: 'Captcha verification failed', type: 'error' });
          return;
        } finally{ setCaptchaValidating(false)}
      }
      startTransition(() => {
        action(data, captchaToken, captcha?.action).then(setResponseMessage);
      });
    };
  };

  return { form, message, isPending, onSubmit, captchaValidating };
};
