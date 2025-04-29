import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayIcon, HelpCircle, CheckIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { quizQuestions, playMorseAudio } from '@/utils/morseCodeUtils';
import { MorseVisual } from '@/utils/morseCodeUtils';

const QuizGame = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [showHint, setShowHint] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const navigate = useNavigate();

  const questions = quizQuestions.find(q => q.difficulty === difficulty)?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  // Reset state when difficulty changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setTimeLeft(30);
    setShowHint(false);
    setQuizCompleted(false);
    setHintsUsed(0);
    
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }, [difficulty]);

  // Start timer when first mounting or changing questions
  useEffect(() => {
    if (!quizCompleted && !isAnswerChecked) {
      const newTimer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(newTimer);
            setIsAnswerChecked(true);
            setIsCorrect(false);
            toast.error("Time's up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimer(newTimer);
      return () => clearInterval(newTimer);
    }
  }, [currentQuestionIndex, quizCompleted, isAnswerChecked]);

  const handleCheckAnswer = () => {
    if (isAnswerChecked) return;
    
    // Clear timer
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    
    const correct = userAnswer.toLowerCase() === currentQuestion.answer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    
    if (correct) {
      // Calculate score based on time left and if hint was used
      const timeBonus = Math.floor(timeLeft / 5); // 0-6 bonus points for fast answers
      const hintPenalty = showHint ? 2 : 0; // -2 points if hint was used
      const pointsEarned = 5 + timeBonus - hintPenalty;
      
      setScore(prevScore => prevScore + pointsEarned);
      toast.success(`Correct! +${pointsEarned} points`);
    } else {
      toast.error("Incorrect answer.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setTimeLeft(30);
      setShowHint(false);
    } else {
      setQuizCompleted(true);
      toast.success("Quiz completed!");
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
    toast.info("Hint revealed! (-2 points)");
  };

  const handlePlaySound = () => {
    playMorseAudio(currentQuestion.morse);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setTimeLeft(30);
    setShowHint(false);
    setQuizCompleted(false);
    setHintsUsed(0);
  };

  // Calculate score percentage
  const maxPossibleScore = totalQuestions * 11; // 5 base + 6 max time bonus per question
  const scorePercentage = Math.round((score / maxPossibleScore) * 100);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-morse-navy">Morse Code Quiz</h1>
        <p className="text-gray-600 mt-2">
          Test your knowledge of Morse code with our interactive quiz
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Difficulty</CardTitle>
            <CardDescription>Choose a difficulty level for your quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="easy"
              value={difficulty}
              onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
            >
              <TabsList className="grid grid-cols-3 mb-2">
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="hard">Hard</TabsTrigger>
              </TabsList>
              <TabsContent value="easy">
                <p className="text-sm text-gray-600">Simple words and characters, perfect for beginners.</p>
              </TabsContent>
              <TabsContent value="medium">
                <p className="text-sm text-gray-600">More complex words and faster recognition required.</p>
              </TabsContent>
              <TabsContent value="hard">
                <p className="text-sm text-gray-600">Complex words and phrases for Morse code experts.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {!quizCompleted ? (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Question {currentQuestionIndex + 1} of {totalQuestions}</CardTitle>
                  <CardDescription>Decode the Morse code</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Score: {score}</div>
                  <div 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      timeLeft > 10 ? 'bg-green-100 text-green-800' : 
                      timeLeft > 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    Time: {timeLeft}s
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <MorseVisual code={currentQuestion.morse} />
              </div>
              
              <div className="bg-morse-lightBlue p-4 rounded-lg text-center">
                <p className="font-mono text-xl tracking-wider">
                  {currentQuestion.morse}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-2 text-morse-navy"
                  onClick={handlePlaySound}
                >
                  <PlayIcon className="h-6 w-6" />
                  <span className="sr-only">Play sound</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className={`flex-1 ${
                      isAnswerChecked ? (isCorrect ? 'border-green-500' : 'border-red-500') : ''
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isAnswerChecked) handleCheckAnswer();
                    }}
                    disabled={isAnswerChecked}
                  />
                  <Button 
                    onClick={handleCheckAnswer} 
                    disabled={isAnswerChecked || userAnswer.trim() === ''}
                  >
                    Check
                  </Button>
                </div>
                
                {isAnswerChecked && (
                  <div
                    className={`p-4 rounded-md ${
                      isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <XIcon className="h-5 w-5" />
                      )}
                      <span>
                        {isCorrect
                          ? 'Correct!'
                          : `Incorrect. The right answer is: ${currentQuestion.answer}`}
                      </span>
                    </div>
                  </div>
                )}
                
                {showHint && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <span className="font-bold">Hint:</span> {currentQuestion.hint}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={handleShowHint}
                disabled={showHint || isAnswerChecked}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Use Hint
              </Button>
              <Button
                onClick={handlePlaySound}
                className="bg-morse-gold text-morse-navy hover:bg-morse-gold/90"
              >
                Play Again
              </Button>
              {isAnswerChecked && (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex + 1 < totalQuestions ? 'Next Question' : 'Finish Quiz'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-morse-cream border-2 border-morse-gold">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>Here's how you did:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center p-6">
                <div className="text-6xl font-bold text-morse-navy mb-4">{score}</div>
                <div className="text-xl text-gray-600">points</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Correct Answers</span>
                  <span className="font-bold">{score > 0 ? Math.ceil(score / 5) : 0} of {totalQuestions}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Hints Used</span>
                  <span className="font-bold">{hintsUsed}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span className={`font-bold ${
                    scorePercentage >= 80 ? 'text-green-600' : 
                    scorePercentage >= 60 ? 'text-amber-600' : 
                    'text-red-600'
                  }`}>
                    {scorePercentage}%
                  </span>
                </div>
                
                <div className="mt-6 p-4 rounded-md bg-white border border-gray-200">
                  <p className="text-center">
                    {scorePercentage >= 80 
                      ? "Excellent! You're a Morse code master! 🏆"
                      : scorePercentage >= 60
                      ? "Good job! You're getting the hang of Morse code. 👏"
                      : "Practice makes perfect! Keep learning Morse code. 📚"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Button 
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate('/learn')}
              >
                Back to Learning
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  setDifficulty(
                    difficulty === 'easy' ? 'medium' : 
                    difficulty === 'medium' ? 'hard' : 'easy'
                  );
                }}
              >
                Try {difficulty === 'easy' ? 'Medium' : difficulty === 'medium' ? 'Hard' : 'Easy'} Difficulty
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
