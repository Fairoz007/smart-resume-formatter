import type React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">{children}</div>
    </div>
  )
}
