
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/auth/AuthForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-morse-cream">
      <Navbar />
      <AuthForm mode="signup" />
    </div>
  );
};

export default Signup;
