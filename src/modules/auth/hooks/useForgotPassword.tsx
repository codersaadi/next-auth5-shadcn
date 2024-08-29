'use client'
import {useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ForgotPasswordSchema, ResetPasswordSchema } from '../auth.schema';

export const useForgotPassword = () => {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues : {
      email : '',
    },
  });
  
  return form;
};
export const useResetPassword = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues : {
      password : '',
      confirmPassword : '',
    },
  });
  
  return form;
}


