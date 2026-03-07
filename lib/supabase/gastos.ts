import { supabase } from './client'
import { Expense } from '@/types'

// Tipo para inserir gasto (sem id)
type GastoInsert = Omit<Expense, 'id'>
type GastoUpdate = Partial<Omit<Expense, 'id'>>

// Helper: Atualiza o total gasto da categoria
async function atualizarTotalCategoria(categoriaId: string): Promise<void> {
  // Busca todos os gastos da categoria
  const { data: gastos, error: gastosError } = await supabase
    .from('gastos')
    .select('total')
    .eq('categoria_id', categoriaId)

  if (gastosError) throw gastosError

  // Calcula o total
  const totalGasto = gastos.reduce((sum, g) => sum + g.total, 0)

  // Atualiza a categoria
  const { error: updateError } = await supabase
    .from('categorias')
    .update({ gasto: totalGasto })
    .eq('id', categoriaId)

  if (updateError) throw updateError
}

// READ - Buscar gastos de uma categoria
export async function buscarGastosPorCategoria(categoriaId: string): Promise<Expense[]> {
  const { data, error } = await supabase
    .from('gastos')
    .select('*')
    .eq('categoria_id', categoriaId)
    .order('data_vencimento', { ascending: true })

  if (error) throw error

  return data.map(g => ({
    id: g.id,
    title: g.titulo,
    fornecedor: g.fornecedor,
    total: g.total,
    installments: g.parcelas,
    paid: g.pago,
    dueDate: g.data_vencimento,
  }))
}

// CREATE - Adicionar novo gasto
export async function adicionarGasto(
  categoriaId: string,
  gasto: GastoInsert
): Promise<Expense> {
  const { data, error } = await supabase
    .from('gastos')
    .insert({
      categoria_id: categoriaId,
      titulo: gasto.title,
      fornecedor: gasto.fornecedor,
      total: gasto.total,
      parcelas: gasto.installments,
      pago: gasto.paid,
      data_vencimento: gasto.dueDate,
    })
    .select()
    .single()

  if (error) throw error

  // Atualiza o total da categoria
  await atualizarTotalCategoria(categoriaId)

  return {
    id: data.id,
    title: data.titulo,
    fornecedor: data.fornecedor,
    total: data.total,
    installments: data.parcelas,
    paid: data.pago,
    dueDate: data.data_vencimento,
  }
}

// UPDATE - Atualizar gasto existente
export async function atualizarGasto(
  categoriaId: string,
  gastoId: string,
  updates: GastoUpdate
): Promise<Expense> {
  const dbUpdates: any = {}
  
  if (updates.title !== undefined) dbUpdates.titulo = updates.title
  if (updates.fornecedor !== undefined) dbUpdates.fornecedor = updates.fornecedor
  if (updates.total !== undefined) dbUpdates.total = updates.total
  if (updates.installments !== undefined) dbUpdates.parcelas = updates.installments
  if (updates.paid !== undefined) dbUpdates.pago = updates.paid
  if (updates.dueDate !== undefined) dbUpdates.data_vencimento = updates.dueDate

  const { data, error } = await supabase
    .from('gastos')
    .update(dbUpdates)
    .eq('id', gastoId)
    .select()
    .single()

  if (error) throw error

  // Atualiza o total da categoria
  await atualizarTotalCategoria(categoriaId)

  return {
    id: data.id,
    title: data.titulo,
    fornecedor: data.fornecedor,
    total: data.total,
    installments: data.parcelas,
    paid: data.pago,
    dueDate: data.data_vencimento,
  }
}

// DELETE - Remover gasto
export async function deletarGasto(categoriaId: string, gastoId: string): Promise<void> {
  const { error } = await supabase
    .from('gastos')
    .delete()
    .eq('id', gastoId)

  if (error) throw error

  // Atualiza o total da categoria
  await atualizarTotalCategoria(categoriaId)
}
