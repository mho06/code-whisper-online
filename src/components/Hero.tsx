
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MorseVisual } from '@/utils/morseCodeUtils';

const Hero = () => {
  const navigate = useNavigate();
  
  // Sample Morse code for visual demo
  const morseMessage = ".... . .-.. .-.. --- / .-- --- .-. .-.. -..";
  
  return (
    <div className="bg-gradient-to-b from-morse-navy to-morse-darkBlue text-white">
      <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Master the Language of <span className="text-morse-gold">Dots and Dashes</span>
          </h1>
          
          <div className="flex justify-center my-8">
            <MorseVisual code={morseMessage} />
          </div>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Learn, practice, and communicate using Morse code with our interactive platform.
            Master this timeless skill through guided lessons, fun quizzes, and real-time chat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-morse-gold text-morse-navy hover:bg-opacity-90 text-lg px-8 py-6"
              onClick={() => navigate('/learn')}
            >
              Start Learning
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-morse-navy text-lg px-8 py-6"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <FeatureCard 
            title="Interactive Lessons" 
            description="Step-by-step tutorials with audio and visual aids to help you master Morse code naturally."
            icon={<div className="text-4xl">📚</div>}
          />
          <FeatureCard 
            title="Test Your Skills" 
            description="Challenge yourself with quizzes at various difficulty levels to reinforce your learning."
            icon={<div className="text-4xl">🎯</div>}
          />
          <FeatureCard 
            title="Morse Chat" 
            description="Practice in real-time by chatting with friends using Morse code, with instant translation."
            icon={<div className="text-4xl">💬</div>}
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:transform hover:scale-105 transition duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-morse-gold">{title}</h3>
        <p className="text-gray-100">{description}</p>
      </div>
    </div>
  );
};

export default Hero;
