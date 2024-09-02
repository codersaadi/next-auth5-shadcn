"use client"
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import React, {useState} from 'react'
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {  EyeOpenIcon as EyeIcon, EyeClosedIcon as EyeOff } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button';
import { ResetPasswordSchema } from '../auth.schema';
import FormFeedback from './FormFeedback';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { resetPasswordAction } from '../lib/forgot-password';
import { LoadingSpinner } from '@/components/Spinner';
export default function NewPasswordForm({token} : {
    token?: string
}) {

  const [showPassword ,setShowPassword] = useState(false)
const {form, isPending, message, onSubmit} = useFormSubmit(ResetPasswordSchema, {
  password : "",
  confirmPassword :""
})
const submitAction = onSubmit(async (data) => {
  if (!token) return {message : "token not found", success : false}
  return await resetPasswordAction(token, data) 
})
    return (
        <>
        <h2 className="text-2xl font-bold mb-2">Reset Your Password</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(submitAction)}>
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
         <Button disabled={isPending} type='submit' className='w-full mt-2 rounded-full'>
            {isPending ?   (<>
              Changing Password
              <LoadingSpinner />
            </>)  : "Change Password"}
          </Button>
      </form>
      </Form>
    </>
  )
}
