# Requisitos: Sistema de Autenticação de Usuários

## Visão Geral
Implementar um sistema completo de autenticação para o aplicativo Nuptial, permitindo que usuários criem contas, façam login, e tenham seus dados de casamento salvos de forma persistente e segura.

## Objetivos
- Substituir o login fictício por autenticação real
- Permitir cadastro de novos usuários
- Proteger rotas do dashboard (apenas usuários autenticados)
- Persistir dados de usuários e seus casamentos
- Implementar logout funcional

## Histórias de Usuário

### 1. Cadastro de Novo Usuário
**Como** um casal que está planejando o casamento  
**Quero** criar uma conta no sistema  
**Para que** eu possa salvar e acompanhar meu orçamento de casamento

**Critérios de Aceitação:**
- 1.1 O usuário pode acessar uma página de cadastro
- 1.2 O formulário de cadastro solicita: nome completo, email, senha e confirmação de senha
- 1.3 O email deve ser único no sistema
- 1.4 A senha deve ter no mínimo 6 caracteres
- 1.5 A confirmação de senha deve corresponder à senha
- 1.6 Após cadastro bem-sucedido, o usuário é redirecionado para o dashboard
- 1.7 Mensagens de erro claras são exibidas para validações falhas
- 1.8 O email é validado (formato correto)

### 2. Login de Usuário Existente
**Como** um usuário cadastrado  
**Quero** fazer login no sistema  
**Para que** eu possa acessar meus dados de casamento salvos

**Critérios de Aceitação:**
- 2.1 O usuário pode fazer login com email e senha
- 2.2 Credenciais inválidas exibem mensagem de erro apropriada
- 2.3 Após login bem-sucedido, o usuário é redirecionado para o dashboard
- 2.4 A sessão do usuário é mantida entre recarregamentos de página
- 2.5 Link para página de cadastro está visível na tela de login
- 2.6 Feedback visual durante o processo de autenticação (loading)

### 3. Proteção de Rotas
**Como** desenvolvedor do sistema  
**Quero** proteger as rotas do dashboard  
**Para que** apenas usuários autenticados possam acessá-las

**Critérios de Aceitação:**
- 3.1 Usuários não autenticados são redirecionados para /login ao tentar acessar rotas protegidas
- 3.2 Rotas protegidas: /dashboard, /gastos, /checklist
- 3.3 A verificação de autenticação é feita no servidor (middleware)
- 3.4 Rotas públicas: /, /login, /cadastro

### 4. Logout de Usuário
**Como** um usuário autenticado  
**Quero** fazer logout do sistema  
**Para que** eu possa encerrar minha sessão com segurança

**Critérios de Aceitação:**
- 4.1 Botão de logout visível no sidebar/navbar
- 4.2 Ao clicar em logout, a sessão é encerrada
- 4.3 Usuário é redirecionado para a página de login
- 4.4 Após logout, não é possível acessar rotas protegidas sem novo login

### 5. Persistência de Dados por Usuário
**Como** um usuário autenticado  
**Quero** que meus dados de casamento sejam salvos  
**Para que** eu possa acessá-los em qualquer dispositivo

**Critérios de Aceitação:**
- 5.1 Cada usuário tem seu próprio conjunto de dados (categorias, gastos, checklist)
- 5.2 Dados são carregados automaticamente após login
- 5.3 Alterações nos dados são salvas automaticamente ou com confirmação
- 5.4 Usuários diferentes não podem ver dados uns dos outros

## Requisitos Técnicos

### Stack Tecnológica Proposta
**Opção 1: NextAuth.js + Prisma + PostgreSQL (Recomendado)**
- NextAuth.js para autenticação
- Prisma como ORM
- PostgreSQL como banco de dados (Supabase ou Vercel Postgres)
- bcrypt para hash de senhas

**Opção 2: Supabase Auth (Alternativa Simples)**
- Supabase Auth para autenticação completa
- Supabase Database para persistência
- Row Level Security (RLS) para segurança

**Opção 3: Firebase Auth (Alternativa)**
- Firebase Authentication
- Firestore para banco de dados
- Firebase Security Rules

### Modelo de Dados

```typescript
// User
{
  id: string
  name: string
  email: string (unique)
  password: string (hashed)
  createdAt: Date
  updatedAt: Date
}

// Wedding (dados do casamento do usuário)
{
  id: string
  userId: string (FK)
  budgetTotal: number
  weddingDate?: Date
  createdAt: Date
  updatedAt: Date
}

// Category
{
  id: string
  weddingId: string (FK)
  name: string
  planned: number
  spent: number
  createdAt: Date
  updatedAt: Date
}

// Expense
{
  id: string
  categoryId: string (FK)
  title: string
  fornecedor: string
  total: number
  installments: number
  paid: boolean
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}

// ChecklistItem
{
  id: string
  weddingId: string (FK)
  title: string
  category: string
  dueDate: Date
  completed: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Segurança
- Senhas devem ser hasheadas com bcrypt (salt rounds: 10)
- Tokens de sessão seguros (httpOnly cookies)
- Validação de entrada no servidor
- Proteção contra CSRF
- Rate limiting para tentativas de login

### Performance
- Sessões devem ser validadas de forma eficiente
- Cache de dados do usuário quando apropriado
- Lazy loading de dados não críticos

## Questões em Aberto

1. **Qual stack de autenticação você prefere?**
   - NextAuth.js + Prisma + PostgreSQL (mais controle, mais setup)
   - Supabase (mais rápido, menos controle)
   - Firebase (familiar, bom para MVP)

2. **Recuperação de senha?**
   - Implementar "Esqueci minha senha" agora ou em fase futura?

3. **Dados iniciais?**
   - Ao criar conta, o usuário começa com dados vazios ou com template de exemplo?

4. **Múltiplos casamentos?**
   - Um usuário pode ter múltiplos casamentos ou apenas um?

5. **Compartilhamento?**
   - Dois usuários (noivos) podem compartilhar o mesmo casamento?

## Fora do Escopo (Fase Futura)
- Autenticação social (Google, Facebook)
- Autenticação de dois fatores (2FA)
- Verificação de email
- Múltiplos casamentos por usuário
- Compartilhamento entre noivos
- Perfil de usuário editável

## Dependências
- Nenhuma dependência de outras features

## Riscos e Mitigações
- **Risco**: Perda de dados durante migração de mock para real
  - **Mitigação**: Implementar migração gradual, manter mock como fallback inicial
  
- **Risco**: Complexidade de setup do banco de dados
  - **Mitigação**: Usar serviços gerenciados (Supabase/Vercel)
  
- **Risco**: Segurança de senhas
  - **Mitigação**: Usar bibliotecas estabelecidas (bcrypt, NextAuth)

## Estimativa de Esforço
- Setup de autenticação: 2-3 horas
- Implementação de UI (login/cadastro): 1-2 horas
- Proteção de rotas: 1 hora
- Migração de dados mock para banco: 2-3 horas
- Testes e ajustes: 1-2 horas
- **Total estimado**: 7-11 horas

## Próximos Passos
1. Decidir stack de autenticação
2. Criar design document detalhado
3. Implementar autenticação básica
4. Implementar persistência de dados
5. Testar fluxos completos
6. Deploy e validação
