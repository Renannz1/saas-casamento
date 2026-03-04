import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import ProgressBar from './ProgressBar'

interface CardResumoProps {
  budgetTotal: number;
  totalSpent: number;
}

export default function CardResumo({ budgetTotal, totalSpent }: CardResumoProps) {
  const remaining = budgetTotal - totalSpent
  const percentage = (totalSpent / budgetTotal) * 100
  const isOverBudget = totalSpent > budgetTotal

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Orçamento Total</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(budgetTotal)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">Total Gasto</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalSpent)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-5 h-5 ${isOverBudget ? 'text-red-500' : 'text-green-500'}`} />
            <span className="text-sm text-gray-600">Restante</span>
          </div>
          <span className={`text-lg font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(remaining)}
          </span>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm font-medium text-gray-900">
              {percentage.toFixed(1)}%
            </span>
          </div>
          <ProgressBar 
            percentage={percentage} 
            showLabel={false}
            color={isOverBudget ? 'red' : 'green'}
          />
        </div>

        {isOverBudget && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-red-800 font-medium">
              ⚠️ Orçamento excedido em {formatCurrency(Math.abs(remaining))}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
