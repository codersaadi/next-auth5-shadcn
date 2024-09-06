"use client";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import React from "react";
import { MagicSignInSchema } from "../auth.schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import FormFeedback from "./FormFeedback";
import { AvatarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { LoadingSpinner } from "@/components/Spinner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { signinMagic } from "../lib/signin_magic-action";

export default function MagicLinkSigninForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isPending, form, message, onSubmit, captchaState } = useFormSubmit({
      schema: MagicSignInSchema,
      captcha: {
        enableCaptcha: true,
        executeRecaptcha,
        action: "email_signin",
        tokenExpiryMs: 120000,
      },
      onSubmitAction: signinMagic,
      defaultValues: {
        "email": ""
      }}
  );

  return (
    <>
      <h2 className="font-semibold text-xl text-center">Sign In with Email</h2>

      <Form {...form}>
        <form className="py-6 space-y-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      disabled={isPending || captchaState.validating}
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      className="rounded-md px-4 py-2"
                    />
                    <AvatarIcon className={cn(`top-2 w-5 h-5 right-3 absolute text-gray-400`)} />
                  </div>
                </FormControl>
                <FormFeedback type="error" message={form.formState.errors.email?.message} />
              </FormItem>
            )}
          />

          <Button
            disabled={captchaState.validating || isPending}
            type="submit"
            className={cn(
              "w-full mt-2 rounded-full transition-all duration-200",
              {
                " ": isPending || captchaState.validating,
                "bg-violet-600  text-white hover:bg-violet-800": !isPending && !captchaState.validating,
              }
            )}
          >
            {captchaState.validating || isPending ? (
              <div className="flex  justify-center items-center space-x-2">
                <CheckCircledIcon className="w-6 h-6 animate-pulse " />
                <span className="text-sm">
                  {captchaState.validating ? "Verifying security... Hold tight!" : "Sending Email..."}
                </span>
                {captchaState.validating && <LoadingSpinner />}
              </div>
            ) : (
              "Sign In With Email"
            )}
          </Button>
        </form>

        {/* Show a subtle progress bar during CAPTCHA validation */}
        {captchaState.validating && (
          <div className="w-full bg-gray-200 rounded-full mt-4">
            <div className="bg-blue-500 h-2 rounded-full animate-loading-bar" />
          </div>
        )}

        {/* Feedback message */}
        {message && (
          <div className="mt-4">
            <FormFeedback message={message.message} type={message.type} />
          </div>
        )}
      </Form>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
