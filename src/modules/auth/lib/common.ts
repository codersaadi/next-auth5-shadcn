import { EmailService } from "@/modules/auth/services/mail.sender";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
export async function sendEmailVerification(email: string, token: string) {
    const verificationLink = `http://localhost:3000/auth/email_verify?token=${token}`;
    const sender = new EmailService();
    await sender.sendVerificationEmail(email, verificationLink);
  }
  
export const hashMyPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}


export async function sendResetPasswordEmail(email: string, token : string) {
  const sender = new EmailService()
  const link = `http://localhost:3000/auth/new-password?token=${token}`
  await sender.sendResetPasswordEmail(email, link)      
}

export async function currentUser(){
  const session = await auth()
  return session?.user
}
export async function currentRole(){
  const session = await auth()
  return session?.user?.role
}



 