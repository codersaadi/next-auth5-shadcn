'use client'
import {useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SignupSchema } from '../auth.schema';

export const useSignUp = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues : {
      email : '',
      password : '',
      name : ''
    },
  });
  
  return form;
};


