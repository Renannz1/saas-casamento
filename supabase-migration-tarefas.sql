-- ============================================
-- MIGRAÇÃO: Relacionar tarefas com categorias
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/axrsoymdqyneepafukgf/sql

-- ATENÇÃO: Este script vai modificar a estrutura da tabela tarefas

-- 1. Verificar se a coluna já existe, se não, adicionar
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tarefas' AND column_name = 'categoria_id'
  ) THEN
    ALTER TABLE tarefas ADD COLUMN categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL;
    CREATE INDEX idx_tarefas_categoria_id ON tarefas(categoria_id);
  END IF;
END $$;

-- 2. (OPCIONAL) Migrar dados existentes - tentar relacionar pelo nome
-- Descomente as linhas abaixo se você já tem tarefas cadastradas
-- UPDATE tarefas t
-- SET categoria_id = c.id
-- FROM categorias c
-- WHERE t.categoria = c.nome;

-- 3. (OPCIONAL) Remover coluna antiga 'categoria' depois de migrar
-- ATENÇÃO: Só execute isso DEPOIS de verificar que tudo está funcionando!
-- ALTER TABLE tarefas DROP COLUMN IF EXISTS categoria;

-- ============================================
-- PRONTO! Execute este script e teste o sistema
-- ============================================
