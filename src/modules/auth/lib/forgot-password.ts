"use server"

import { ForgotPasswordSchema, ForgotPasswordSchemaType, ResetPasswordSchema, ResetPasswordSchemaType } from "../auth.schema";
import { z } from "zod";
import { MessageResponse } from "../types/auth";
import { db } from "@/lib/db";
import { hashMyPassword, sendResetPasswordEmail } from "./common";
import ResetTokenRepo from "../data/resetpassword-token";
import userRepository from "../data/user";


export async function forgotPasswordAction(  data: ForgotPasswordSchemaType) : Promise<MessageResponse> {
    try {
        const validate = ForgotPasswordSchema.safeParse(data);
    if (!validate.success) {
        return {
        message: validate.error.errors[0].message || "Invalid email",
        success: false,
        };
    }
    const { email } = validate.data;
    // send email with reset password link
    const existingUser = await  userRepository.getUserByEmail(email);
    if (!existingUser) {
        return {
        message: "user not found",
        success: false,
        };
    }
   if (!existingUser?.password) {
    // means the user signed up with social media
    return {
        message : "this account requires social media login or it does not exist",
        success: false
    }
   }
    const token = await ResetTokenRepo.createResetPasswordToken(email);
    if (!token) {
        return {
        message: "Something went wrong",
        success: false,
        };
    }
    await sendResetPasswordEmail(email, token?.token);

    return {
        message: "Email Sent Successfully",
        success: true,
    };
    } catch (error) {
     return {
        message: "Something went wrong",
        success: false,
     }
    }
    }





export async function resetPasswordAction(token: string, data : ResetPasswordSchemaType) : Promise<MessageResponse> {
 try {
     
    
    const validate = ResetPasswordSchema.safeParse(data);
    if (!validate.success) {
        return {
        message: validate.error.errors[0].message || "Invalid password",
        success: false,
        };
    }
  const {
    password,
    confirmPassword
  } = validate.data;

    if (password !== confirmPassword) {
        return {
        message: "Passwords do not match",
        success: false,
        };
    }
    const tokenExists = await ResetTokenRepo.getResetPasswordTokenByToken(token);
    
    if (!tokenExists) {
        return {
        message: "Invalid token",
        success: false,
        };
    }

    // update password
    const user = await userRepository.getUserByEmail(tokenExists.email);
    if (!user) {
        return {
        message: "User not found",
        success: false,
        };
    }
    const hashedPassword = await hashMyPassword(password);
    await db.user.update({
        where: {
        email: tokenExists.email,
        },
        data: {
        password: hashedPassword,
        },
    })
    
     

    return {
        message: "Password Updated Successfully",
        success: true,
    }
 } catch (error) {
    return {
        message: "Something went wrong",
        success: false
    }
 }
}