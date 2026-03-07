import { supabase } from './client'
import { ChecklistItem } from '@/types'

// Tipo para inserir tarefa (sem id e categoryName)
type TarefaInsert = Omit<ChecklistItem, 'id' | 'categoryName'>
type TarefaUpdate = Partial<Omit<ChecklistItem, 'id' | 'categoryName'>>

// READ - Buscar todas as tarefas com nome da categoria
export async function buscarTarefas(): Promise<ChecklistItem[]> {
  const { data, error } = await supabase
    .from('tarefas')
    .select(`
      *,
      categorias:categoria_id (
        nome
      )
    `)
    .order('data_vencimento', { ascending: true })

  if (error) throw error

  return data.map(t => ({
    id: t.id,
    title: t.titulo,
    categoryId: t.categoria_id,
    categoryName: t.categorias?.nome || 'Outros',
    dueDate: t.data_vencimento,
    completed: t.concluida,
  }))
}

// CREATE - Adicionar nova tarefa
export async function adicionarTarefa(tarefa: TarefaInsert): Promise<ChecklistItem> {
  const { data, error } = await supabase
    .from('tarefas')
    .insert({
      titulo: tarefa.title,
      categoria_id: tarefa.categoryId,
      data_vencimento: tarefa.dueDate,
      concluida: tarefa.completed,
    })
    .select(`
      *,
      categorias:categoria_id (
        nome
      )
    `)
    .single()

  if (error) throw error

  return {
    id: data.id,
    title: data.titulo,
    categoryId: data.categoria_id,
    categoryName: data.categorias?.nome || 'Outros',
    dueDate: data.data_vencimento,
    completed: data.concluida,
  }
}

// UPDATE - Atualizar tarefa existente
export async function atualizarTarefa(
  id: string,
  updates: TarefaUpdate
): Promise<ChecklistItem> {
  const dbUpdates: any = {}
  
  if (updates.title !== undefined) dbUpdates.titulo = updates.title
  if (updates.categoryId !== undefined) dbUpdates.categoria_id = updates.categoryId
  if (updates.dueDate !== undefined) dbUpdates.data_vencimento = updates.dueDate
  if (updates.completed !== undefined) dbUpdates.concluida = updates.completed

  const { data, error } = await supabase
    .from('tarefas')
    .update(dbUpdates)
    .eq('id', id)
    .select(`
      *,
      categorias:categoria_id (
        nome
      )
    `)
    .single()

  if (error) throw error

  return {
    id: data.id,
    title: data.titulo,
    categoryId: data.categoria_id,
    categoryName: data.categorias?.nome || 'Outros',
    dueDate: data.data_vencimento,
    completed: data.concluida,
  }
}

// DELETE - Remover tarefa
export async function deletarTarefa(id: string): Promise<void> {
  const { error } = await supabase
    .from('tarefas')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// TOGGLE - Alternar status de conclusão
export async function alternarTarefa(id: string): Promise<ChecklistItem> {
  // Busca o estado atual
  const { data: current, error: fetchError } = await supabase
    .from('tarefas')
    .select('concluida')
    .eq('id', id)
    .single()

  if (fetchError) throw fetchError

  // Inverte o estado
  const { data, error } = await supabase
    .from('tarefas')
    .update({ concluida: !current.concluida })
    .eq('id', id)
    .select(`
      *,
      categorias:categoria_id (
        nome
      )
    `)
    .single()

  if (error) throw error

  return {
    id: data.id,
    title: data.titulo,
    categoryId: data.categoria_id,
    categoryName: data.categorias?.nome || 'Outros',
    dueDate: data.data_vencimento,
    completed: data.concluida,
  }
}
