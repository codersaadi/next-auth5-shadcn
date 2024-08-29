import NewPasswordForm from '@/modules/auth/components/NewPasswordForm'
import React from 'react'
interface ResetPasswordProps {
    searchParams : { 
        token? : string
    }
}

export default function page({searchParams} : ResetPasswordProps) {
    const {token } = searchParams
 
  return (
    <NewPasswordForm token={token} />
  )
}
