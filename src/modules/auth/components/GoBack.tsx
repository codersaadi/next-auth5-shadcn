'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBack() {
  const router = useRouter()
    return (
        <div onClick={() => router.back()} className="md:absolute cursor-pointer top-1 right-4 flex items-center gap-2  text-foreground/60 px-2 py-1   text-xs">
        <ArrowLeftIcon />
   Go Back
      </div>
          ) 
}
