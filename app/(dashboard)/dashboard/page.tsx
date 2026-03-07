'use client'

import { useData } from '@/contexts/DataContext'
import ProgressBar from '@/components/ProgressBar'
import { AlertTriangle, TrendingUp, TrendingDown, Wallet, Clock, Package, ClipboardList } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = [
  'hsl(24, 30%, 55%)',
  'hsl(24, 20%, 45%)',
  'hsl(30, 33%, 65%)',
  'hsl(16, 38%, 34%)',
  'hsl(30, 20%, 75%)',
  'hsl(16, 20%, 56%)'
]

const BUDGET_TOTAL = 120000

export default function DashboardPage() {
  const { categories, categoriesLoading, checklist } = useData()

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    )
  }

  const totalSpent = categories.reduce((s, c) => s + c.spent, 0)
  const remaining = BUDGET_TOTAL - totalSpent
  const isOver = totalSpent > BUDGET_TOTAL

  const chartData = categories.map((c) => ({ name: c.name, value: c.spent }))

  const completedTasks = checklist.filter((t) => t.completed).length
  const checklistPct = checklist.length > 0 ? (completedTasks / checklist.length) * 100 : 0
  const nextTasks = checklist.filter((t) => !t.completed).slice(0, 5)

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl md:text-3xl font-bold">Dashboard</h1>

      {/* Financial Summary */}
      <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5 space-y-4">
        <h2 className="font-display text-lg font-semibold">Resumo Financeiro</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
            <Wallet className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Orçamento</p>
              <p className="font-semibold text-[hsl(var(--foreground))]">{fmt(BUDGET_TOTAL)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total Gasto</p>
              <p className="font-semibold text-[hsl(var(--foreground))]">{fmt(totalSpent)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
            <TrendingDown className={`h-8 w-8 ${isOver ? 'text-destructive' : 'text-success'}`} />
            <div>
              <p className="text-xs text-muted-foreground">Restante</p>
              <p className={`font-semibold ${isOver ? 'text-destructive' : 'text-success'}`}>
                {fmt(remaining)}
              </p>
            </div>
          </div>
        </div>

        <ProgressBar value={totalSpent} max={BUDGET_TOTAL} showLabel />

        {isOver && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">Orçamento excedido!</span>
          </div>
        )}
      </div>

      {/* Chart + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5">
          <h2 className="font-display text-lg font-semibold mb-4">Gastos por Categoria</h2>
          {chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nenhum gasto registrado ainda
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={90} 
                      innerRadius={50} 
                      paddingAngle={3}
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => v ? fmt(v as number) : ''} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {chartData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    {d.name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Upcoming Payments */}
        <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5">
          <h2 className="font-display text-lg font-semibold mb-4">Próximos Pagamentos</h2>
          <div className="space-y-3">
            {categories.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nenhuma categoria cadastrada ainda
                </p>
              </div>
            ) : (
              categories.slice(0, 5).map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary">
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.expenses.length} gasto(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(cat.spent)}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      cat.spent > cat.planned ? 'bg-destructive/15 text-destructive' : 'bg-success/15 text-success'
                    }`}>
                      {cat.spent > cat.planned ? 'Excedido' : 'No limite'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Checklist Progress */}
      <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold">Progresso do Checklist</h2>
          <span className="text-sm text-muted-foreground">{checklistPct.toFixed(0)}% concluído</span>
        </div>
        {checklist.length > 0 ? (
          <>
            <ProgressBar value={completedTasks} max={checklist.length} className="mb-4" />
            <div className="space-y-2">
              {nextTasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[hsl(var(--foreground))] truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(t.dueDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
              <ClipboardList className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nenhuma tarefa no checklist ainda
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
