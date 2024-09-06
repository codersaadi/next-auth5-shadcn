'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function SignOutButton() {
  return (
      <Button className={cn(`bg-destructive/15 dark:bg-red-100 text-red-500 dark:text-black `)} onClick={()=> signOut()}>
        Sign Out
      </Button>
  )
}
