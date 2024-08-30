"use client"
import { Form,  FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import React from 'react'
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { forgotPasswordAction } from '../lib/forgot-password';
import { ForgotPasswordSchema } from '../auth.schema';
import FormFeedback from './FormFeedback';
import { useFormSubmit } from '@/hooks/useFormSubmit';
export default function ForgotPasswordForm() {
  const {form , isPending ,onSubmit, message} = useFormSubmit(ForgotPasswordSchema, {
    email : ""
  })
    return (
        <>
        <h2 className="text-2xl font-bold mb-2">Reset Your Password</h2>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit(forgotPasswordAction))}>
      <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem >
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl >
                  <div className='relative' >
                    <Input disabled={isPending} className={cn(``)} placeholder='xyz@yourmail.com' type={"email"} {...field} />
       
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.email?.message} />
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