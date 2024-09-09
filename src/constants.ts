export const logoUrl = "https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=626&ext=jpg&ga=GA1.1.358797363.1725023893&semt=ais_hybrid"

export const HOST = process.env.HOST || "http://localhost:3000"

export const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET
export const recaptcha_config = {
    sitekey : process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
    secret : process.env.RECAPTCHA_SECRET,
    project_id : "",

}

