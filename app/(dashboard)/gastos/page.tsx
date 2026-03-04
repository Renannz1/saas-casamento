'use client'

import { useState } from 'react'
import { mockData } from '@/data/mockData'
import CategoriaCard from '@/components/CategoriaCard'
import ExpenseItem from '@/components/ExpenseItem'
import { X, Plus } from 'lucide-react'

export default function GastosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const category = selectedCategory 
    ? mockData.categories.find(c => c.id === selectedCategory)
    : null

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gastos por Categoria</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Adicionar Gasto</span>
        </button>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.categories.map(category => (
            <CategoriaCard
              key={category.id}
              name={category.name}
              planned={category.planned}
              spent={category.spent}
              onViewDetails={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            ← Voltar para categorias
          </button>

          {category && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {category.name}
              </h2>

              <div className="space-y-3">
                {category.expenses.map(expense => (
                  <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    fornecedor={expense.fornecedor}
                    total={expense.total}
                    installments={expense.installments}
                    paid={expense.paid}
                    dueDate={expense.dueDate}
                  />
                ))}
              </div>

              {category.expenses.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Nenhuma despesa cadastrada nesta categoria
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Adicionar Gasto</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              Esta é uma demonstração. Em produção, aqui seria possível adicionar novos gastos.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome da despesa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled
              />
              <input
                type="text"
                placeholder="Fornecedor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled
              />
              <input
                type="number"
                placeholder="Valor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled
              />
            </div>

            <button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-gray-300 text-gray-600 font-medium py-2 rounded-lg mt-4 cursor-not-allowed"
              disabled
            >
              Funcionalidade em desenvolvimento
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
