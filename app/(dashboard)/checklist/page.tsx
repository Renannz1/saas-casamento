'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import ProgressBar from '@/components/ProgressBar'
import ConfirmModal from '@/components/ConfirmModal'
import { CheckCircle2, Circle, CalendarDays, Plus, Pencil, Trash2, X } from 'lucide-react'
import { ChecklistItem } from '@/data/mockData'

export default function ChecklistPage() {
  const { checklist, addChecklistItem, updateChecklistItem, deleteChecklistItem, toggleChecklistItem } = useData()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    dueDate: '',
  })

  const completed = checklist.filter((i) => i.completed).length

  const handleOpenModal = (item?: ChecklistItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        category: item.category,
        dueDate: item.dueDate,
      })
    } else {
      setEditingItem(null)
      setFormData({ title: '', category: '', dueDate: '' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
    setFormData({ title: '', category: '', dueDate: '' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.category || !formData.dueDate) {
      alert('Preencha todos os campos')
      return
    }

    if (editingItem) {
      // UPDATE
      updateChecklistItem(editingItem.id, formData)
    } else {
      // CREATE
      addChecklistItem({
        ...formData,
        completed: false,
      })
    }

    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    setItemToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteChecklistItem(itemToDelete)
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
                <span className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">{item.category}</span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {new Date(item.dueDate).toLocaleDateString('pt-BR')}
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

      {/* Modal de Adicionar/Editar */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--foreground))]/30 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-6 w-full max-w-md space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                {editingItem ? 'Editar Tarefa' : 'Nova Tarefa'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg text-muted-foreground hover:text-[hsl(var(--foreground))] hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

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
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Papelaria, Organização, etc"
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
          </div>
        </div>
      )}

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
