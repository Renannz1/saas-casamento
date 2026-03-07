-- ============================================
-- ALTERNATIVA: Recriar tabela tarefas do zero
-- ============================================
-- Use este script SE a migração não funcionar
-- ATENÇÃO: Isso vai APAGAR todas as tarefas existentes!

-- 1. Remover tabela antiga
DROP TABLE IF EXISTS tarefas CASCADE;

-- 2. Criar tabela nova com relacionamento
CREATE TABLE tarefas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
  data_vencimento DATE NOT NULL,
  concluida BOOLEAN DEFAULT false,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- 3. Configurar RLS
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir tudo em tarefas" ON tarefas FOR ALL USING (true) WITH CHECK (true);

-- 4. Criar índices
CREATE INDEX idx_tarefas_categoria_id ON tarefas(categoria_id);
CREATE INDEX idx_tarefas_data_vencimento ON tarefas(data_vencimento);
CREATE INDEX idx_tarefas_concluida ON tarefas(concluida);

-- ============================================
-- PRONTO! Tabela tarefas recriada com relacionamento
-- ============================================
