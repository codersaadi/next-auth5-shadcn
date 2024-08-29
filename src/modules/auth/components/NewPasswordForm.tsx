"use client"
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import React, {useState, useTransition} from 'react'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {  EyeOpenIcon as EyeIcon, EyeClosedIcon as EyeOff } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button';
import { useResetPassword } from '../hooks';
import { ResetPasswordSchema } from '../auth.schema';
import { resetPasswordAction } from '../lib/forgot-password';
import FormFeedback from './FormFeedback';
export default function NewPasswordForm({token} : {
    token?: string
}) {

  const [showPassword ,setShowPassword] = useState(false)
 const form = useResetPassword();
 const [message, setMessage] = React.useState<{
    type: 'error' | 'success';
    message: string
  }>({
    type: 'error',
    message: ''
  })
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    setMessage({type : 'error', message: ''})
   if (!token) {
    setMessage({
      type: 'error',
      message: 'Invalid token'
    })  
    return 
  }
    startTransition(() => {
      resetPasswordAction(token , data).then(res=>  setMessage({
        type: res.success ? "success" : "error",
        message: res.message
      }))
    });

  }
    return (
        <>
        <h2 className="text-2xl font-bold mb-2">Reset Your Password</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                   <span className={cn(`top-2 z-50 hover:text-sky-500 cursor-pointer
         right-2 absolute`)} onClick={()=> setShowPassword(!showPassword)}>
                   {!showPassword ? <EyeIcon className='w-5 h-5'/> : <EyeOff className='w-5 h-5'  />  }
                   </span>
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.password?.message} />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Confirm Password
                </FormLabel>
                <FormControl >
                  <div className='relative' >
                    <Input disabled={isPending} className={cn(``)} placeholder='********' type={showPassword ?"text" :"password"} {...field} />
                   <span className={cn(`top-2 z-50 hover:text-sky-500 cursor-pointer
         right-2 absolute`)} onClick={()=> setShowPassword(!showPassword)}>
                   {showPassword ? <EyeIcon className='w-5 h-5' /> : <EyeOff className='w-5 h-5'  />  }
                   </span>
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.confirmPassword?.message} />
              </FormItem>
            )}
          />
         {message &&  <FormFeedback type={message.type} message={message.message} />}
          <Button className={cn(`mt-2 w-full disabled:bg-gray-600`)} type='submit' disabled={isPending} >Reset Password</Button>
      </form>
      </Form>
    </>
  )
}
