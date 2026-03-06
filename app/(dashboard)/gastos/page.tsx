'use client'

import { useState } from 'react'
import { mockData, Category, Expense } from '@/data/mockData'
import ProgressBar from '@/components/ProgressBar'
import { ChevronLeft, Plus, Package, CreditCard, CalendarDays } from 'lucide-react'

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function ExpenseItem({ expense }: { expense: Expense }) {
  const installmentValue = expense.total / expense.installments

  return (
    <div className="p-4 rounded-xl bg-secondary space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">{expense.title}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Package className="h-3 w-3" /> {expense.fornecedor}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(expense.total)}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            expense.paid ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary'
          }`}>
            {expense.paid ? 'Pago' : 'Pendente'}
          </span>
        </div>
      </div>

      {expense.installments > 1 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-[hsl(var(--border))]">
          <CreditCard className="h-3 w-3" />
          <span>{expense.installments}x de {fmt(installmentValue)}</span>
          <CalendarDays className="h-3 w-3 ml-2" />
          <span>Início: {new Date(expense.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>
      )}
    </div>
  )
}

function CategoriaCard({ category, onSelect }: { category: Category; onSelect: () => void }) {
  const diff = category.planned - category.spent
  const isOver = category.spent > category.planned

  return (
    <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">{category.name}</h3>
        {isOver && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/15 text-destructive font-medium">
            Excedido
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Previsto</p>
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(category.planned)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Gasto</p>
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(category.spent)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Diferença</p>
          <p className={`text-sm font-semibold ${isOver ? 'text-destructive' : 'text-success'}`}>
            {fmt(diff)}
          </p>
        </div>
      </div>

      <ProgressBar value={category.spent} max={category.planned} showLabel />

      <button
        onClick={onSelect}
        className="w-full py-2 text-sm font-medium rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
      >
        Ver detalhes
      </button>
    </div>
  )
}

export default function GastosPage() {
  const [selected, setSelected] = useState<Category | null>(null)
  const [showModal, setShowModal] = useState(false)

  if (selected) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </button>

        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">{selected.name}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Adicionar
          </button>
        </div>

        <div className="space-y-3">
          {selected.expenses.map((exp) => (
            <ExpenseItem key={exp.id} expense={exp} />
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--foreground))]/30 p-4" onClick={() => setShowModal(false)}>
            <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 w-full max-w-md space-y-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="font-display text-lg font-semibold">Novo Gasto</h2>
              <div className="space-y-3">
                <input placeholder="Nome da despesa" className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />
                <input placeholder="Fornecedor" className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />
                <input placeholder="Valor total" type="number" className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />
                <input placeholder="Nº parcelas" type="number" className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors">
                  Cancelar
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl md:text-3xl font-bold">Gastos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockData.categories.map((cat) => (
          <CategoriaCard key={cat.id} category={cat} onSelect={() => setSelected(cat)} />
        ))}
      </div>
    </div>
  )
}
