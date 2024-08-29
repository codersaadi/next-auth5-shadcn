import Modal from '@/components/Modal'
import React from 'react'

export default function AuthModalLayout({children} :{
    children: React.ReactNode,
}) {
  return (
    <Modal>
      {children}
    </Modal>
  )
}
