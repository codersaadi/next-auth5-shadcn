import React from 'react'

export default function AppLayout({
    children,
    auth
  }: {
    children: React.ReactNode;
    auth: React.ReactNode;
  }) {
  return (
    <>
      {auth}
      {children}
    </>
  )
}
