import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/sign-in');
  } else {
    return <div>Dashboard</div>;
  }
};

export default Dashboard;
