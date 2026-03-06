# Nuptial - Sistema de Organização Financeira para Casamentos

Sistema web responsivo desenvolvido com Next.js (App Router), TypeScript e TailwindCSS para gerenciamento financeiro de casamentos. Design elegante inspirado em paleta terrosa/rosé com tipografia premium.

## 🚀 Tecnologias

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS** com design system customizado
- **Recharts** para visualização de dados
- **Lucide React** para ícones
- **Fontes**: Playfair Display (títulos) + Lato (corpo)

## 🎨 Design System

### Paleta de Cores
- **Background**: Tons bege/creme claro (HSL 30, 33%, 97%)
- **Primary**: Tons terrosos/rosé (HSL 24, 30%, 55%)
- **Secondary**: Bege claro (HSL 30, 33%, 95%)
- **Accent**: Marrom médio (HSL 24, 20%, 45%)
- **Success**: Verde para valores positivos (HSL 142, 40%, 45%)
- **Destructive**: Vermelho para alertas (HSL 0, 60%, 55%)

### Tipografia
- **Display**: Playfair Display (serif) - para títulos
- **Body**: Lato (sans-serif) - para texto corrido

## 📋 Funcionalidades

### 1. Login (`/login`)
- Interface elegante com branding Nuptial
- Autenticação fictícia (demonstração)
- Redirecionamento automático para dashboard

### 2. Dashboard (`/dashboard`)
- **Resumo Financeiro Completo**
  - Cards com orçamento total, gasto e restante
  - Barra de progresso visual
  - Alerta quando orçamento excedido
  
- **Gráfico de Pizza**
  - Visualização de gastos por categoria
  - Cores diferenciadas por categoria
  - Tooltip com valores formatados
  
- **Próximos Pagamentos**
  - Lista de pagamentos pendentes
  - Status (pago/pendente)
  - Datas de vencimento
  
- **Progresso do Checklist**
  - Percentual de conclusão
  - Próximas tarefas pendentes

### 3. Gastos (`/gastos`)
- **Visualização por Categorias**
  - Cards com previsto vs gasto vs diferença
  - Indicador visual de categorias excedidas
  - Barra de progresso por categoria
  
- **Detalhamento de Despesas**
  - Lista completa de gastos por categoria
  - Informações de parcelamento
  - Status de pagamento
  - Datas de vencimento
  
- **Modal de Adição** (demonstração)
  - Interface para adicionar novos gastos

### 4. Checklist (`/checklist`)
- Lista completa de tarefas do casamento
- Barra de progresso geral
- Categorização de tarefas
- Datas de vencimento
- Toggle interativo para marcar conclusão
- Feedback visual (riscado quando concluído)

## 💾 Dados

### Orçamento Total
R$ 120.000,00

### Categorias (6)
1. **Buffet** - R$ 35.000 (planejado)
2. **Decoração** - R$ 20.000 (planejado)
3. **Fotografia** - R$ 15.000 (planejado)
4. **Música** - R$ 10.000 (planejado)
5. **Espaço** - R$ 25.000 (planejado)
6. **Vestido** - R$ 15.000 (planejado)

### Checklist
10 tarefas organizadas por categoria e data

### Próximos Pagamentos
5 pagamentos pendentes com fornecedores

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

O servidor estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
wedding-finance/
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx    # Dashboard principal
│   │   ├── gastos/page.tsx       # Gestão de gastos
│   │   ├── checklist/page.tsx    # Checklist de tarefas
│   │   └── layout.tsx            # Layout do dashboard
│   ├── login/page.tsx            # Página de login
│   ├── globals.css               # Estilos globais + design system
│   ├── layout.tsx                # Layout raiz
│   └── page.tsx                  # Redirect para login
├── components/
│   ├── BottomNav.tsx             # Navegação mobile
│   ├── Navbar.tsx                # Barra superior
│   ├── ProgressBar.tsx           # Barra de progresso
│   └── Sidebar.tsx               # Menu lateral desktop
├── data/
│   └── mockData.ts               # Dados mockados
├── tailwind.config.ts            # Configuração Tailwind
└── package.json
```

## 🎯 Características

- ✅ Design elegante com paleta terrosa/rosé
- ✅ Tipografia premium (Playfair Display + Lato)
- ✅ Totalmente responsivo (mobile-first)
- ✅ Gráficos interativos com Recharts
- ✅ Animações suaves e transições
- ✅ Componentização clara e reutilizável
- ✅ TypeScript para type safety
- ✅ Dados completamente mockados
- ✅ Sem backend ou autenticação real

## 📱 Responsividade

### Mobile
- Bottom navigation fixa
- Layout otimizado para telas pequenas
- Cards empilhados verticalmente

### Desktop
- Sidebar expansível (hover para expandir)
- Navegação superior
- Grid de 2-3 colunas
- Breakpoints otimizados com TailwindCSS

## 🎨 Componentes Principais

### ProgressBar
Barra de progresso reutilizável com:
- Suporte a valores excedidos
- Variantes (default/danger)
- Label opcional
- Animações suaves

### Sidebar
Menu lateral com:
- Expansão no hover
- Indicador de página ativa
- Ícones + texto
- Transições suaves

### BottomNav
Navegação mobile com:
- 3 itens principais
- Indicador visual de página ativa
- Ícones + labels

## 🔄 Próximos Passos Sugeridos

- [ ] Integração com backend real (Supabase/Firebase)
- [ ] Autenticação de usuários
- [ ] Persistência de dados
- [ ] CRUD completo de gastos e tarefas
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Notificações de pagamentos próximos
- [ ] Compartilhamento entre noivos
- [ ] Upload de comprovantes
- [ ] Histórico de alterações
- [ ] Dark mode

## 📄 Licença

Projeto de demonstração para fins educacionais.

---

**Desenvolvido com ❤️ para casais organizarem o dia mais especial de suas vidas**
