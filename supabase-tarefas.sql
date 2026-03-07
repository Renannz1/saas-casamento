-- ============================================
-- SCRIPT PARA ADICIONAR TABELA DE TAREFAS
-- ============================================
-- Execute este script se você já criou as tabelas de categorias e gastos
-- https://supabase.com/dashboard/project/axrsoymdqyneepafukgf/sql

-- 1. Criar tabela de tarefas (checklist)
CREATE TABLE tarefas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  data_vencimento DATE NOT NULL,
  concluida BOOLEAN DEFAULT false,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- 2. Configurar RLS (Row Level Security)
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;

-- Política temporária (permitir tudo)
CREATE POLICY "Permitir tudo em tarefas" ON tarefas FOR ALL USING (true) WITH CHECK (true);

-- 3. Criar índices para melhor performance
CREATE INDEX idx_tarefas_data_vencimento ON tarefas(data_vencimento);
CREATE INDEX idx_tarefas_concluida ON tarefas(concluida);

-- ============================================
-- PRONTO! Tabela de tarefas criada
-- ============================================
