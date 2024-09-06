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
import { LoadingSpinner } from '@/components/Spinner';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
export default function ForgotPasswordForm() {
  const {executeRecaptcha} = useGoogleReCaptcha()
  const {form , isPending ,onSubmit, message} = useFormSubmit({
    schema : ForgotPasswordSchema,
    onSubmitAction : forgotPasswordAction,
    defaultValues :{
      "email" : ""
    },
    captcha :{
      enableCaptcha: true,
      executeRecaptcha,
      action: "forgotpassword_form",
      tokenExpiryMs: 120000,
    }

  })
    return (
        <>
        <h2 className="text-2xl font-bold mb-2">Reset Your Password</h2>
      <Form {...form}>
      <form onSubmit={onSubmit}>
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
         <Button disabled={isPending} type='submit' className='w-full mt-2 rounded-full'>
            {isPending ?   (<>
              Resetting Password
              <LoadingSpinner />
            </>)  : "Confirm Reset Password"}
          </Button>
      </form>
      </Form>
    </>
  )
}
