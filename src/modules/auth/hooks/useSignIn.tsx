'use client'
import {useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginSchema } from '../auth.schema';

export const useSignIn = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues : {
      email : '',
      password : ''
    },
  });
  
  return form;
};




