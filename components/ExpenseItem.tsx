import { Calendar, CheckCircle2, Circle } from 'lucide-react'

interface ExpenseItemProps {
  title: string;
  fornecedor: string;
  total: number;
  installments: number;
  paid: boolean;
  dueDate?: string;
}

export default function ExpenseItem({
  title,
  fornecedor,
  total,
  installments,
  paid,
  dueDate
}: ExpenseItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{fornecedor}</p>
        </div>
        {paid ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(total)}
          </p>
          {installments > 1 && (
            <p className="text-xs text-gray-600 mt-1">
              {installments}x de {formatCurrency(total / installments)}
            </p>
          )}
        </div>
        
        <div className="text-right">
          {dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(dueDate)}</span>
            </div>
          )}
          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
            paid 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            {paid ? 'Pago' : 'Pendente'}
          </span>
        </div>
      </div>
    </div>
  )
}
