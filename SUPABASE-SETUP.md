# Configuração do Supabase

## Passo 1: Criar as Tabelas

1. Acesse o SQL Editor do seu projeto Supabase:
   https://supabase.com/dashboard/project/axrsoymdqyneepafukgf/sql

2. Copie todo o conteúdo do arquivo `supabase-setup.sql`

3. Cole no SQL Editor e clique em "Run" para executar

## Passo 1.5: Migração - Relacionar Tarefas com Categorias

**IMPORTANTE**: Execute este passo DEPOIS de criar as tabelas iniciais!

1. Copie o conteúdo do arquivo `supabase-migration-tarefas.sql`

2. Cole no SQL Editor e clique em "Run"

3. Isso vai adicionar o relacionamento entre tarefas e categorias (Foreign Key)

## Passo 2: Verificar as Tabelas

Após executar o script, você deve ter:

- ✅ Tabela `categorias` com os campos:
  - id (UUID)
  - nome (TEXT)
  - planejado (NUMERIC)
  - gasto (NUMERIC)
  - criado_em (TIMESTAMP)

- ✅ Tabela `gastos` com os campos:
  - id (UUID)
  - categoria_id (UUID - FK para categorias)
  - titulo (TEXT)
  - fornecedor (TEXT)
  - total (NUMERIC)
  - parcelas (INTEGER)
  - pago (BOOLEAN)
  - data_vencimento (DATE)
  - criado_em (TIMESTAMP)

- ✅ Tabela `tarefas` com os campos:
  - id (UUID)
  - titulo (TEXT)
  - categoria (TEXT)
  - data_vencimento (DATE)
  - concluida (BOOLEAN)
  - criado_em (TIMESTAMP)

## Passo 3: Testar a Aplicação

1. Reinicie o servidor de desenvolvimento (se estiver rodando):
   ```bash
   npm run dev
   ```

2. Acesse http://localhost:3000

3. Teste criar uma categoria em "Gastos"

4. Teste adicionar gastos dentro da categoria

## Estrutura Implementada

### Arquivos Criados:
- `lib/supabase/client.ts` - Cliente do Supabase
- `lib/supabase/categorias.ts` - CRUD de categorias
- `lib/supabase/gastos.ts` - CRUD de gastos
- `lib/supabase/tarefas.ts` - CRUD de tarefas/checklist

### Arquivos Atualizados:
- `contexts/DataContext.tsx` - Integrado com Supabase
- `app/(dashboard)/gastos/page.tsx` - Funções assíncronas
- `app/(dashboard)/checklist/page.tsx` - Funções assíncronas
- `app/(dashboard)/dashboard/page.tsx` - Usa dados do Context

### Funcionalidades:
- ✅ CRUD completo de categorias (Supabase)
- ✅ CRUD completo de gastos (Supabase)
- ✅ CRUD completo de tarefas/checklist (Supabase)
- ✅ Atualização automática do total gasto da categoria
- ✅ Loading state enquanto carrega dados
- ✅ Toggle de conclusão de tarefas

## Observações Importantes

1. **RLS (Row Level Security)**: As políticas estão configuradas para permitir acesso público temporariamente. Quando implementar autenticação, ajuste as políticas!

2. **Cascade Delete**: Quando uma categoria é deletada, todos os gastos associados são removidos automaticamente.

3. **Cálculo Automático**: O campo `gasto` da categoria é atualizado automaticamente sempre que um gasto é criado, editado ou deletado.

4. **Nomes em PT-BR**: Todos os nomes de tabelas e campos estão em português brasileiro conforme solicitado.
