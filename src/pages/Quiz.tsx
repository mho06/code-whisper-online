
import Navbar from '@/components/Navbar';
import QuizGame from '@/components/quiz/QuizGame';

const Quiz = () => {
  return (
    <div className="min-h-screen flex flex-col bg-morse-cream">
      <Navbar />
      <QuizGame />
    </div>
  );
};

export default Quiz;
