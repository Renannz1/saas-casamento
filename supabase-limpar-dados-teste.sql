-- =====================================================
-- SCRIPT PARA LIMPAR TODOS OS DADOS (RESET COMPLETO)
-- =====================================================
-- ATENÇÃO: Este script deleta TUDO - dados E usuários
-- Use apenas em ambiente de desenvolvimento/teste!

-- =====================================================
-- PASSO 1: Deletar todos os dados das tabelas
-- =====================================================
TRUNCATE TABLE tarefas CASCADE;
TRUNCATE TABLE gastos CASCADE;
TRUNCATE TABLE categorias CASCADE;

-- =====================================================
-- PASSO 2: Deletar todos os usuários
-- =====================================================
-- IMPORTANTE: Isso requer permissões de service_role
-- Execute este comando no SQL Editor do Supabase

-- Deletar identidades dos usuários
DELETE FROM auth.identities;

-- Deletar sessões ativas
DELETE FROM auth.sessions;

-- Deletar refresh tokens
DELETE FROM auth.refresh_tokens;

-- Deletar usuários
DELETE FROM auth.users;

-- =====================================================
-- ALTERNATIVA: Se o script acima não funcionar
-- =====================================================
-- O Supabase pode bloquear deleção direta da tabela auth.users
-- Neste caso, use a função administrativa:

-- Para deletar usuário específico:
-- SELECT auth.uid(); -- pega o ID do usuário atual
-- Depois no Dashboard: Authentication > Users > Delete

-- =====================================================
-- MÉTODO RECOMENDADO: Via Dashboard
-- =====================================================
-- 1. SQL Editor: Execute apenas o PASSO 1 (TRUNCATE das tabelas)
-- 2. Dashboard: Vá em Authentication > Users
-- 3. Selecione todos os usuários (checkbox no topo)
-- 4. Clique em "Delete selected users"
-- 5. Confirme a exclusão

-- =====================================================
-- VERIFICAR SE LIMPOU TUDO
-- =====================================================
-- Execute estas queries para confirmar:

SELECT COUNT(*) as total_categorias FROM categorias;
SELECT COUNT(*) as total_gastos FROM gastos;
SELECT COUNT(*) as total_tarefas FROM tarefas;
SELECT COUNT(*) as total_usuarios FROM auth.users;

-- Todos devem retornar 0

-- =====================================================
-- RESET COMPLETO EXECUTADO COM SUCESSO!
-- =====================================================

