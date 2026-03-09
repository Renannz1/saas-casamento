// Tipos do sistema

export interface Expense {
  id: string
  title: string
  fornecedor: string
  total: number
  installments: number
  paid: boolean
  dueDate: string
  paidBy: 'noivo' | 'noiva' | 'familia' | null  // Quem pagou
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
  categoryId: string | null  // ID da categoria (FK) ou null para "Outros"
  categoryName?: string       // Nome da categoria (para exibição)
  dueDate: string
  completed: boolean
}
