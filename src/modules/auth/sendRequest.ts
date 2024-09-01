import { NodemailerConfig } from "next-auth/providers/nodemailer";
import { EmailService } from "./services/mail.sender";
import { logoUrl } from "@/constants";

export interface EmailTheme {
  colorScheme?: "auto" | "dark" | "light";
  logo?: string;
  brandColor?: string;
  buttonText?: string;
}

export async function sendVerificationRequest(params: {
  identifier: string;
  url: string;
  expires: Date;
  provider: NodemailerConfig;
  token: string;
  theme: EmailTheme;
  request: Request;
}) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  const service = new EmailService();
  const transport = await service.getTransport();

  try {
    const result = await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Sign in to ${host}`,
      text: generateText({ url, host }),
      html: generateHTML({ url, host, theme }),
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}
function generateHTML(params: { url: string; host: string; theme: EmailTheme }) {
  const { url, host, theme } = params;
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#4F46E5"; // A modern shade of blue (indigo-600 from Tailwind)
  const color = {
    background: "#f3f4f6", // Slightly darker gray for better contrast
    text: "#333333", // Darker text color for improved readability
    mainBackground: "#ffffff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#ffffff",
    footerText: "#9CA3AF", // Neutral gray for footer text
  };

  return `
    <body style="background: ${color.background}; margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: ${color.background}; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="100%" border="0" cellspacing="20" cellpadding="0" style="max-width: 600px; margin: auto; background: ${color.mainBackground}; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  ${`<img src="${theme?.logo || logoUrl}" alt="${escapedHost}" style="height: 50px; margin-bottom: 24px;" />`}
                  <h1 style="font-size: 24px; color: ${color.text}; margin: 0;">Sign in to <strong>${escapedHost}</strong></h1>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 0 40px 40px;">
                  <p style="font-size: 16px; color: ${color.text}; margin: 0 0 24px;">
                    Click the button below to sign in. This link is only valid for the next 24 hours.
                  </p>
                  <a href="${url}" target="_blank"
                    style="display: inline-block; padding: 14px 28px; font-size: 16px; color: ${color.buttonText}; background-color: ${color.buttonBackground}; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 0 auto;">
                    Sign in
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px; font-size: 14px; color: ${color.footerText};">
                  If you did not request this email, you can safely ignore it.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `;
}

function generateText({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\nIf you did not request this email, you can safely ignore it.\nThis link is only valid for the next 24 hours.`;
}
