'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import ProgressBar from '@/components/ProgressBar'
import ConfirmModal from '@/components/ConfirmModal'
import Modal from '@/components/Modal'
import EmptyState from '@/components/EmptyState'
import { CheckCircle2, Circle, CalendarDays, Plus, Pencil, Trash2, ClipboardList } from 'lucide-react'
import { ChecklistItem } from '@/types'

// Helper para formatar data sem problema de timezone
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('pt-BR')
}

export default function ChecklistPage() {
  const { checklist, checklistLoading, addChecklistItem, updateChecklistItem, deleteChecklistItem, toggleChecklistItem, categories } = useData()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    dueDate: '',
  })

  const completed = checklist.filter((i) => i.completed).length

  if (checklistLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando tarefas...</p>
        </div>
      </div>
    )
  }

  const handleOpenModal = (item?: ChecklistItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        categoryId: item.categoryId || '',
        dueDate: item.dueDate,
      })
    } else {
      setEditingItem(null)
      setFormData({ title: '', categoryId: '', dueDate: '' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({ title: '', categoryId: '', dueDate: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.categoryId || !formData.dueDate) {
      alert('Preencha todos os campos')
      return
    }

    try {
      if (editingItem) {
        // UPDATE
        await updateChecklistItem(editingItem.id, {
          title: formData.title,
          categoryId: formData.categoryId === 'outros' ? null : formData.categoryId,
          dueDate: formData.dueDate,
        })
      } else {
        // CREATE
        await addChecklistItem({
          title: formData.title,
          categoryId: formData.categoryId === 'outros' ? null : formData.categoryId,
          dueDate: formData.dueDate,
          completed: false,
        })
      }
      handleCloseModal()
    } catch (error) {
      alert('Erro ao salvar tarefa. Tente novamente.')
    }
  }

  const handleDelete = (id: string) => {
    setItemToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteChecklistItem(itemToDelete)
      } catch (error) {
        alert('Erro ao excluir tarefa. Tente novamente.')
      }
    }
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Checklist</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Nova Tarefa
        </button>
      </div>

      {checklist.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Nenhuma tarefa no checklist"
          description="Organize seu casamento criando tarefas e acompanhando o progresso"
          actionLabel="Criar Primeira Tarefa"
          onAction={() => handleOpenModal()}
        />
      ) : (
        <>
          <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-semibold">Progresso Geral</h2>
              <span className="text-sm text-muted-foreground">
                {completed}/{checklist.length} concluídas
              </span>
            </div>
            <ProgressBar value={completed} max={checklist.length} showLabel />
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                  item.completed
                    ? 'bg-[hsl(var(--card))] border-success/30'
                    : 'bg-[hsl(var(--card))] border-[hsl(var(--border))]'
                }`}
              >
            <button
              onClick={() => toggleChecklistItem(item.id)}
              className="shrink-0 mt-0.5"
            >
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              )}
            </button>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : 'text-[hsl(var(--foreground))]'}`}>
                {item.title}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">{item.categoryName}</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(item.dueDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleOpenModal(item)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                title="Editar"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Excluir"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
          </div>
        </>
      )}

      {/* Modal de Adicionar/Editar */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? 'Editar Tarefa' : 'Nova Tarefa'}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
              Título da Tarefa
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Escolher convites"
              className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
              Categoria
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
              Data de Vencimento
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 py-2 text-sm rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {editingItem ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Excluir Tarefa"
        message="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        variant="danger"
      />
    </div>
  )
}
