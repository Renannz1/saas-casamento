'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Receipt, CheckSquare } from 'lucide-react'

const navItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Gastos', path: '/gastos', icon: Receipt },
  { title: 'Checklist', path: '/checklist', icon: CheckSquare },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[hsl(var(--card))] border-t border-[hsl(var(--border))] z-40 flex justify-around items-center h-16 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
