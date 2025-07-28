import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, History } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="bg-white border-t border-border fixed bottom-0 left-0 right-0 z-50">
      <div className="flex">
        <Link
          to="/"
          className={`flex-1 flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors ${
            location.pathname === '/'
              ? 'text-primary bg-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <PlusCircle className="h-5 w-5 mb-1" />
          Tambah
        </Link>
        <Link
          to="/history"
          className={`flex-1 flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors ${
            location.pathname === '/history'
              ? 'text-primary bg-accent'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <History className="h-5 w-5 mb-1" />
          History
        </Link>
      </div>
    </div>
  );
};

export default Navigation;