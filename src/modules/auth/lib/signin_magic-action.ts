"use server";
import {
  isRedirectError,
  RedirectError,
} from "next/dist/client/components/redirect";
import { HOST } from "@/constants";
import { reCaptchaSiteVerify } from "./recaptcha";
import { MagicSignInType } from "../auth.schema";
import { signIn } from "@/auth";
import { CaptchaActionOptions } from "../types/captcha";

export async function signinMagic(
  data: MagicSignInType,
  captchaOptions : CaptchaActionOptions
) {
  try {
    
    const googleResponse = await reCaptchaSiteVerify(captchaOptions);

    if (!googleResponse.success) {
      return {
        message: googleResponse.message,
        success: false,
      };
    }
    await signIn("http-email", { email: data.email });
     

    return {
      message: `An email link has been sent to ${data.email}. Please check your inbox.`,
      success: true,
    };
  } catch (error) {
    if (isRedirectError(error)) handleSignInRedirectError(error, data);
    return {
      message: error instanceof Error ? error.message : "Failed to Send Email",
      success: false,
    };
  }
}

const handleSignInRedirectError = (
  error: RedirectError<string>,
  data: MagicSignInType
) => {
  let digest = error.digest;
  const replace = "NEXT_REDIRECT;replace;";
  const isNotFound = replace + HOST + "/auth/signup;303;" === error.digest;
  const successDigest =
    replace +
    HOST +
    "/api/auth/verify-request?provider=http-email&type=email;303;";
  const isSuccess = error.digest === successDigest;
  if (isNotFound)
    digest = replace + `${HOST}/auth/signup?callbackError=badSignInEmail&email=${data.email}&at=${(new Date).toLocaleTimeString()};303`;
  else if (isSuccess) {
    digest =
      replace +
      `${HOST}/auth/verify-request?email=${data.email}&provider=http-email&type=email;303`;
  }

  let err = { ...error, digest };
  throw err;
};
