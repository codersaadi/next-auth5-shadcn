import type { Metadata } from "next";
import "./globals.css"
import fonts from './_fonts'
import Provider from "@/providers";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import React from 'react'
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`
      ${fonts.inter.variable} 
      bg-gray-100 dark:bg-background       `}>
        <Provider>
         <Toaster  />
          <div className="absolute top-0 left-0 px-4">
            <ThemeSwitch />
          </div>
          {/* {auth} */}
          {children}
        </Provider>
      </body>
    </html>
  );
}
