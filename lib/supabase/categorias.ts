import { supabase } from './client'
import { Category, Expense } from '@/types'
import { buscarGastosPorCategoria } from './gastos'

// Tipo para inserir categoria (sem id, spent e expenses)
type CategoriaInsert = Omit<Category, 'id' | 'spent' | 'expenses'>
type CategoriaUpdate = Partial<Omit<Category, 'id' | 'expenses'>>

// READ - Buscar todas as categorias com seus gastos
export async function buscarCategorias(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nome', { ascending: true })

  if (error) throw error

  // Busca os gastos de cada categoria
  const categoriasComGastos = await Promise.all(
    data.map(async (cat) => {
      const gastos = await buscarGastosPorCategoria(cat.id)
      return {
        id: cat.id,
        name: cat.nome,
        planned: cat.planejado,
        spent: cat.gasto || 0,
        expenses: gastos,
      }
    })
  )

  return categoriasComGastos
}

// CREATE - Adicionar nova categoria
export async function adicionarCategoria(categoria: CategoriaInsert): Promise<Category> {
  const { data, error } = await supabase
    .from('categorias')
    .insert({
      nome: categoria.name,
      planejado: categoria.planned,
      gasto: 0,
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    name: data.nome,
    planned: data.planejado,
    spent: data.gasto || 0,
    expenses: [],
  }
}

// UPDATE - Atualizar categoria existente
export async function atualizarCategoria(
  id: string,
  updates: CategoriaUpdate
): Promise<Category> {
  const dbUpdates: any = {}
  
  if (updates.name !== undefined) dbUpdates.nome = updates.name
  if (updates.planned !== undefined) dbUpdates.planejado = updates.planned
  if (updates.spent !== undefined) dbUpdates.gasto = updates.spent

  const { data, error } = await supabase
    .from('categorias')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  const gastos = await buscarGastosPorCategoria(id)

  return {
    id: data.id,
    name: data.nome,
    planned: data.planejado,
    spent: data.gasto || 0,
    expenses: gastos,
  }
}

// DELETE - Remover categoria (CASCADE vai remover os gastos automaticamente)
export async function deletarCategoria(id: string): Promise<void> {
  const { error } = await supabase
    .from('categorias')
    .delete()
    .eq('id', id)

  if (error) throw error
}
