"use client"
import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import * as z from 'zod';

type FormMessage = {
  type: 'error' | 'success';
  message: string;
};

export const useFormSubmit = <T extends z.ZodSchema<any>>(schema: T, defaultValues: z.infer<T>) => {
  const form: UseFormReturn<z.infer<T>> = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [message, setMessage] = useState<FormMessage>({ type: 'error', message: '' });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (action: (data: z.infer<T>) => Promise<{ success: boolean; message: string }>) => {
    return (data: z.infer<T>) => {
      setMessage({ type: 'error', message: '' });
      startTransition(() => {
        action(data).then(res => {
          if (res && "success" in res && "message" in res) {
            setMessage({
              type: res.success ? 'success' : 'error',
              message: res.message,
            });
          }
        });
      });
    };
  };

  return { form, message, isPending, onSubmit };
};
