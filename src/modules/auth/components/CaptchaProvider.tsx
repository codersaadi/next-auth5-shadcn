"use client"
import { recaptcha_config } from "@/constants"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"


export default function CaptchaClientProvider({ children }: {
    children: React.ReactNode
}) {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptcha_config.sitekey} >{children}</GoogleReCaptchaProvider>
    )
}
