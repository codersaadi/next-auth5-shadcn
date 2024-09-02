# NextAuth Starter

A robust authentication solution for Next.js applications, leveraging NextAuth with custom enhancements like RBAC, multi-provider support, and email handling.

## Tools and Adapters Used
- **Next.js**
- **TypeScript**
- **Auth.js (v5)**
- **PostgreSQL**
- **Prisma**

## Getting Started

### Installation
```bash
git clone https://github.com/codersaadi/next-auth5-shadcn.git
cd next-auth5-shadcn
pnpm install 
```

## Setup & Configuration
Create a .env file in the root directory and add the following configuration:
``` 
DB_URL="postgresql://dbuser:password@localhost:5432/dbname"

AUTH_SECRET="your-secret"

GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"

GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

FACEBOOK_CLIENT_ID="your-client-id"
FACEBOOK_CLIENT_SECRET="your-client-secret"

GMAIL_SENDER_EMAIL="your-app-gmail"
GMAIL_SENDER_PASSWORD="gmail-app-password"

HOST="http://localhost:3000"
```
## Features
Credential-Based Authentication
-Sign-In, Sign-Up, and Forgot Password functionality.
Custom email templates for password recovery and account verification using Nodemailer.
OAuth Providers
- Google and Facebook authentication for seamless social logins.
Role-Based Access Control (RBAC)
- Define user roles and permissions with Prisma for secure access management.
Database Integration
- Built with Prisma and PostgreSQL for powerful and scalable database interactions.
Schema Validation
- Validate user inputs and responses using Zod.
TypeScript Integration
- Type-safe development with TypeScript, ensuring robust and maintainable code.
Customizable UI
- Tailor the UI components with Shadcn UI, allowing for easy styling adjustments.
Contributions
- Feel free to contribute—contributions are always appreciated!

# ScreenShots

### Home Page
![Home Page](public/screenshots/home.png)

### Login Page
![Login Page](public/screenshots/login.png)

### Sign In Page
![Sign In Page](public/screenshots/signin.png)

### Email Sign In
![Email Sign In](public/screenshots/email_signin.png)

### Signup Modal
![Signup Modal](public/screenshots/signup_modal.png)

### Intercepting Modal
![Intercepting Modal](public/screenshots/intercepting_modal.png)

### Enhancements:
- **Clearer Section Headers:** Sections are clearly separated for easy navigation.
- **Enhanced Setup Instructions:** The environment setup is clearly outlined.
- **Organized Screenshots:** The screenshots are presented in a clean and structured manner.
- **Features Detailed:** Each feature is highlighted with bold titles for quick reference.
- **Encouragement to Contribute:** The contributions section is friendly and welcoming.




