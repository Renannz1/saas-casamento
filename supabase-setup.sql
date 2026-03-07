-- ============================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS NO SUPABASE
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/axrsoymdqyneepafukgf/sql

-- 1. Criar tabela de categorias
CREATE TABLE categorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  planejado NUMERIC NOT NULL,
  gasto NUMERIC DEFAULT 0,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- 2. Criar tabela de gastos
CREATE TABLE gastos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria_id UUID NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  fornecedor TEXT NOT NULL,
  total NUMERIC NOT NULL,
  parcelas INTEGER DEFAULT 1,
  pago BOOLEAN DEFAULT false,
  data_vencimento DATE NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- 3. Criar tabela de tarefas (checklist)
CREATE TABLE tarefas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  data_vencimento DATE NOT NULL,
  concluida BOOLEAN DEFAULT false,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- 4. Configurar RLS (Row Level Security) - Permitir acesso público temporário
-- IMPORTANTE: Depois de implementar autenticação, ajuste essas políticas!

ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;

-- Políticas temporárias (permitir tudo)
CREATE POLICY "Permitir tudo em categorias" ON categorias FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo em gastos" ON gastos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo em tarefas" ON tarefas FOR ALL USING (true) WITH CHECK (true);

-- 5. Criar índices para melhor performance
CREATE INDEX idx_gastos_categoria_id ON gastos(categoria_id);
CREATE INDEX idx_gastos_data_vencimento ON gastos(data_vencimento);
CREATE INDEX idx_tarefas_data_vencimento ON tarefas(data_vencimento);
CREATE INDEX idx_tarefas_concluida ON tarefas(concluida);

-- ============================================
-- PRONTO! Agora você pode usar o sistema
-- ============================================
