# 🧹 Como Limpar TUDO (Reset Completo)

## Método Recomendado (Mais Seguro)

### Passo 1: Limpar Dados das Tabelas
No **SQL Editor** do Supabase, execute:

```sql
TRUNCATE TABLE tarefas CASCADE;
TRUNCATE TABLE gastos CASCADE;
TRUNCATE TABLE categorias CASCADE;
```

### Passo 2: Deletar Usuários pelo Dashboard
1. Vá em **Authentication** > **Users**
2. Marque o checkbox no topo da lista (seleciona todos)
3. Clique em **"Delete selected users"** ou **"Delete"**
4. Confirme a exclusão

✅ **Pronto!** Tudo limpo e pronto para novos testes.

---

## Método Alternativo (Via SQL)

Se preferir fazer tudo via SQL, execute no **SQL Editor**:

```sql
-- Limpar dados
TRUNCATE TABLE tarefas CASCADE;
TRUNCATE TABLE gastos CASCADE;
TRUNCATE TABLE categorias CASCADE;

-- Limpar autenticação
DELETE FROM auth.identities;
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.users;
```

⚠️ **Nota:** Alguns comandos podem falhar por permissões. Neste caso, use o Dashboard para deletar usuários.

---

## Verificar se Limpou Tudo

Execute no SQL Editor:

```sql
SELECT COUNT(*) as total_categorias FROM categorias;
SELECT COUNT(*) as total_gastos FROM gastos;
SELECT COUNT(*) as total_tarefas FROM tarefas;
SELECT COUNT(*) as total_usuarios FROM auth.users;
```

Todos devem retornar **0**.

---

## Deletar Usuário Específico

### Via Dashboard:
1. **Authentication** > **Users**
2. Clique nos 3 pontinhos ao lado do usuário
3. **Delete user**

### Via SQL:
```sql
DELETE FROM auth.users WHERE email = 'teste@exemplo.com';
```

---

## Dicas

- 🔄 **CASCADE automático**: Deletar usuário remove seus dados automaticamente
- 📧 **Email liberado**: Após deletar, o email fica disponível para novo cadastro
- 🚪 **Logout automático**: Usuário é deslogado ao ser deletado
- ⚡ **Desenvolvimento**: Use TRUNCATE para testes rápidos

---

## Troubleshooting

### "Permission denied" ao deletar usuários via SQL
- Use o Dashboard: **Authentication** > **Users** > **Delete**
- Ou execute com service_role key (não recomendado em produção)

### Dados não somem após deletar usuário
- Verifique se as policies RLS estão ativas
- Execute TRUNCATE manualmente nas tabelas

### Erro ao fazer TRUNCATE
- Certifique-se que não há dados dependentes
- Use CASCADE: `TRUNCATE TABLE nome CASCADE;`
