'use client'
import * as z from 'zod';
import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { EyeClosedIcon, EyeOpenIcon, AvatarIcon,EnvelopeOpenIcon } from '@radix-ui/react-icons'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignupSchema } from '../auth.schema';
import { signUpAction } from '../lib/signup-action';
import AuthProvidersCTA from './AuthProvidersCTA';
import FormFeedback from './FormFeedback';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { LoadingSpinner } from '@/components/Spinner';
const SignUpForm: React.FC = () => {
  const [showPassword ,setShowPassword] = useState(false)
   const {form, message , isPending, onSubmit} = useFormSubmit(SignupSchema, {
    email : '',
    password : '',
    name : ''
   })

  return (
    <>
      <h2 className="text-2xl font-bold">Create a New Account</h2>
      <Form  {...form} >
        <form className='flex flex-col p-1 ' onSubmit={form.handleSubmit(onSubmit(signUpAction))}  >
        <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Name
                </FormLabel>
                <FormControl>
                  <div className="relative ">
                    <Input disabled={isPending} placeholder='Name' type='text' {...field} />
                    <AvatarIcon className={cn(`top-2 right-2 w-5 h-5 absolute`)} />
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.name?.message} />
              </FormItem>
            )}
          /><FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem >
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <div className="relative ">
                  <Input disabled={isPending} placeholder='Email' type='email' {...field} />
                  <EnvelopeOpenIcon className={cn(`top-2 right-2 w-5 h-5 absolute`)} />
                </div>
              </FormControl>
              <FormFeedback type="error" message={form.formState.errors.email?.message} />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl >
                  <div className='relative' >
                    <Input disabled={isPending} className={cn(``)} placeholder='********' type={showPassword ?"text" :"password"} {...field} />
                   <span className={cn(`top-2 hover:text-sky-500 cursor-pointer
         right-2 absolute`)} onClick={()=> setShowPassword(!showPassword)}>
                   {showPassword ? <EyeOpenIcon className='w-5 h-5' /> : <EyeClosedIcon  className='w-5 h-5'/>  }
                   </span>
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.password?.message} />
              </FormItem>
            )}
          />
         {message &&  <FormFeedback
            type={message.type}
            message={message.message}
          />}


<Button disabled={isPending} type='submit' className='w-full rounded-full mt-2'>
            {isPending ?   (<>
           Signing Up
              <LoadingSpinner />
            </>)  : "Sign Up"}
          </Button>
        </form>
        <p className='mt-2'>
          <Link className=' mr-2 text-sm underline' href={'/auth/signin'}>
           Aleady Have an Account?
          </Link>
        </p>
    
      </Form>
      <AuthProvidersCTA />
    </>
  );
};

export default SignUpForm;


