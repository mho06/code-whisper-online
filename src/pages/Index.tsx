
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-morse-cream">
      <Navbar />
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-morse-navy mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes learning and using Morse code intuitive and engaging. Follow these steps to begin your journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-morse-lightBlue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-morse-navy">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn the Basics</h3>
              <p className="text-gray-600">
                Start with our interactive lessons that teach you Morse code characters through visual and audio guidance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-morse-lightBlue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-morse-navy">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice with Quizzes</h3>
              <p className="text-gray-600">
                Test your knowledge with our adaptive quizzes that adjust to your skill level as you improve.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-morse-lightBlue h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-morse-navy">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat in Morse Code</h3>
              <p className="text-gray-600">
                Apply your skills in real-time conversations with other users, with instant translation between text and Morse.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-morse-navy text-white hover:bg-opacity-90"
              onClick={() => navigate('/learn')}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-morse-navy text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Learn Morse Code?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-morse-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-morse-navy" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-morse-gold">Universal Communication</span>
                    <p className="mt-1 text-gray-300">
                      Morse code transcends language barriers and can be transmitted in multiple ways.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-morse-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-morse-navy" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-morse-gold">Cognitive Benefits</span>
                    <p className="mt-1 text-gray-300">
                      Learning Morse code improves memory, concentration, and auditory processing skills.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-morse-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-morse-navy" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-morse-gold">Emergency Situations</span>
                    <p className="mt-1 text-gray-300">
                      Morse code can be used in emergencies when other communication methods fail.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-morse-gold rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-morse-navy" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-morse-gold">Historical Significance</span>
                    <p className="mt-1 text-gray-300">
                      Connect with a communication method that has shaped history for over 175 years.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg text-morse-navy">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">Morse Code Translator</h3>
                  <p className="text-sm text-gray-600">Try it out right here</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Text to Morse</label>
                    <input
                      type="text"
                      placeholder="Type here..."
                      className="w-full p-2 border rounded"
                      onChange={(e) => {
                        const morseOutput = document.getElementById('morse-output');
                        if (morseOutput) {
                          morseOutput.textContent = textToMorse(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Morse Code</label>
                    <div
                      id="morse-output"
                      className="w-full p-2 border rounded bg-gray-50 min-h-[60px] font-mono"
                    ></div>
                  </div>
                  <div className="text-center">
                    <Button 
                      className="bg-morse-navy text-white hover:bg-opacity-90"
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up for Full Access
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-morse-navy text-white py-8 border-t border-morse-gold">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="morse-dot"></span>
                  <span className="morse-dash"></span>
                  <span className="morse-dot"></span>
                </div>
                <span className="text-morse-gold text-xl font-bold ml-2">MorseConnect</span>
              </div>
              <p className="text-gray-400 mt-2">Master the language of dots and dashes</p>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Guides</a></li>
                  <li><a href="#" className="hover:text-white">History</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} MorseConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
