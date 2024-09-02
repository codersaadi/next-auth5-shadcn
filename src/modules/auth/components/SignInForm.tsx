'use client'
import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { EyeClosedIcon, EyeOpenIcon, AvatarIcon } from '@radix-ui/react-icons'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoginSchema } from '../auth.schema';
import { signInAction } from '../lib/signin-action';
import AuthProvidersCTA from './AuthProvidersCTA';
import FormFeedback from './FormFeedback';
import { useFormSubmit } from '@/hooks/useFormSubmit';
import { LoadingSpinner } from '@/components/Spinner';
const MagicLinkSigninForm = React.lazy(()=> import("@/modules/auth/components/MagicLinkSignin"))


const SignInForm: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false)
  const { form, onSubmit, isPending, message } = useFormSubmit(LoginSchema, {
    email: '',
    password: ''
  })
  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Sign In to Continue</h2>
      <Form  {...form} >
        <form className='flex flex-col gap-1' onSubmit={form.handleSubmit(onSubmit(signInAction))}  >
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
                    <Input disabled={isPending} className='' placeholder='*********' type={showPassword ? "text" : "password"} {...field} />
                    <span className={cn(`top-2  hover:text-sky-500 cursor-pointer
         right-2 absolute`)} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOpenIcon className='w-5 h-5' /> : <EyeClosedIcon className='w-5 h-5' />}
                    </span>
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.password?.message} />
              </FormItem>
            )}
          />
          <FormFeedback
            type={message.type}
            message={message.message}
          />

          <Link className='text-sm text-gray-500' href={'/auth/forgot-password'}>
            Forgot Password?
          </Link>
          <Button disabled={isPending} type='submit' className='w-full rounded-full'>
            {isPending ?   (<>
           Signing In
              <LoadingSpinner />
            </>)  : "Sign In"}
          </Button>
     
        </form>
   
      </Form>

    </>
  );
};


const SignInComponent = ({searchParams} :{
  searchParams : Record<string , number | string | null>
}) => {
  const [withCredentials, setWithCredentials] = useState(searchParams["signin-with-link"] ? false : true);

  const onSignInTypeChange = () => setWithCredentials(!withCredentials);

  const changeButtonTitle = withCredentials
    ? "Sign In With Magic Link"
    : "Sign In With Credentials";

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex transition-transform duration-500 ease-in-out ${
          withCredentials ? 'translate-x-0' : '-translate-x-1/2'
        }`}
        style={{ width: '200%' }} // Ensure the container is wide enough for both forms
      >
        <div className="w-1/2 p-1 flex-shrink-0">
          <SignInForm />
        </div>
        <div className="w-1/2 p-1 flex-shrink-0">
     <Suspense fallback={<div></div>}>
     <MagicLinkSigninForm />
     </Suspense>
        </div>
      </div>
      <p className='mt-2'>
          <Link className=' mr-2' href={'/auth/signup'}>
            Create an Account!
          </Link>
          <span className='opacity-70'>
            if you don&apos;t have one.
          </span>
        </p>
      <Button
        onClick={onSignInTypeChange}
        variant="outline"
        className="w-full rounded-full mt-3"
      >
        {changeButtonTitle}
      </Button>
      <AuthProvidersCTA />
    </div>
  );
};

export default SignInComponent;
