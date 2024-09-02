"use client"
import { useFormSubmit } from '@/hooks/useFormSubmit'
import React, { useEffect, useState } from 'react'
import { MagicSignInSchema } from '../auth.schema'
import { signIn } from '@/auth'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import FormFeedback from './FormFeedback'
import { AvatarIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signinMagic } from '../lib/signin-action'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { HOST } from '@/constants'
import { LoadingSpinner } from '@/components/Spinner'
export default function MagicLinkSigninForm() {
  const { isPending, form, message, onSubmit } = useFormSubmit(MagicSignInSchema, {
    email: ""
  })
 
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
          <Button disabled={isPending} type='submit' className='w-full mt-2 rounded-full'>
            {isPending ?   (<>
            Sending Email
              <LoadingSpinner />
            </>)  : "Sign In With Email"}
          </Button>
        </form>
{message && <MagicLinkFormMessage message={message}/>}
      </Form>
    </>
  )
}

const MagicLinkFormMessage = ({message} :{message  :  {message : string, type : "error" | "success"}}) =>{
 const router =  useRouter()
  useEffect(() => {
    if (message && message.message) {
      const error = JSON.parse(message.message)
     const isRedirect = error?.digest ===  `NEXT_REDIRECT;replace;${HOST}/api/auth/verify-request?provider=http-email&type=email;303;`
      if (isRedirectError(error)) {
        if (!isRedirect) {
          toast({
            title: "User may not exist or verified,Sign Up First",
            variant: message.type === "error" ? "destructive" : "default"
          })
        }
      }
      throw error
    }
  }, [message])
  return null
}