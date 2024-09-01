"use client"
import { Button } from "@/components/ui/button"
import { ToasterToast, useToast } from "@/hooks/use-toast"
import { useEffect } from "react"
interface ToasterButton {
    toastProps :  Omit<ToasterToast, "id">
}
export function ToastRender({toastProps} : ToasterButton) {
  const { toast } = useToast()
  useEffect(()=>{
    toast(toastProps)
  },[toastProps])
  return null
}
