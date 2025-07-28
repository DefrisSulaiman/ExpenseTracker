import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES } from '@/hooks/useExpenses';

interface ExpenseFormProps {
  onSubmit: (name: string, category: string, amount: number) => void;
}

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !category || !amount) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive"
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Error",
        description: "Jumlah harus berupa angka positif",
        variant: "destructive"
      });
      return;
    }

    onSubmit(name.trim(), category, numAmount);
    setName('');
    setCategory('');
    setAmount('');
    
    toast({
      title: "Berhasil!",
      description: "Pengeluaran berhasil ditambahkan",
    });
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-to-br from-card to-accent/20">
      <CardHeader>
        <CardTitle className="text-center text-foreground">Tambah Pengeluaran</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Pengeluaran</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Makan siang"
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah (Rp)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="bg-background"
              min="0"
              step="0.01"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 shadow-elegant"
          >
            Tambah Pengeluaran
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;