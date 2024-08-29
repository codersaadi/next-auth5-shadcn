import { SessionProvider } from 'next-auth/react'
import React from 'react'
import NextThemeProvider from './ThemeProvider'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Provider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <NextThemeProvider>
      <TooltipProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </TooltipProvider>
    </NextThemeProvider>
  )
}
