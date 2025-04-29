
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { CheckIcon, PlayIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { learningModules, textToMorse, playMorseAudio, MorseVisual } from '@/utils/morseCodeUtils';
import { useNavigate } from 'react-router-dom';

const LearningModule = () => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [userInput, setUserInput] = useState<string>('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const navigate = useNavigate();

  const activeModule = learningModules.find(m => m.id === activeModuleId);
  const currentExercise = activeModule?.exercises[currentExerciseIndex];

  const handleModuleChange = (id: string) => {
    setActiveModuleId(Number(id));
    setCurrentExerciseIndex(0);
    setUserInput('');
    setIsCorrect(null);
  };

  const handleCheck = () => {
    if (!currentExercise) return;

    const isAnswerCorrect = userInput.toLowerCase() === currentExercise.text;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      toast.success("Correct! Great job!");
      
      // Update progress
      const moduleProgress = { ...progress };
      moduleProgress[activeModuleId] = Math.min(100, Math.round(((currentExerciseIndex + 1) / (activeModule?.exercises.length || 1)) * 100));
      setProgress(moduleProgress);

      // Move to next exercise or complete module
      if (currentExerciseIndex + 1 < (activeModule?.exercises.length || 0)) {
        setTimeout(() => {
          setCurrentExerciseIndex(currentExerciseIndex + 1);
          setUserInput('');
          setIsCorrect(null);
        }, 1500);
      } else {
        toast('Module complete! 🎉');
      }
    } else {
      toast.error("Not quite right. Try again!");
    }
  };

  const handlePlaySound = () => {
    if (currentExercise) {
      playMorseAudio(currentExercise.morse);
    }
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex + 1 < (activeModule?.exercises.length || 0)) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserInput('');
      setIsCorrect(null);
    } else {
      toast('This is the last exercise in this module.');
    }
  };

  const handleResetModule = () => {
    setCurrentExerciseIndex(0);
    setUserInput('');
    setIsCorrect(null);
    
    // Reset progress for this module
    const moduleProgress = { ...progress };
    moduleProgress[activeModuleId] = 0;
    setProgress(moduleProgress);
    
    toast('Module reset. Starting from the beginning.');
  };

  if (!activeModule || !currentExercise) {
    return <div>Loading...</div>;
  }

  const moduleCompletionPercentage = progress[activeModuleId];
  const isModuleComplete = moduleCompletionPercentage === 100;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-morse-navy">Learn Morse Code</h1>
        <p className="text-gray-600 mt-2">
          Master the language of dots and dashes through interactive lessons and practice
        </p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
              <CardDescription>Select a module to begin learning</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={activeModuleId.toString()}
                orientation="vertical"
                onValueChange={handleModuleChange}
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  {learningModules.map((module) => (
                    <TabsTrigger
                      key={module.id}
                      value={module.id.toString()}
                      className="justify-between w-full"
                    >
                      <span>{module.title}</span>
                      <span className="ml-2 text-xs bg-morse-navy text-white px-2 py-1 rounded-full">
                        {progress[module.id]}%
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Module Characters</CardTitle>
              <CardDescription>Characters covered in this module</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {activeModule.characters.map((char) => (
                  <div
                    key={char}
                    className="flex flex-col items-center justify-center p-2 border rounded-lg"
                  >
                    <span className="text-lg font-bold mb-1">{char}</span>
                    <span className="text-xs text-gray-600">{textToMorse(char)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(progress).map(([moduleId, percentage]) => (
                  <div key={moduleId} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Module {moduleId}</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => navigate('/quiz')}
              >
                Test Your Skills &rarr;
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{activeModule.title}</CardTitle>
                  <CardDescription>{activeModule.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-morse-lightBlue text-morse-navy px-3 py-1 rounded-full">
                  <span>Exercise</span>
                  <span className="font-bold">{currentExerciseIndex + 1}/{activeModule.exercises.length}</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Decode the following Morse code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <MorseVisual code={currentExercise.morse} />
              </div>
              
              <div className="bg-morse-lightBlue p-4 rounded-lg text-center">
                <p className="font-mono text-xl tracking-wider">
                  {currentExercise.morse}
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
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className={`flex-1 ${
                      isCorrect === true
                        ? 'border-green-500'
                        : isCorrect === false
                        ? 'border-red-500'
                        : ''
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheck();
                    }}
                  />
                  <Button onClick={handleCheck}>Check</Button>
                </div>

                {isCorrect !== null && (
                  <div
                    className={`p-3 rounded-md ${
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
                          ? 'Correct! Well done.'
                          : `Incorrect. The right answer is: ${currentExercise.text}`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={handleSkipExercise}
                disabled={currentExerciseIndex + 1 >= activeModule.exercises.length}
              >
                Skip Exercise
              </Button>
              <Button variant="outline" onClick={handleResetModule}>
                Reset Module
              </Button>
              <Button
                onClick={handlePlaySound}
                className="bg-morse-gold text-morse-navy hover:bg-morse-gold/90"
              >
                Play Again
              </Button>
            </CardFooter>
          </Card>
          
          {isModuleComplete && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700">Module Completed!</CardTitle>
                <CardDescription>
                  Congratulations on completing this module. Would you like to move on to the next module or test your knowledge?
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-3">
                <Button
                  className="bg-morse-navy"
                  onClick={() => {
                    if (activeModuleId < learningModules.length) {
                      handleModuleChange((activeModuleId + 1).toString());
                    } else {
                      toast('This is the last module!');
                    }
                  }}
                  disabled={activeModuleId >= learningModules.length}
                >
                  Next Module
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/quiz')}
                >
                  Take a Quiz
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
