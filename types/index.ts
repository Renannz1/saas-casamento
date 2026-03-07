// Tipos do sistema

export interface Expense {
  id: string
  title: string
  fornecedor: string
  total: number
  installments: number
  paid: boolean
  dueDate: string
}

export interface Category {
  id: string
  name: string
  planned: number
  spent: number
  expenses: Expense[]
}

export interface ChecklistItem {
  id: string
  title: string
  category: string
  dueDate: string
  completed: boolean
}
