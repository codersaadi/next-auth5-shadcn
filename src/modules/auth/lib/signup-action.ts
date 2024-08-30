"use server";
import { db } from "@/lib/db";
import { MessageResponse } from "../types/auth";
import { hashMyPassword, sendEmailVerification } from "./common";
import {  SignupSchema, SignupSchemaType } from "../auth.schema";
import { createVerificationToken } from "../data";

export async function signUpAction(
  data: SignupSchemaType,
): Promise<MessageResponse> {
  const validate = SignupSchema.safeParse(data);

  if (!validate.success) {
    return {
      message: validate.error.errors[0].message || "Invalid credentials",
      success: false,
    };
  }
  const { email, password, name } = validate.data;
  try {
    const userExists = await db.user.findUnique({
      where: { email },
    });
    if (userExists)
      return {
        message: "User already exists",
        success: false,
      };

    // Hash the password
    const hashedPassword = await hashMyPassword(password);
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const token = await createVerificationToken(email);
    if (!token) return { message: "Something went wrong!", success: false };
    await sendEmailVerification(email, token?.token);
    return { message: "Confirmation Email Sent", success: true };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred during sign up",
      success: false,
    };
  }
}
