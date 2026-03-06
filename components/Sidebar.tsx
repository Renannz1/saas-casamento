'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Receipt, CheckSquare, Heart } from 'lucide-react'

const navItems = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Gastos', path: '/gastos', icon: Receipt },
  { title: 'Checklist', path: '/checklist', icon: CheckSquare },
]

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`hidden md:flex flex-col fixed left-0 top-0 h-screen bg-secondary border-r border-[hsl(var(--border))] z-40 transition-all duration-300 ${
        expanded ? 'w-56' : 'w-16'
      }`}
    >
      <div className="flex items-center gap-2 h-16 px-4 border-b border-[hsl(var(--border))]">
        <Heart className="h-6 w-6 text-primary shrink-0" />
        {expanded && (
          <span className="font-display text-lg font-semibold text-[hsl(var(--foreground))] whitespace-nowrap overflow-hidden">
            Nuptial
          </span>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-2 mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-[hsl(var(--foreground))]'
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {expanded && (
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                  {item.title}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
