import { supabase } from './client'
import { ChecklistItem } from '@/types'

// Tipo para inserir tarefa (sem id e categoryName)
type TarefaInsert = Omit<ChecklistItem, 'id' | 'categoryName'>
type TarefaUpdate = Partial<Omit<ChecklistItem, 'id' | 'categoryName'>>

// Helper: Pegar user_id do usuário autenticado
async function getUserId(): Promise<string> {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Usuário não autenticado')
  return user.id
}

// READ - Buscar todas as tarefas com nome da categoria
export async function buscarTarefas(): Promise<ChecklistItem[]> {
  const userId = await getUserId()
  
  const { data, error } = await supabase
    .from('tarefas')
    .select(`
      *,
      categorias:categoria_id (
        nome
      )
    `)
    .eq('user_id', userId)
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
  const userId = await getUserId()
  
  const { data, error } = await supabase
    .from('tarefas')
    .insert({
      titulo: tarefa.title,
      categoria_id: tarefa.categoryId,
      data_vencimento: tarefa.dueDate,
      concluida: tarefa.completed,
      user_id: userId,
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
  const userId = await getUserId()
  
  const dbUpdates: any = {}
  
  if (updates.title !== undefined) dbUpdates.titulo = updates.title
  if (updates.categoryId !== undefined) dbUpdates.categoria_id = updates.categoryId
  if (updates.dueDate !== undefined) dbUpdates.data_vencimento = updates.dueDate
  if (updates.completed !== undefined) dbUpdates.concluida = updates.completed

  const { data, error } = await supabase
    .from('tarefas')
    .update(dbUpdates)
    .eq('id', id)
    .eq('user_id', userId)
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
  const userId = await getUserId()
  
  const { error } = await supabase
    .from('tarefas')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
}

// TOGGLE - Alternar status de conclusão
export async function alternarTarefa(id: string): Promise<ChecklistItem> {
  const userId = await getUserId()
  
  // Busca o estado atual
  const { data: current, error: fetchError } = await supabase
    .from('tarefas')
    .select('concluida')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (fetchError) throw fetchError

  // Inverte o estado
  const { data, error } = await supabase
    .from('tarefas')
    .update({ concluida: !current.concluida })
    .eq('id', id)
    .eq('user_id', userId)
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

