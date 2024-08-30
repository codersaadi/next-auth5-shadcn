"use client"
import React from 'react'
import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
export default function Modal({
    children
} :{
    children: React.ReactNode
}) {
    const router = useRouter()
    function handleOpenChange() {
        router.back()
    } 
  return (
        <Dialog defaultOpen open onOpenChange={handleOpenChange} >
    <DialogOverlay>
      <DialogContent className='overflow-y-hidden max-w-sm  dark:bg-neutral-900'>
        {children}
      </DialogContent>
    </DialogOverlay >
        </Dialog>
  )
}
