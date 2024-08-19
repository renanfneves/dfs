import { Outlet } from 'react-router-dom'

import { Toaster } from '@/components/ui/toast/toaster'

export function AppLayout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center antialiased md:bg-slate-100">
      <Outlet />
      <Toaster />
    </main>
  )
}
