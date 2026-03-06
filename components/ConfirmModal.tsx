'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, Trash2, X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!isOpen || !mounted) return null

  const Icon = variant === 'danger' ? Trash2 : AlertTriangle
  const iconBgColor = variant === 'danger' ? 'bg-destructive/10' : 'bg-primary/10'
  const iconColor = variant === 'danger' ? 'text-destructive' : 'text-primary'
  const buttonBgColor = variant === 'danger' ? 'bg-destructive' : 'bg-primary'
  const buttonTextColor = variant === 'danger' ? 'text-destructive-foreground' : 'text-primary-foreground'

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(var(--foreground))]/30 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 w-full max-w-sm space-y-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${iconBgColor} shrink-0`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`flex-1 py-2 text-sm rounded-lg ${buttonBgColor} ${buttonTextColor} hover:opacity-90 transition-opacity`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
