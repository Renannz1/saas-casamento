-- ============================================
-- MIGRAÇÃO: Adicionar campo "forma de pagamento" em gastos
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/axrsoymdqyneepafukgf/sql

-- 1. Adicionar coluna forma_pagamento (nullable)
ALTER TABLE gastos ADD COLUMN IF NOT EXISTS forma_pagamento TEXT CHECK (forma_pagamento IN ('avista', 'parcelado'));

-- 2. Criar índice para consultas
CREATE INDEX IF NOT EXISTS idx_gastos_forma_pagamento ON gastos(forma_pagamento);

-- ============================================
-- PRONTO! Campo "forma de pagamento" adicionado
-- ============================================

-- VALORES PERMITIDOS:
-- - 'avista' (À vista)
-- - 'parcelado' (Parcelado)
-- - NULL (não informado)
