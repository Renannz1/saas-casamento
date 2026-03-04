import { AlertCircle } from 'lucide-react'
import ProgressBar from './ProgressBar'

interface CategoriaCardProps {
  name: string;
  planned: number;
  spent: number;
  onViewDetails: () => void;
}

export default function CategoriaCard({ 
  name, 
  planned, 
  spent, 
  onViewDetails 
}: CategoriaCardProps) {
  const remaining = planned - spent
  const percentage = (spent / planned) * 100
  const isOver = spent > planned

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        {isOver && (
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
        )}
      </div>

      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">Orçamento</span>
          <span className="text-base font-medium text-gray-900">
            {formatCurrency(planned)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">Gasto</span>
          <span className="text-base font-semibold text-gray-900">
            {formatCurrency(spent)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base text-gray-600">Diferença</span>
          <span className={`text-base font-semibold ${isOver ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(remaining)}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <ProgressBar 
          percentage={percentage} 
          showLabel={false}
          color={isOver ? 'red' : 'green'}
        />
        <p className="text-xs text-gray-500 mt-1">
          {percentage.toFixed(1)}% do orçamento
        </p>
      </div>

      {isOver && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
          <p className="text-xs text-red-800">
            Excedeu em {formatCurrency(Math.abs(remaining))}
          </p>
        </div>
      )}

      <button
        onClick={onViewDetails}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors text-base shadow-sm hover:shadow-md"
      >
        Ver detalhes
      </button>
    </div>
  )
}
