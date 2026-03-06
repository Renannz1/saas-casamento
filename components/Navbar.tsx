import { Heart } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="h-14 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] flex items-center px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2 md:hidden">
        <Heart className="h-5 w-5 text-primary" />
        <span className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">Nuptial</span>
      </div>
      <div className="hidden md:block">
        <h2 className="text-sm text-muted-foreground font-body">Organização financeira do seu casamento</h2>
      </div>
    </header>
  )
}
