'use client'

import { useState } from 'react'
import { mockData } from '@/data/mockData'
import ProgressBar from '@/components/ProgressBar'
import { CheckCircle2, Circle, CalendarDays } from 'lucide-react'

export default function ChecklistPage() {
  const [items, setItems] = useState(mockData.checklist)

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    )
  }

  const completed = items.filter((i) => i.completed).length

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl md:text-3xl font-bold">Checklist</h1>

      <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold">Progresso Geral</h2>
          <span className="text-sm text-muted-foreground">
            {completed}/{items.length} concluídas
          </span>
        </div>
        <ProgressBar value={completed} max={items.length} showLabel />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border transition-all ${
              item.completed
                ? 'bg-[hsl(var(--card))] border-success/30'
                : 'bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-primary/30'
            }`}
          >
            {item.completed ? (
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : 'text-[hsl(var(--foreground))]'}`}>
                {item.title}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">{item.category}</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
