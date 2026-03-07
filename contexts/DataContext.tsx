'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ChecklistItem, Category, Expense } from '@/types'
import * as categoriasService from '@/lib/supabase/categorias'
import * as gastosService from '@/lib/supabase/gastos'
import * as tarefasService from '@/lib/supabase/tarefas'

interface DataContextType {
  checklist: ChecklistItem[]
  checklistLoading: boolean
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => Promise<void>
  updateChecklistItem: (id: string, updates: Partial<ChecklistItem>) => Promise<void>
  deleteChecklistItem: (id: string) => Promise<void>
  toggleChecklistItem: (id: string) => Promise<void>
  categories: Category[]
  categoriesLoading: boolean
  addCategory: (category: Omit<Category, 'id' | 'spent' | 'expenses'>) => Promise<void>
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  addExpense: (categoryId: string, expense: Omit<Expense, 'id'>) => Promise<void>
  updateExpense: (categoryId: string, expenseId: string, updates: Partial<Expense>) => Promise<void>
  deleteExpense: (categoryId: string, expenseId: string) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [checklistLoading, setChecklistLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  // Carrega checklist do Supabase na inicialização
  useEffect(() => {
    carregarChecklist()
  }, [])

  // Carrega categorias do Supabase na inicialização
  useEffect(() => {
    carregarCategorias()
  }, [])

  async function carregarChecklist() {
    try {
      setChecklistLoading(true)
      const tarefas = await tarefasService.buscarTarefas()
      setChecklist(tarefas)
    } catch (error) {
      setChecklist([])
    } finally {
      setChecklistLoading(false)
    }
  }

  async function carregarCategorias() {
    try {
      setCategoriesLoading(true)
      const cats = await categoriasService.buscarCategorias()
      setCategories(cats)
    } catch (error) {
      setCategories([])
    } finally {
      setCategoriesLoading(false)
    }
  }

  // ========== CHECKLIST CRUD (Supabase) ==========

  const addChecklistItem = async (item: Omit<ChecklistItem, 'id'>) => {
    const newItem = await tarefasService.adicionarTarefa(item)
    setChecklist(prev => [...prev, newItem])
  }

  const updateChecklistItem = async (id: string, updates: Partial<ChecklistItem>) => {
    const updatedItem = await tarefasService.atualizarTarefa(id, updates)
    setChecklist(prev =>
      prev.map(item => (item.id === id ? updatedItem : item))
    )
  }

  const deleteChecklistItem = async (id: string) => {
    await tarefasService.deletarTarefa(id)
    setChecklist(prev => prev.filter(item => item.id !== id))
  }

  const toggleChecklistItem = async (id: string) => {
    const updatedItem = await tarefasService.alternarTarefa(id)
    setChecklist(prev =>
      prev.map(item => (item.id === id ? updatedItem : item))
    )
  }

  // ========== CATEGORIES CRUD (Supabase) ==========

  const addCategory = async (category: Omit<Category, 'id' | 'spent' | 'expenses'>) => {
    const newCategory = await categoriasService.adicionarCategoria(category)
    setCategories(prev => [...prev, newCategory])
  }

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    const updatedCategory = await categoriasService.atualizarCategoria(id, updates)
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? updatedCategory : cat))
    )
  }

  const deleteCategory = async (id: string) => {
    await categoriasService.deletarCategoria(id)
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  // ========== EXPENSES CRUD (Supabase) ==========

  const addExpense = async (categoryId: string, expense: Omit<Expense, 'id'>) => {
    await gastosService.adicionarGasto(categoryId, expense)
    await carregarCategorias()
  }

  const updateExpense = async (categoryId: string, expenseId: string, updates: Partial<Expense>) => {
    await gastosService.atualizarGasto(categoryId, expenseId, updates)
    await carregarCategorias()
  }

  const deleteExpense = async (categoryId: string, expenseId: string) => {
    await gastosService.deletarGasto(categoryId, expenseId)
    await carregarCategorias()
  }

  return (
    <DataContext.Provider
      value={{
        checklist,
        checklistLoading,
        addChecklistItem,
        updateChecklistItem,
        deleteChecklistItem,
        toggleChecklistItem,
        categories,
        categoriesLoading,
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
