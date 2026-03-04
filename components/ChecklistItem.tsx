'use client'

import { CheckCircle2, Circle, Calendar } from 'lucide-react'

interface ChecklistItemProps {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export default function ChecklistItem({
  id,
  title,
  category,
  dueDate,
  completed,
  onToggle
}: ChecklistItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div 
      className={`bg-white rounded-lg p-5 border transition-all ${
        completed 
          ? 'border-green-200 bg-green-50' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(id)}
          className="flex-shrink-0 mt-0.5"
        >
          {completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-base ${
            completed ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {category}
            </span>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
