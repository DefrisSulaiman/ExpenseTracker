import { Card, CardContent } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

interface TodayTotalProps {
  total: number;
}

const TodayTotal = ({ total }: TodayTotalProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-r from-primary to-success text-primary-foreground shadow-elegant border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/90 font-medium">Total Hari Ini</p>
            <p className="text-2xl font-bold">{formatCurrency(total)}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <Wallet className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayTotal;