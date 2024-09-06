import EmailVerifyForm from '@/modules/auth/components/EmailVerifyForm'
import React from 'react'

interface EmailVerifyProps {
    searchParams : { 
        token? : string
    }
}

export default function page({searchParams} : EmailVerifyProps) {
  const {token } = searchParams
  
    return (
   <EmailVerifyForm token={token}/>
  )
}
