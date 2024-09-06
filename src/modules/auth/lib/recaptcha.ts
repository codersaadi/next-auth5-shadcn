"use server";
import { recaptcha_config } from "@/constants";

interface GoogleCaptchaResponse {
  success: boolean;
  challenge_ts: string; // '2024-09-05T18:44:32Z'
  hostname: string;
  action: string;
  score: number;
}

export async function reCaptchaSiteVerify({
  token,
  action,
  msTokenAge = 120000 //ms
}: {
  token?: string;
  action?: string;
  msTokenAge? : number }) {
  try {
    if (!token) {
      if (process.env.NODE_ENV !== "production")
        console.error("Captcha token missing");
      return {
        message: "Captcha verification failed. Please try again.",
        success: false,
      };
    }
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptcha_config.secret}&response=${token}`;
    const res = await fetch(url, { method: "POST" });
    const googleResponse: GoogleCaptchaResponse = await res.json();

    if (
      !googleResponse ||
      googleResponse.score < 0.5 ||
      googleResponse.action !== action
    ) {
      console.error("Captcha validation failed", googleResponse);
      return {
        message: "Captcha validation failed. Please try again.",
        success: false,
      };
    }

    const tokenTimestamp = new Date(googleResponse.challenge_ts).getTime();
    const currentTime = Date.now();
    const tokenAge = currentTime - tokenTimestamp;
    if (tokenAge > msTokenAge) {
      return { success: false, message: "Captcha token expired." };
    }

    return { success: true, message: "Captcha verified successfully." };
  } catch (error) {
    console.error("Error in CAPTCHA verification", error);
    return {
      message: "CAPTCHA verification encountered an error.",
      success: false,
    };
  }
}