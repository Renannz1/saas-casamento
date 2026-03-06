'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { mockData, ChecklistItem, Category, Expense } from '@/data/mockData'

interface DataContextType {
  checklist: ChecklistItem[]
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => void
  updateChecklistItem: (id: string, updates: Partial<ChecklistItem>) => void
  deleteChecklistItem: (id: string) => void
  toggleChecklistItem: (id: string) => void
  categories: Category[]
  addCategory: (category: Omit<Category, 'id' | 'spent' | 'expenses'>) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void
  addExpense: (categoryId: string, expense: Omit<Expense, 'id'>) => void
  updateExpense: (categoryId: string, expenseId: string, updates: Partial<Expense>) => void
  deleteExpense: (categoryId: string, expenseId: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const savedChecklist = localStorage.getItem('weddingChecklist')
    const savedCategories = localStorage.getItem('weddingCategories')
    
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist))
      } catch (error) {
        console.error('Erro ao carregar checklist:', error)
        setChecklist(mockData.checklist)
      }
    } else {
      setChecklist(mockData.checklist)
    }

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories))
      } catch (error) {
        console.error('Erro ao carregar categorias:', error)
        setCategories(mockData.categories)
      }
    } else {
      setCategories(mockData.categories)
    }

    setIsLoaded(true)
  }, [])

  // Salva checklist no localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('weddingChecklist', JSON.stringify(checklist))
    }
  }, [checklist, isLoaded])

  // Salva categorias no localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('weddingCategories', JSON.stringify(categories))
    }
  }, [categories, isLoaded])

  // ========== CHECKLIST CRUD ==========

  const addChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const newItem: ChecklistItem = {
      ...item,
      id: `c${Date.now()}`,
    }
    setChecklist(prev => [...prev, newItem])
  }

  const updateChecklistItem = (id: string, updates: Partial<ChecklistItem>) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  const deleteChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id))
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  // ========== CATEGORIES CRUD ==========

  const addCategory = (category: Omit<Category, 'id' | 'spent' | 'expenses'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat${Date.now()}`,
      spent: 0,
      expenses: [],
    }
    setCategories(prev => [...prev, newCategory])
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    )
  }

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  // ========== EXPENSES CRUD ==========

  const addExpense = (categoryId: string, expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `exp${Date.now()}`,
    }

    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          const newExpenses = [...cat.expenses, newExpense]
          const newSpent = newExpenses.reduce((sum, exp) => sum + exp.total, 0)
          return {
            ...cat,
            expenses: newExpenses,
            spent: newSpent,
          }
        }
        return cat
      })
    )
  }

  const updateExpense = (categoryId: string, expenseId: string, updates: Partial<Expense>) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          const newExpenses = cat.expenses.map(exp =>
            exp.id === expenseId ? { ...exp, ...updates } : exp
          )
          const newSpent = newExpenses.reduce((sum, exp) => sum + exp.total, 0)
          return {
            ...cat,
            expenses: newExpenses,
            spent: newSpent,
          }
        }
        return cat
      })
    )
  }

  const deleteExpense = (categoryId: string, expenseId: string) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === categoryId) {
          const newExpenses = cat.expenses.filter(exp => exp.id !== expenseId)
          const newSpent = newExpenses.reduce((sum, exp) => sum + exp.total, 0)
          return {
            ...cat,
            expenses: newExpenses,
            spent: newSpent,
          }
        }
        return cat
      })
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
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        addExpense,
        updateExpense,
        deleteExpense,
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
