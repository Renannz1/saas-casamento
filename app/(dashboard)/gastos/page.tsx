'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { Category, Expense } from '@/types'
import ProgressBar from '@/components/ProgressBar'
import ConfirmModal from '@/components/ConfirmModal'
import Modal from '@/components/Modal'
import EmptyState from '@/components/EmptyState'
import { ChevronLeft, Plus, Package, CreditCard, CalendarDays, Pencil, Trash2, X } from 'lucide-react'

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function ExpenseItem({ expense, onEdit, onDelete }: { 
  expense: Expense
  onEdit: () => void
  onDelete: () => void
}) {
  const installmentValue = expense.total / expense.installments

  return (
    <div className="p-4 rounded-xl bg-secondary space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">{expense.title}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Package className="h-3 w-3" /> {expense.fornecedor}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(expense.total)}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              expense.paid ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary'
            }`}>
              {expense.paid ? 'Pago' : 'Pendente'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={onEdit}
              className="p-1 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              title="Editar gasto"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              title="Excluir gasto"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {expense.installments > 1 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-[hsl(var(--border))]">
          <CreditCard className="h-3 w-3" />
          <span>{expense.installments}x de {fmt(installmentValue)}</span>
          <CalendarDays className="h-3 w-3 ml-2" />
          <span>Início: {new Date(expense.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>
      )}
    </div>
  )
}

function CategoriaCard({ category, onSelect, onEdit, onDelete }: { 
  category: Category
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const diff = category.planned - category.spent
  const isOver = category.spent > category.planned

  return (
    <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-[hsl(var(--foreground))]">{category.name}</h3>
        <div className="flex items-center gap-1">
          {isOver && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/15 text-destructive font-medium">
              Excedido
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            title="Editar categoria"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Excluir categoria"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Previsto</p>
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(category.planned)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Gasto</p>
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{fmt(category.spent)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Diferença</p>
          <p className={`text-sm font-semibold ${isOver ? 'text-destructive' : 'text-success'}`}>
            {fmt(diff)}
          </p>
        </div>
      </div>

      <ProgressBar value={category.spent} max={category.planned} showLabel />

      <button
        onClick={onSelect}
        className="w-full py-2 text-sm font-medium rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
      >
        Ver detalhes
      </button>
    </div>
  )
}

export default function GastosPage() {
  const { categories, categoriesLoading, addCategory, updateCategory, deleteCategory, addExpense, updateExpense, deleteExpense } = useData()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    planned: '',
  })
  const [expenseFormData, setExpenseFormData] = useState({
    title: '',
    fornecedor: '',
    total: '',
    installments: '1',
    paid: false,
    dueDate: '',
  })

  // Busca a categoria selecionada sempre atualizada do Context
  const selected = selectedId ? categories.find(cat => cat.id === selectedId) || null : null

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando categorias...</p>
        </div>
      </div>
    )
  }

  const handleOpenCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryFormData({
        name: category.name,
        planned: category.planned.toString(),
      })
    } else {
      setEditingCategory(null)
      setCategoryFormData({ name: '', planned: '' })
    }
    setShowCategoryModal(true)
  }

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false)
    setEditingCategory(null)
    setCategoryFormData({ name: '', planned: '' })
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!categoryFormData.name || !categoryFormData.planned) {
      alert('Preencha todos os campos')
      return
    }

    const planned = parseFloat(categoryFormData.planned)
    if (isNaN(planned) || planned <= 0) {
      alert('Valor planejado deve ser um número positivo')
      return
    }

    try {
      if (editingCategory) {
        // UPDATE
        await updateCategory(editingCategory.id, {
          name: categoryFormData.name,
          planned: planned,
        })
      } else {
        // CREATE
        await addCategory({
          name: categoryFormData.name,
          planned: planned,
        })
      }
      handleCloseCategoryModal()
    } catch (error) {
      alert('Erro ao salvar categoria. Tente novamente.')
    }
  }

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete)
      } catch (error) {
        alert('Erro ao excluir categoria. Tente novamente.')
      }
    }
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  // ========== EXPENSE HANDLERS ==========

  const handleOpenExpenseModal = (expense?: Expense) => {
    if (expense) {
      setEditingExpense(expense)
      setExpenseFormData({
        title: expense.title,
        fornecedor: expense.fornecedor,
        total: expense.total.toString(),
        installments: expense.installments.toString(),
        paid: expense.paid,
        dueDate: expense.dueDate,
      })
    } else {
      setEditingExpense(null)
      setExpenseFormData({
        title: '',
        fornecedor: '',
        total: '',
        installments: '1',
        paid: false,
        dueDate: '',
      })
    }
    setShowExpenseModal(true)
  }

  const handleCloseExpenseModal = () => {
    setShowExpenseModal(false)
    setEditingExpense(null)
    setExpenseFormData({
      title: '',
      fornecedor: '',
      total: '',
      installments: '1',
      paid: false,
      dueDate: '',
    })
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selected) return

    if (!expenseFormData.title || !expenseFormData.fornecedor || !expenseFormData.total || !expenseFormData.dueDate) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const total = parseFloat(expenseFormData.total)
    const installments = parseInt(expenseFormData.installments)

    if (isNaN(total) || total <= 0) {
      alert('Valor total deve ser um número positivo')
      return
    }

    if (isNaN(installments) || installments < 1) {
      alert('Número de parcelas deve ser pelo menos 1')
      return
    }

    try {
      if (editingExpense) {
        // UPDATE
        await updateExpense(selected.id, editingExpense.id, {
          title: expenseFormData.title,
          fornecedor: expenseFormData.fornecedor,
          total: total,
          installments: installments,
          paid: expenseFormData.paid,
          dueDate: expenseFormData.dueDate,
        })
      } else {
        // CREATE
        await addExpense(selected.id, {
          title: expenseFormData.title,
          fornecedor: expenseFormData.fornecedor,
          total: total,
          installments: installments,
          paid: expenseFormData.paid,
          dueDate: expenseFormData.dueDate,
        })
      }
      handleCloseExpenseModal()
    } catch (error) {
      alert('Erro ao salvar gasto. Tente novamente.')
    }
  }

  const handleDeleteExpense = (expenseId: string) => {
    setExpenseToDelete(expenseId)
    setShowDeleteExpenseModal(true)
  }

  const confirmDeleteExpense = async () => {
    if (selected && expenseToDelete) {
      try {
        await deleteExpense(selected.id, expenseToDelete)
      } catch (error) {
        alert('Erro ao excluir gasto. Tente novamente.')
      }
    }
  }

  const closeDeleteExpenseModal = () => {
    setShowDeleteExpenseModal(false)
    setExpenseToDelete(null)
  }

  if (selected) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </button>

        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">{selected.name}</h1>
          <button
            onClick={() => handleOpenExpenseModal()}
            className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Adicionar Gasto
          </button>
        </div>

        <div className="space-y-3">
          {selected.expenses.length === 0 ? (
            <EmptyState
              icon={Package}
              title="Nenhum gasto cadastrado"
              description="Adicione gastos nesta categoria para controlar seus custos"
              actionLabel="Adicionar Primeiro Gasto"
              onAction={() => handleOpenExpenseModal()}
            />
          ) : (
            selected.expenses.map((exp) => (
              <ExpenseItem 
                key={exp.id} 
                expense={exp}
                onEdit={() => handleOpenExpenseModal(exp)}
                onDelete={() => handleDeleteExpense(exp.id)}
              />
            ))
          )}
        </div>

        {/* Modal de Adicionar/Editar Gasto */}
        <Modal
          isOpen={showExpenseModal}
          onClose={handleCloseExpenseModal}
          title={editingExpense ? 'Editar Gasto' : 'Novo Gasto'}
        >
          <form onSubmit={handleExpenseSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                Nome da Despesa
              </label>
              <input
                type="text"
                value={expenseFormData.title}
                onChange={(e) => setExpenseFormData({ ...expenseFormData, title: e.target.value })}
                placeholder="Ex: Jantar completo"
                className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                Fornecedor
              </label>
              <input
                type="text"
                value={expenseFormData.fornecedor}
                onChange={(e) => setExpenseFormData({ ...expenseFormData, fornecedor: e.target.value })}
                placeholder="Ex: Buffet Elegance"
                className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                Valor Total
              </label>
              <input
                type="number"
                step="0.01"
                value={expenseFormData.total}
                onChange={(e) => setExpenseFormData({ ...expenseFormData, total: e.target.value })}
                placeholder="Ex: 25000"
                className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                Número de Parcelas
              </label>
              <input
                type="number"
                min="1"
                value={expenseFormData.installments}
                onChange={(e) => setExpenseFormData({ ...expenseFormData, installments: e.target.value })}
                placeholder="Ex: 5"
                className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                Data de Vencimento
              </label>
              <input
                type="date"
                value={expenseFormData.dueDate}
                onChange={(e) => setExpenseFormData({ ...expenseFormData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="paid"
                checked={expenseFormData.paid}
                onChange={(e) => setExpenseFormData({ ...expenseFormData, paid: e.target.checked })}
                className="w-4 h-4 rounded border-[hsl(var(--input))] text-primary focus:ring-2 focus:ring-[hsl(var(--ring))]"
              />
              <label htmlFor="paid" className="text-sm text-[hsl(var(--foreground))] cursor-pointer">
                Marcar como pago
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleCloseExpenseModal}
                className="flex-1 py-2 text-sm rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {editingExpense ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </form>
        </Modal>

        {/* Modal de Confirmação de Exclusão de Gasto */}
        <ConfirmModal
          isOpen={showDeleteExpenseModal}
          onClose={closeDeleteExpenseModal}
          onConfirm={confirmDeleteExpense}
          title="Excluir Gasto"
          message="Tem certeza que deseja excluir este gasto? Esta ação não pode ser desfeita."
          confirmText="Excluir"
          variant="danger"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Gastos</h1>
        <button
          onClick={() => handleOpenCategoryModal()}
          className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Nova Categoria
        </button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhuma categoria cadastrada"
          description="Comece criando sua primeira categoria de gastos para organizar o orçamento do seu casamento"
          actionLabel="Criar Primeira Categoria"
          onAction={() => handleOpenCategoryModal()}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoriaCard 
              key={cat.id} 
              category={cat} 
              onSelect={() => setSelectedId(cat.id)}
              onEdit={() => handleOpenCategoryModal(cat)}
              onDelete={() => handleDeleteCategory(cat.id)}
            />
          ))}
        </div>
      )}

      {/* Modal de Adicionar/Editar Categoria */}
      <Modal
        isOpen={showCategoryModal}
        onClose={handleCloseCategoryModal}
        title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
      >
        <form onSubmit={handleCategorySubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                  placeholder="Ex: Buffet, Decoração, etc"
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                  Valor Planejado
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={categoryFormData.planned}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, planned: e.target.value })}
                  placeholder="Ex: 35000"
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseCategoryModal}
                  className="flex-1 py-2 text-sm rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {editingCategory ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteCategory}
        title="Excluir Categoria"
        message="Tem certeza que deseja excluir esta categoria? Todos os gastos associados também serão removidos. Esta ação não pode ser desfeita."
        confirmText="Excluir"
        variant="danger"
      />
    </div>
  )
}
