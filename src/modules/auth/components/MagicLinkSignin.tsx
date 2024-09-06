"use client"
import { useFormSubmit } from '@/hooks/useFormSubmit'
import React from 'react'
import { MagicSignInSchema } from '../auth.schema'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import FormFeedback from './FormFeedback'
import { AvatarIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/Spinner'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { signinMagic } from '../lib/signin_magic-action'
export default function MagicLinkSigninForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const { isPending, form, message, onSubmit, captchaValidating } = useFormSubmit(MagicSignInSchema, {
    email: ""
  },
    {
      enableCaptcha: true,
      executeRecaptcha,
      action: "email_signin"
    }
  )
  const submitAction = onSubmit(signinMagic)

  return (
    <>
      <h2 className='font-semibold'>
        SignIn with Email
      </h2>

      <Form {...form}>
        <form className='py-4' onSubmit={form.handleSubmit(submitAction)}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input disabled={isPending} placeholder='Email' type='email' {...field} className='' />
                    <AvatarIcon className={cn(`top-2 w-5 h-5 right-2 absolute`)} />
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.email?.message} />
              </FormItem>
            )}
          />
          <Button disabled={captchaValidating || isPending} type='submit' className='w-full mt-2 rounded-full'>
            {captchaValidating || isPending ? (<>
              {captchaValidating ? "Performing security check..." : "Sending Email"}
              <LoadingSpinner />
            </>) : "Sign In With Email"}
          </Button>
        </form>
        {message &&
          <FormFeedback message={message.message} type={message.type} />
        }
      </Form>
    </>
  )
}
