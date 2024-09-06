import { auth } from '@/auth'
import SignOutButton from '@/modules/auth/components/SignOutButton'
import { AvatarIcon } from '@radix-ui/react-icons'
import React from 'react'

export default async function page() {
  const session = await auth()
  
  return (
    <>
    <pre>
      {
        JSON.stringify(session, null, 2)
      }
    </pre>
    <SignOutButton />
    </>
  )
}

