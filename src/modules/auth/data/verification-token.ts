import { db } from "@/lib/db";
import * as v4 from "uuid";
export async function getVerificationToken(email: string) {
  try {
    const t = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return t;
  } catch (error) {
    console.log("Error in getVerificationToken", error);
    return null;
  }
}
export async function getVerificationTokenByToken(token: string) {
  try {
    const t = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return t;
  } catch (error) {
    console.log("Error in getVerificationToken", error);
    return null;
  }
}

export async function createVerificationToken(email: string) {
  try {
    const exists = await getVerificationToken(email);
    if (exists) {
      await db.verificationToken.delete({
        where: {
          id: exists.id,
        },
      });
    }
//    creating a new token
    const token = await db.verificationToken.create({
      data: {
        email,
        token: v4.v4(),
        expires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
    return token;
  } catch (error) {
    console.log("Error in getVerificationToken", error);
    return null;
  }
}
