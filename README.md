# Wedding Finance - Sistema de Organização Financeira para Casamentos

Sistema web responsivo desenvolvido com Next.js (App Router), TypeScript e TailwindCSS para gerenciamento financeiro de casamentos.

## 🚀 Tecnologias

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Lucide React (ícones)

## 📋 Funcionalidades

### Páginas Implementadas

1. **Login** (`/login`)
   - Interface de autenticação fictícia
   - Redirecionamento para dashboard

2. **Dashboard** (`/dashboard`)
   - Resumo financeiro completo
   - Gráfico de gastos por categoria
   - Lista de próximos pagamentos
   - Progresso do checklist

3. **Gastos** (`/gastos`)
   - Visualização em cards por categoria
   - Detalhamento de despesas
   - Indicadores visuais de orçamento
   - Modal de adição (demonstração)

4. **Checklist** (`/checklist`)
   - Lista de tarefas organizadas
   - Barra de progresso geral
   - Marcação interativa de conclusão
   - Ordenação por status e data

## 🎨 Design

- Mobile-first e totalmente responsivo
- Interface minimalista e limpa
- Sidebar no desktop
- Bottom navigation no mobile
- Cores: verde (positivo), vermelho (alerta)
- Bordas arredondadas e sombras suaves

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## 📁 Estrutura do Projeto

```
wedding-finance/
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   ├── gastos/
│   │   ├── checklist/
│   │   └── layout.tsx
│   ├── login/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BottomNav.tsx
│   ├── CardResumo.tsx
│   ├── CategoriaCard.tsx
│   ├── ChecklistItem.tsx
│   ├── ExpenseItem.tsx
│   ├── Navbar.tsx
│   ├── ProgressBar.tsx
│   └── Sidebar.tsx
├── data/
│   └── mockData.ts
└── ...
```

## 💾 Dados Mockados

Todos os dados são mockados localmente em `data/mockData.ts`:
- Orçamento total: R$ 80.000
- 6 categorias de gastos
- Múltiplas despesas por categoria
- 8 itens no checklist

## 🎯 Características

- ✅ Sem backend ou autenticação real
- ✅ Dados completamente mockados
- ✅ Componentização clara
- ✅ Código limpo e organizado
- ✅ TypeScript para type safety
- ✅ Responsivo e mobile-first
- ✅ Navegação funcional entre páginas

## 📱 Responsividade

- Mobile: Bottom navigation + menu lateral retrátil
- Desktop: Sidebar fixa + navegação superior
- Breakpoints otimizados com TailwindCSS

## 🔄 Próximos Passos (Sugestões)

- Integração com backend real
- Autenticação de usuários
- Persistência de dados
- Exportação de relatórios
- Notificações de pagamentos
- Compartilhamento entre noivos

## 📄 Licença

Projeto de demonstração para fins educacionais.
