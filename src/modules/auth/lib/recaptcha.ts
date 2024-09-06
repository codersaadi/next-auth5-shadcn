"use server";
import { recaptcha_config } from "@/constants";
import { CaptchaActionOptions } from "../types/captcha";

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
  tokenExpiryMs = 120000, //ms
}: CaptchaActionOptions) {
  try {
    
    if (!token) {
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

    // const tokenTimestamp = new Date(googleResponse.challenge_ts).getTime();
    // const currentTime = Date.now();
    // const tokenAge = currentTime - tokenTimestamp;
    // if (tokenAge > tokenExpiryMs) {
    //   return { success: false, message: "Captcha token expired." };
    // }

    return { success: true, message: "Captcha verified successfully." };
  } catch (error) {
    console.error("Error in CAPTCHA verification", error);
    return {
      message: "CAPTCHA verification encountered an error.",
      success: false,
    };
  }
}
