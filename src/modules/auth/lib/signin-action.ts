"use server";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { MessageResponse } from "../types/auth";
import {  sendEmailVerification } from "./common";



export async function signInAction(
    data: LoginSchemaType,
  ): Promise<MessageResponse> {
      const validate = await LoginSchema.safeParseAsync(data);
      if (!validate.success) {
          return {
              message: validate.error.errors[0].message,
        success: false,
    };
}

const { email, password } = validate.data;
const user = await db.user.findUnique({
    where: { email },
});
const ERROR_INVALID_CREDENTIALS = "Invalid credentials";  
// if user is not found or email or password is not provided
if (!user || !user.email || !user.password) {
    return {
        message: ERROR_INVALID_CREDENTIALS,
        success: false,
    };
}
// if user is not verified
if (!user.emailVerified) {
    const token = await createVerificationToken(email);
    if (!token) return { message: "Something went wrong!", success: false };
    await sendEmailVerification(email, token?.token);
    return {
        message: "Confirmation Email Sent",
        success: true,
      };
    }
    try {
     await signIn("credentials", {
        email,
        password,
      });

      
      return {
        message: "Sign In Sucessfully",
        success: true,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { message: ERROR_INVALID_CREDENTIALS, success: false };
          default:
            return { message: "Something went wrong!", success: false };
        }
      }
  
      throw error;
    }
  }
  


  import {  signOut } from "@/auth";
import { LoginSchema, LoginSchemaType, MagicSignInType } from "../auth.schema";
import { createVerificationToken } from "../data";
import { isRedirectError } from "next/dist/client/components/redirect";
export { signOut };


export async function signinMagic(data : MagicSignInType){
  try {
     await signIn("http-email", { email : data.email})
         return {
      message : `Email Link Sent to ${data.email}`,
      success : true
    }
  } catch (error) {
    // let message = "";
    // if (isRedirectError(error)) { 
    //  throw error
    // }
    //  if (error instanceof AuthError && error.type === "AccessDenied" ) {
      // message =   MAGIC_NOT_FOUND_ERROR
    // } 
    // if (error instanceof Error) {   
      // message = error.message
    // }
      return {
          message: JSON.stringify(error),
          success : false
      }
  }
}