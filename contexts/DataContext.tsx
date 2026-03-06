'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { mockData, ChecklistItem } from '@/data/mockData'

interface DataContextType {
  checklist: ChecklistItem[]
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => void
  updateChecklistItem: (id: string, updates: Partial<ChecklistItem>) => void
  deleteChecklistItem: (id: string) => void
  toggleChecklistItem: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const saved = localStorage.getItem('weddingChecklist')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setChecklist(data)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setChecklist(mockData.checklist)
      }
    } else {
      // Primeira vez, usa mockData
      setChecklist(mockData.checklist)
    }
    setIsLoaded(true)
  }, [])

  // Salva no localStorage sempre que checklist muda
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('weddingChecklist', JSON.stringify(checklist))
    }
  }, [checklist, isLoaded])

  // CREATE - Adicionar nova tarefa
  const addChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const newItem: ChecklistItem = {
      ...item,
      id: `c${Date.now()}`, // Gera ID único baseado no timestamp
    }
    setChecklist(prev => [...prev, newItem])
  }

  // UPDATE - Atualizar tarefa existente
  const updateChecklistItem = (id: string, updates: Partial<ChecklistItem>) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  // DELETE - Remover tarefa
  const deleteChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id))
  }

  // TOGGLE - Marcar/desmarcar como concluída
  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <DataContext.Provider
      value={{
        checklist,
        addChecklistItem,
        updateChecklistItem,
        deleteChecklistItem,
        toggleChecklistItem,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// Hook customizado para usar o contexto
export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider')
  }
  return context
}
