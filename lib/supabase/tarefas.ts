import { supabase } from './client'
import { ChecklistItem } from '@/types'

// Tipo para inserir tarefa (sem id)
type TarefaInsert = Omit<ChecklistItem, 'id'>
type TarefaUpdate = Partial<Omit<ChecklistItem, 'id'>>

// READ - Buscar todas as tarefas
export async function buscarTarefas(): Promise<ChecklistItem[]> {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .order('data_vencimento', { ascending: true })

  if (error) throw error

  return data.map(t => ({
    id: t.id,
    title: t.titulo,
    category: t.categoria,
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
      categoria: tarefa.category,
      data_vencimento: tarefa.dueDate,
      concluida: tarefa.completed,
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    title: data.titulo,
    category: data.categoria,
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
  if (updates.category !== undefined) dbUpdates.categoria = updates.category
  if (updates.dueDate !== undefined) dbUpdates.data_vencimento = updates.dueDate
  if (updates.completed !== undefined) dbUpdates.concluida = updates.completed

  const { data, error } = await supabase
    .from('tarefas')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    title: data.titulo,
    category: data.categoria,
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
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    title: data.titulo,
    category: data.categoria,
    dueDate: data.data_vencimento,
    completed: data.concluida,
  }
}
