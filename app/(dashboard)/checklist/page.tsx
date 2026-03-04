'use client'

import { useState } from 'react'
import { mockData } from '@/data/mockData'
import ChecklistItem from '@/components/ChecklistItem'
import ProgressBar from '@/components/ProgressBar'

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(mockData.checklist)

  const handleToggle = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = checklist.filter(item => item.completed).length
  const totalCount = checklist.length
  const percentage = (completedCount / totalCount) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checklist do Casamento</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Progresso Geral</h2>
          <span className="text-2xl font-bold text-gray-900">
            {completedCount}/{totalCount}
          </span>
        </div>
        
        <ProgressBar percentage={percentage} color="green" />
        
        <p className="text-sm text-gray-600 mt-3">
          {completedCount === totalCount 
            ? '🎉 Parabéns! Todas as tarefas foram concluídas!' 
            : `Faltam ${totalCount - completedCount} tarefas para concluir`}
        </p>
      </div>

      <div className="space-y-3">
        {checklist
          .sort((a, b) => {
            if (a.completed !== b.completed) {
              return a.completed ? 1 : -1
            }
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          })
          .map(item => (
            <ChecklistItem
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              dueDate={item.dueDate}
              completed={item.completed}
              onToggle={handleToggle}
            />
          ))}
      </div>

      {checklist.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Nenhuma tarefa no checklist</p>
        </div>
      )}
    </div>
  )
}
