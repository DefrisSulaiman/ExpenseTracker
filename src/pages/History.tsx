import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Trash2, Calendar } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const History = () => {
  const { getExpensesByDate, deleteExpense, exportToCSV } = useExpenses();
  const { toast } = useToast();
  const groupedExpenses = getExpensesByDate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    toast({
      title: "Berhasil!",
      description: "Pengeluaran berhasil dihapus",
    });
  };

  const handleExport = () => {
    exportToCSV();
    toast({
      title: "Berhasil!",
      description: "Data berhasil diexport ke CSV",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">History Pengeluaran</h1>
          <Button 
            onClick={handleExport}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {groupedExpenses.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Belum ada pengeluaran yang tercatat</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {groupedExpenses.map(({ date, expenses, total }) => (
              <Card key={date} className="shadow-card border-0">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-foreground">
                      {formatDate(date)}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {formatCurrency(total)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/50 to-accent/20 rounded-lg border border-accent"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{expense.name}</h3>
                        <p className="text-sm text-muted-foreground">{expense.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">
                          {formatCurrency(expense.amount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(expense.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default History;