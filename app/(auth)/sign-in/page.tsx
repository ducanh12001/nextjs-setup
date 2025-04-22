import { checkIsAuthenticated } from '@/lib/auth/checkIsAuthenticated';
import { redirect } from 'next/navigation';

const SignIn = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    return <div>SignIn</div>;
  }
};

export default SignIn;
