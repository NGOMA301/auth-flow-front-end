
import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default Index;
