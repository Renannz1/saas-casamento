import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-12">
        <Icon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
