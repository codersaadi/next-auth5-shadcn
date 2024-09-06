"use client"
import Modal from '@/components/Modal'
import CaptchaClientProvider from '@/modules/auth/components/CaptchaProvider'
import React from 'react'

export default function AuthModalLayout({children} :{
    children: React.ReactNode,
}) {
  
  return (
   <CaptchaClientProvider>
     <Modal>
      {children}
    </Modal>
   </CaptchaClientProvider>
  )
}
