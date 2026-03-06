export interface Expense {
  id: string;
  title: string;
  fornecedor: string;
  total: number;
  installments: number;
  paid: boolean;
  dueDate: string;
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

export interface UpcomingPayment {
  fornecedor: string;
  valor: number;
  date: string;
  paid: boolean;
}

export interface MockData {
  budgetTotal: number;
  categories: Category[];
  checklist: ChecklistItem[];
  upcomingPayments: UpcomingPayment[];
}

export const mockData: MockData = {
  budgetTotal: 120000,
  categories: [
    {
      id: "1",
      name: "Buffet",
      planned: 35000,
      spent: 32000,
      expenses: [
        { id: "1a", title: "Jantar completo", fornecedor: "Buffet Elegance", total: 25000, installments: 5, paid: true, dueDate: "2026-04-15" },
        { id: "1b", title: "Coquetel de entrada", fornecedor: "Buffet Elegance", total: 7000, installments: 1, paid: false, dueDate: "2026-05-10" },
      ],
    },
    {
      id: "2",
      name: "Decoração",
      planned: 20000,
      spent: 22500,
      expenses: [
        { id: "2a", title: "Flores e arranjos", fornecedor: "Flores & Cia", total: 12500, installments: 3, paid: true, dueDate: "2026-03-20" },
        { id: "2b", title: "Iluminação cênica", fornecedor: "LuzArte", total: 10000, installments: 2, paid: false, dueDate: "2026-04-01" },
      ],
    },
    {
      id: "3",
      name: "Fotografia",
      planned: 15000,
      spent: 14000,
      expenses: [
        { id: "3a", title: "Ensaio pré-wedding", fornecedor: "Studio Moments", total: 4000, installments: 1, paid: true, dueDate: "2026-02-15" },
        { id: "3b", title: "Cobertura completa", fornecedor: "Studio Moments", total: 10000, installments: 4, paid: false, dueDate: "2026-06-01" },
      ],
    },
    {
      id: "4",
      name: "Música",
      planned: 10000,
      spent: 8000,
      expenses: [
        { id: "4a", title: "DJ para festa", fornecedor: "DJ Premium", total: 5000, installments: 2, paid: true, dueDate: "2026-05-20" },
        { id: "4b", title: "Quarteto de cordas", fornecedor: "Harmonia Musical", total: 3000, installments: 1, paid: false, dueDate: "2026-06-10" },
      ],
    },
    {
      id: "5",
      name: "Espaço",
      planned: 25000,
      spent: 25000,
      expenses: [
        { id: "5a", title: "Aluguel do espaço", fornecedor: "Villa Rosé", total: 25000, installments: 6, paid: true, dueDate: "2026-01-10" },
      ],
    },
    {
      id: "6",
      name: "Vestido",
      planned: 15000,
      spent: 12000,
      expenses: [
        { id: "6a", title: "Vestido de noiva", fornecedor: "Atelier Blanc", total: 12000, installments: 3, paid: false, dueDate: "2026-04-30" },
      ],
    },
  ],
  checklist: [
    { id: "c1", title: "Escolher convites", category: "Papelaria", dueDate: "2026-03-15", completed: true },
    { id: "c2", title: "Confirmar lista de convidados", category: "Organização", dueDate: "2026-03-20", completed: true },
    { id: "c3", title: "Degustação do buffet", category: "Buffet", dueDate: "2026-04-01", completed: false },
    { id: "c4", title: "Prova do vestido", category: "Vestido", dueDate: "2026-04-10", completed: false },
    { id: "c5", title: "Ensaio fotográfico", category: "Fotografia", dueDate: "2026-04-20", completed: false },
    { id: "c6", title: "Contratar florista", category: "Decoração", dueDate: "2026-03-25", completed: true },
    { id: "c7", title: "Reservar lua de mel", category: "Viagem", dueDate: "2026-05-01", completed: false },
    { id: "c8", title: "Escolher alianças", category: "Acessórios", dueDate: "2026-04-15", completed: false },
    { id: "c9", title: "Confirmar DJ", category: "Música", dueDate: "2026-05-10", completed: false },
    { id: "c10", title: "Ensaio da cerimônia", category: "Organização", dueDate: "2026-06-01", completed: false },
  ],
  upcomingPayments: [
    { fornecedor: "Buffet Elegance", valor: 7000, date: "2026-05-10", paid: false },
    { fornecedor: "LuzArte", valor: 5000, date: "2026-04-01", paid: false },
    { fornecedor: "Studio Moments", valor: 2500, date: "2026-06-01", paid: false },
    { fornecedor: "Harmonia Musical", valor: 3000, date: "2026-06-10", paid: false },
    { fornecedor: "Atelier Blanc", valor: 4000, date: "2026-04-30", paid: false },
  ],
};
