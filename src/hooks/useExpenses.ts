import { useState, useEffect } from 'react';

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  timestamp: number;
}

export const CATEGORIES = [
  'Makanan & Minuman',
  'Transportasi',
  'Belanja',
  'Hiburan',
  'Kesehatan',
  'Pendidikan',
  'Tagihan',
  'Lainnya'
];

const STORAGE_KEY = 'expense-tracker-data';

// 🔠 Fungsi untuk kapitalisasi kata pertama
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
  };

  const addExpense = (name: string, category: string, amount: number) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      name: capitalizeFirstLetter(name.trim()), // 🔥 Modifikasi nama di sini
      category,
      amount,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now()
    };

    const updatedExpenses = [newExpense, ...expenses];
    saveExpenses(updatedExpenses);
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(updatedExpenses);
  };

  const getTodayTotal = () => {
    const today = new Date().toISOString().split('T')[0];
    return expenses
      .filter(expense => expense.date === today)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByDate = () => {
    const grouped = expenses.reduce((acc, expense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    }, {} as Record<string, Expense[]>);

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([date, expenses]) => ({
        date,
        expenses,
        total: expenses.reduce((sum, expense) => sum + expense.amount, 0)
      }));
  };

  const exportToCSV = () => {
    const headers = ['Tanggal', 'Nama', 'Kategori', 'Jumlah'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        `"${expense.name}"`,
        `"${expense.category}"`,
        expense.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expense-tracker-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    expenses,
    addExpense,
    deleteExpense,
    getTodayTotal,
    getExpensesByDate,
    exportToCSV
  };
};
