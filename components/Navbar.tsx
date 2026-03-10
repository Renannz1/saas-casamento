'use client'

import { Heart, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {
  const { signOut, user } = useAuth()

  return (
    <header className="h-14 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 md:hidden">
          <Heart className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">Nuptial</span>
        </div>
        <div className="hidden md:block">
          <h2 className="text-sm text-muted-foreground font-body">Organização financeira do seu casamento</h2>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Sair"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}

