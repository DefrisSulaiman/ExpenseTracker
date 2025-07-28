import ExpenseForm from '@/components/ExpenseForm';
import TodayTotal from '@/components/TodayTotal';
import Navigation from '@/components/Navigation';
import { useExpenses } from '@/hooks/useExpenses';
import { Wallet } from 'lucide-react';

const Index = () => {
  const { addExpense, getTodayTotal } = useExpenses();
  const todayTotal = getTodayTotal();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-primary to-success p-3 rounded-full">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          <p className="text-muted-foreground">Kelola pengeluaran harian Anda dengan mudah</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          <TodayTotal total={todayTotal} />
          <ExpenseForm onSubmit={addExpense} />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
