import React from 'react'
import { ThemeProvider } from 'next-themes'

export default function NextThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
        defaultTheme='system'
        enableSystem
        attribute='class'
        disableTransitionOnChange
        >
            <React.Fragment>
            {children}
            </React.Fragment>
        </ThemeProvider>
    )
}


