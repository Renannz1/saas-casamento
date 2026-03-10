# Configuração de Autenticação - Nuptial

## ✅ O que foi implementado

### 1. Frontend
- ✅ `AuthContext` - Gerenciamento de estado de autenticação
- ✅ Página de Login/Cadastro com formulário completo
- ✅ Proteção de rotas do dashboard
- ✅ Botão de logout no Navbar
- ✅ Redirecionamento automático baseado em autenticação

### 2. Backend (Services)
- ✅ Todos os services atualizados para incluir `user_id`
- ✅ Filtros por usuário em todas as queries
- ✅ Helper `getUserId()` em cada service

### 3. SQL
- ✅ Script `supabase-add-auth.sql` criado

## 🚀 Próximos Passos

### Passo 1: Executar o Script SQL no Supabase

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Abra o arquivo `supabase-add-auth.sql`
5. Copie todo o conteúdo
6. Cole no SQL Editor
7. Clique em **Run** (ou pressione Ctrl+Enter)

O script irá:
- Adicionar coluna `user_id` em todas as tabelas
- Criar índices para performance
- Remover policies antigas (inseguras)
- Criar policies seguras com RLS
- (Opcional) Deletar dados de teste antigos

### Passo 2: Configurar Email no Supabase (Opcional)

Por padrão, o Supabase envia emails de confirmação. Para desenvolvimento:

1. Vá em **Authentication** > **Settings**
2. Em **Email Auth**, você pode:
   - Desabilitar confirmação de email (para testes)
   - Configurar seu próprio SMTP
   - Usar o SMTP padrão do Supabase

### Passo 3: Testar o Sistema

1. Inicie o servidor: `npm run dev`
2. Acesse: http://localhost:3000
3. Clique em "Não tem conta? Cadastre-se"
4. Crie uma conta com email e senha
5. Faça login
6. Crie categorias, gastos e tarefas
7. Faça logout
8. Crie outra conta
9. Verifique que os dados são isolados por usuário

## 🔒 Segurança Implementada

### Row Level Security (RLS)
Cada usuário só pode:
- Ver seus próprios dados
- Criar dados associados ao seu `user_id`
- Editar apenas seus próprios dados
- Deletar apenas seus próprios dados

### Isolamento de Dados
- Categorias filtradas por `user_id`
- Gastos filtrados por `user_id`
- Tarefas filtradas por `user_id`
- Impossível acessar dados de outros usuários

## 📝 Estrutura de Autenticação

### Fluxo de Login
1. Usuário entra em `/`
2. Se não autenticado → redireciona para `/login`
3. Faz login → Supabase retorna sessão
4. Redireciona para `/dashboard`
5. Todas as queries incluem `user_id` automaticamente

### Fluxo de Cadastro
1. Usuário clica em "Cadastre-se"
2. Preenche email e senha (mín 6 caracteres)
3. Supabase cria conta e envia email de confirmação
4. Usuário confirma email (se habilitado)
5. Faz login normalmente

### Proteção de Rotas
- Layout do dashboard verifica autenticação
- Se não autenticado → redireciona para `/login`
- Mostra loading enquanto verifica sessão

## 🛠️ Troubleshooting

### Erro: "Usuário não autenticado"
- Verifique se executou o script SQL
- Faça logout e login novamente
- Limpe o cache do navegador

### Erro: "Row Level Security"
- Certifique-se que as policies foram criadas
- Verifique se o `user_id` está sendo enviado nas queries

### Dados antigos não aparecem
- Normal! Dados sem `user_id` não são acessíveis
- Execute a parte opcional do script SQL para deletá-los
- Ou atualize manualmente com um `user_id` válido

## 🧹 Limpar Dados de Teste

### Método 1: Pelo Dashboard (Recomendado)
1. Acesse **Authentication** > **Users**
2. Clique nos 3 pontinhos ao lado do usuário
3. Clique em **Delete user**
4. Confirme a exclusão
5. Os dados relacionados (categorias, gastos, tarefas) são deletados automaticamente

### Método 2: SQL Script
Execute o arquivo `supabase-limpar-dados-teste.sql` no SQL Editor

**Comando rápido para limpar apenas os dados:**
```sql
TRUNCATE TABLE tarefas, gastos, categorias CASCADE;
```

**Para deletar usuário específico:**
```sql
DELETE FROM auth.users WHERE email = 'teste@exemplo.com';
```

**ATENÇÃO:** Deletar um usuário remove automaticamente todos os seus dados (CASCADE).

## 📧 Configuração de Email (Produção)

Para produção, configure um provedor de email:

1. **SendGrid** (recomendado)
2. **AWS SES**
3. **Mailgun**
4. **Postmark**

Configuração em: **Authentication** > **Settings** > **SMTP Settings**

## 🎉 Pronto!

Seu sistema agora tem autenticação completa e segura!

Cada usuário terá seus próprios dados isolados e protegidos.
