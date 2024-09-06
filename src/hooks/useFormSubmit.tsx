"use client";
import React, { useState, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import * as z from 'zod';
import { MessageResponse } from '@/modules/auth/types/auth';
import { CaptchaActionOptions } from '@/modules/auth/types/captcha';
import { isRedirectError } from 'next/dist/client/components/redirect';

type FormMessage = {
  type: 'error' | 'success';
  message: string;
};

interface CaptchaOptions {
  enableCaptcha: boolean;
  executeRecaptcha?: (action?: string) => Promise<string | undefined | null>;
  action?: string;
  tokenExpiryMs?: number;
}

interface FormSubmitProps<T extends z.ZodSchema<any>> {
  schema : T,
  defaultValues: z.infer<T>,
  onSubmitAction : (data: z.infer<T>, captchaOptions: CaptchaActionOptions) => Promise<MessageResponse>,
  captcha?: CaptchaOptions,   
}


export const useFormSubmit = <T extends z.ZodSchema<any>>(
  props : FormSubmitProps<T>
) => {
  const {schema, defaultValues, captcha, onSubmitAction} = props
  const initialCaptchaState = {
    validating: false,
    token: '',
    tokenTimestamp: Date.now(),
  };
  
  const form: UseFormReturn<z.infer<T>> = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [captchaState, setCaptchaState] = useState(initialCaptchaState);
  const [message, setMessage] = useState<FormMessage | null>(null); // Use null to signify no message
  const [isPending, startTransition] = useTransition();

  const refreshCaptcha = async (): Promise<string | undefined | null> => {
    if (captcha?.enableCaptcha && captcha.executeRecaptcha) {
      setCaptchaState(prev => ({ ...prev, validating: true }));
      try {
        const token = await captcha.executeRecaptcha(captcha.action || 'default_action');
        if (!token) {
          setMessage({ message: "Error Getting Captcha", type: "error" });
          return null; // Early return to prevent submission
        }
        setCaptchaState({
          token,
          tokenTimestamp: Date.now(),
          validating: false,
        });
        return token;
      } catch (error) {
        console.error("Error refreshing CAPTCHA:", error);
        setMessage({ message: 'Captcha verification failed', type: 'error' });
        setCaptchaState(prev => ({ ...prev, validating: false }));
        return null;
      }
    }
    return null;
  };

  const isCaptchaInvalid = (): boolean => {
    const now = Date.now();
    const invalid = !captchaState.token || (now - captchaState.tokenTimestamp > (captcha?.tokenExpiryMs || 120000));
    if (invalid) {
      setCaptchaState(initialCaptchaState);
    }
    return invalid;
  };

  useEffect(() => {
    if (captcha?.enableCaptcha && isCaptchaInvalid()) {
      refreshCaptcha();
    }
  }, [captchaState.token, captcha?.tokenExpiryMs, captcha?.enableCaptcha]);

  const onSubmit = (
    action: (data: z.infer<T>, captchaOptions: CaptchaActionOptions) => Promise<MessageResponse>
  ) => {
    const setResponseMessage = (res: MessageResponse) => {
      if (res && "success" in res) {
        setMessage({
          type: res.success ? 'success' : 'error',
          message: res?.message || "",
        });
        if (captcha?.enableCaptcha) {
          setCaptchaState(initialCaptchaState);
        }
      }
    };

    return async (data: z.infer<T>) => {
      setMessage(null); // Clear previous messages

      let captchaToken: string | undefined | null = captchaState.token;

      if (captcha?.enableCaptcha) {
        if (!captcha.executeRecaptcha) {
          setMessage({ message: 'Captcha not available', type: 'error' });
          return;
        }

        if (isCaptchaInvalid()) {
          console.log('Token expired, refreshing CAPTCHA');
          captchaToken = await refreshCaptcha();
          if (!captchaToken) return; // Return if CAPTCHA refresh failed
        }
      }

      startTransition(() => {
        action(data, {
          token: captchaToken || '',
          tokenExpiryMs: captcha?.tokenExpiryMs || 120000,
          action: captcha?.action,
        }).then(setResponseMessage)
          .catch((error) => {
            if (isRedirectError(error)) return
            console.error('Submission Error:', error);
            setMessage({ type: 'error', message: 'Submission failed. Please try again.' });
          });
      });
    };
  };
 
  return { form, message, isPending, onSubmit : form.handleSubmit(onSubmit(onSubmitAction)), captchaState };
};
