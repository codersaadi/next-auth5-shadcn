# NextAuth Starter

A robust authentication solution for Next.js applications, leveraging NextAuth with custom enhancements like RBAC, multi-provider support, and email handling.

## Tools,Adapter used in this.
- Next.js
- Typescript
- Auth.js(v5)
- Postgresql 
-Prisma
## Getting Started
## Installation
```bash
git clone https://github.com/saadi925/next-auth-complete.git
cd next-auth-complete
pnpm install 
```

## Setup & Configuration
```
// .env

DB_URL="postgresql://dbuser:password@localhost:5432/dbname"

AUTH_SECRET="your-secret"

GITHUB_CLIENT_ID="your-secret"
GITHUB_CLIENT_SECRET="your-secret"

GOOGLE_CLIENT_SECRET="your-secret"
GOOGLE_CLIENT_ID="your-secret"

HOST="http://localhost:3000"


GMAIL_SENDER_EMAIL="your_app_gmail"
GMAIL_SENDER_PASSWORD="gmail_apps_password_check_nodemailer"

FACEBOOK_CLIENT_ID="your-secret"
FACEBOOK_CLIENT_SECRET="your-secret"
```


# Features
 Credential-Based Authentication:

- Sign-in, Sign-up, and Forgot Password functionality.
- Custom email templates for password recovery and account verification using Nodemailer.
OAuth Providers:

- Google and Facebook authentication for seamless social logins.
Role-Based Access Control (RBAC):

- Define user roles and permissions with Prisma for secure access management.
Database Integration:

- Built with Prisma and PostgreSQL for powerful and scalable database interactions.
Schema Validation:

- Validate user inputs and responses using Zod.
Turbo (TypeScript) Integration:

- Type-safe development with TypeScript, ensuring robust and maintainable code.
Customizable UI:

- Tailor the UI components with Shadcn UI, allowing for easy styling adjustments.
# Contributions
Feel free to contribute , contributions are always appreciated.