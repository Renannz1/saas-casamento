-- =====================================================
-- SCRIPT DE MIGRAÇÃO PARA AUTENTICAÇÃO
-- =====================================================
-- Este script adiciona autenticação ao sistema
-- IMPORTANTE: Execute este script no Supabase SQL Editor

-- 1. Adicionar coluna user_id nas tabelas
ALTER TABLE categorias ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE gastos ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE tarefas ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_categorias_user_id ON categorias(user_id);
CREATE INDEX IF NOT EXISTS idx_gastos_user_id ON gastos(user_id);
CREATE INDEX IF NOT EXISTS idx_tarefas_user_id ON tarefas(user_id);

-- 3. Remover policies antigas (permissivas)
DROP POLICY IF EXISTS "Permitir todas operações em categorias" ON categorias;
DROP POLICY IF EXISTS "Permitir todas operações em gastos" ON gastos;
DROP POLICY IF EXISTS "Permitir todas operações em tarefas" ON tarefas;

-- 4. Criar policies seguras (RLS)

-- CATEGORIAS
CREATE POLICY "Users can view their own categorias" ON categorias
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own categorias" ON categorias
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categorias" ON categorias
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categorias" ON categorias
  FOR DELETE USING (auth.uid() = user_id);

-- GASTOS
CREATE POLICY "Users can view their own gastos" ON gastos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gastos" ON gastos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gastos" ON gastos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gastos" ON gastos
  FOR DELETE USING (auth.uid() = user_id);

-- TAREFAS
CREATE POLICY "Users can view their own tarefas" ON tarefas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tarefas" ON tarefas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tarefas" ON tarefas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tarefas" ON tarefas
  FOR DELETE USING (auth.uid() = user_id);

-- 5. OPCIONAL: Deletar dados de teste antigos (sem user_id)
-- ATENÇÃO: Descomente apenas se quiser limpar dados antigos
-- DELETE FROM tarefas WHERE user_id IS NULL;
-- DELETE FROM gastos WHERE user_id IS NULL;
-- DELETE FROM categorias WHERE user_id IS NULL;

-- =====================================================
-- MIGRAÇÃO CONCLUÍDA
-- =====================================================
-- Próximos passos:
-- 1. Atualizar os services para incluir user_id
-- 2. Testar criando uma nova conta
-- 3. Verificar que os dados são isolados por usuário
