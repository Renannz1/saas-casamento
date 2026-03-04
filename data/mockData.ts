export interface Expense {
  id: string;
  title: string;
  fornecedor: string;
  total: number;
  installments: number;
  paid: boolean;
  dueDate?: string;
}

export interface Category {
  id: string;
  name: string;
  planned: number;
  spent: number;
  expenses: Expense[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
}

export interface MockData {
  budgetTotal: number;
  categories: Category[];
  checklist: ChecklistItem[];
}

export const mockData: MockData = {
  budgetTotal: 80000,
  categories: [
    {
      id: '1',
      name: 'Buffet',
      planned: 25000,
      spent: 22000,
      expenses: [
        {
          id: '1-1',
          title: 'Buffet Completo',
          fornecedor: 'Sabor & Arte Eventos',
          total: 18000,
          installments: 3,
          paid: false,
          dueDate: '2026-05-15'
        },
        {
          id: '1-2',
          title: 'Bolo de Casamento',
          fornecedor: 'Confeitaria Doce Amor',
          total: 2000,
          installments: 1,
          paid: true,
          dueDate: '2026-03-10'
        },
        {
          id: '1-3',
          title: 'Bebidas Premium',
          fornecedor: 'Sabor & Arte Eventos',
          total: 2000,
          installments: 1,
          paid: false,
          dueDate: '2026-06-01'
        }
      ]
    },
    {
      id: '2',
      name: 'Decoração',
      planned: 15000,
      spent: 18500,
      expenses: [
        {
          id: '2-1',
          title: 'Decoração Floral',
          fornecedor: 'Flores & Encantos',
          total: 12000,
          installments: 2,
          paid: false,
          dueDate: '2026-04-20'
        },
        {
          id: '2-2',
          title: 'Iluminação Especial',
          fornecedor: 'Luz & Magia',
          total: 4500,
          installments: 1,
          paid: true,
          dueDate: '2026-03-05'
        },
        {
          id: '2-3',
          title: 'Mobiliário',
          fornecedor: 'Flores & Encantos',
          total: 2000,
          installments: 1,
          paid: false,
          dueDate: '2026-05-10'
        }
      ]
    },
    {
      id: '3',
      name: 'Fotografia',
      planned: 8000,
      spent: 8000,
      expenses: [
        {
          id: '3-1',
          title: 'Fotografia + Vídeo',
          fornecedor: 'Momentos Eternos',
          total: 8000,
          installments: 4,
          paid: false,
          dueDate: '2026-04-01'
        }
      ]
    },
    {
      id: '4',
      name: 'Música',
      planned: 6000,
      spent: 3000,
      expenses: [
        {
          id: '4-1',
          title: 'DJ + Equipamento',
          fornecedor: 'Som & Festa',
          total: 3000,
          installments: 2,
          paid: false,
          dueDate: '2026-05-01'
        }
      ]
    },
    {
      id: '5',
      name: 'Espaço',
      planned: 12000,
      spent: 12000,
      expenses: [
        {
          id: '5-1',
          title: 'Aluguel do Salão',
          fornecedor: 'Espaço Jardim Real',
          total: 12000,
          installments: 3,
          paid: true,
          dueDate: '2026-02-15'
        }
      ]
    },
    {
      id: '6',
      name: 'Vestido',
      planned: 8000,
      spent: 7500,
      expenses: [
        {
          id: '6-1',
          title: 'Vestido de Noiva',
          fornecedor: 'Atelier Sonho Real',
          total: 6000,
          installments: 3,
          paid: false,
          dueDate: '2026-03-30'
        },
        {
          id: '6-2',
          title: 'Terno do Noivo',
          fornecedor: 'Elegância Masculina',
          total: 1500,
          installments: 1,
          paid: true,
          dueDate: '2026-03-01'
        }
      ]
    }
  ],
  checklist: [
    {
      id: 'c1',
      title: 'Fechar contrato com buffet',
      category: 'Buffet',
      dueDate: '2026-03-15',
      completed: true
    },
    {
      id: 'c2',
      title: 'Escolher flores da decoração',
      category: 'Decoração',
      dueDate: '2026-03-20',
      completed: false
    },
    {
      id: 'c3',
      title: 'Reunião com fotógrafo',
      category: 'Fotografia',
      dueDate: '2026-03-25',
      completed: false
    },
    {
      id: 'c4',
      title: 'Definir playlist com DJ',
      category: 'Música',
      dueDate: '2026-04-10',
      completed: false
    },
    {
      id: 'c5',
      title: 'Prova do vestido',
      category: 'Vestido',
      dueDate: '2026-03-28',
      completed: false
    },
    {
      id: 'c6',
      title: 'Confirmar lista de convidados',
      category: 'Geral',
      dueDate: '2026-04-01',
      completed: false
    },
    {
      id: 'c7',
      title: 'Enviar convites',
      category: 'Geral',
      dueDate: '2026-04-15',
      completed: false
    },
    {
      id: 'c8',
      title: 'Reservar hotel para lua de mel',
      category: 'Geral',
      dueDate: '2026-05-01',
      completed: false
    }
  ]
};
