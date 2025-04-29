
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen, HelpCircle, User } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { 
      name: 'Learn', 
      path: '/learn', 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: 'Quiz', 
      path: '/quiz', 
      icon: <HelpCircle className="h-5 w-5" /> 
    },
    { 
      name: 'Chat', 
      path: '/chat', 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
  ];

  return (
    <nav className="bg-morse-navy py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="morse-dot"></span>
            <span className="morse-dash"></span>
            <span className="morse-dot"></span>
          </div>
          <span className="text-morse-gold text-xl font-bold">MorseConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="flex items-center text-white hover:text-morse-gold transition-colors duration-200 gap-1"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          
          <div className="ml-4 flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" className="text-white border-white hover:bg-morse-gold hover:text-morse-navy">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-morse-gold text-morse-navy hover:bg-opacity-90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-morse-navy border-t border-morse-gold mt-4 py-4">
          <div className="container mx-auto space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className="flex items-center text-white hover:text-morse-gold px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700 mt-4 flex flex-col space-y-2 px-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full text-white border-white hover:bg-morse-gold hover:text-morse-navy">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-morse-gold text-morse-navy hover:bg-opacity-90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
