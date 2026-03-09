-- ============================================
-- MIGRAÇÃO: Adicionar campo "quem pagou" em gastos
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/axrsoymdqyneepafukgf/sql

-- 1. Adicionar coluna pago_por (nullable)
ALTER TABLE gastos ADD COLUMN IF NOT EXISTS pago_por TEXT CHECK (pago_por IN ('noivo', 'noiva', 'familia'));

-- 2. Criar índice para consultas
CREATE INDEX IF NOT EXISTS idx_gastos_pago_por ON gastos(pago_por);

-- ============================================
-- PRONTO! Campo "quem pagou" adicionado
-- ============================================

-- VALORES PERMITIDOS:
-- - 'noivo'
-- - 'noiva'
-- - 'familia'
-- - NULL (não informado)
