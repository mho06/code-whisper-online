
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-morse-cream">
      <Navbar />
      <AuthForm mode="login" />
    </div>
  );
};

export default Login;
