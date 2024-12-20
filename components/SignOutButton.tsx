'use client'

import { signOut } from 'next-auth/react'

interface SignOutButtonProps {
  className?: string
}

export default function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut()}
      className={`h-10 w-full bg-amber-400 ${className}`}
    >
      Cerrar sesión
    </button>
  )
}
