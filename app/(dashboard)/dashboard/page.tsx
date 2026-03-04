import { mockData } from '@/data/mockData'
import CardResumo from '@/components/CardResumo'
import { Calendar, CheckCircle2, Circle } from 'lucide-react'

export default function DashboardPage() {
  const totalSpent = mockData.categories.reduce((sum, cat) => sum + cat.spent, 0)
  
  const allExpenses = mockData.categories.flatMap(cat => 
    cat.expenses.map(exp => ({ ...exp, category: cat.name }))
  )
  
  const upcomingPayments = allExpenses
    .filter(exp => !exp.paid)
    .sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())
    .slice(0, 5)

  const completedTasks = mockData.checklist.filter(item => item.completed).length
  const totalTasks = mockData.checklist.length
  const checklistPercentage = (completedTasks / totalTasks) * 100

  const upcomingTasks = mockData.checklist
    .filter(item => !item.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardResumo budgetTotal={mockData.budgetTotal} totalSpent={totalSpent} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gastos por Categoria</h2>
          <div className="space-y-3">
            {mockData.categories.map(category => {
              const percentage = (category.spent / category.planned) * 100
              const isOver = category.spent > category.planned
              
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className={`text-sm font-semibold ${isOver ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatCurrency(category.spent)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximos Pagamentos</h2>
          <div className="space-y-3">
            {upcomingPayments.map(payment => (
              <div key={payment.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{payment.fornecedor}</p>
                  <p className="text-sm text-gray-600">{payment.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{formatDate(payment.dueDate || '')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(payment.total)}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    Pendente
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progresso do Checklist</h2>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {completedTasks} de {totalTasks} tarefas concluídas
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {checklistPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 bg-green-500 rounded-full transition-all"
                style={{ width: `${checklistPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">Próximas tarefas:</p>
            {upcomingTasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg">
                <Circle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(task.dueDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
