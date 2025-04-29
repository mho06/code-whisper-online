// Morse code dictionary
export const morseCode: Record<string, string> = {
  'a': '.-',
  'b': '-...',
  'c': '-.-.',
  'd': '-..',
  'e': '.',
  'f': '..-.',
  'g': '--.',
  'h': '....',
  'i': '..',
  'j': '.---',
  'k': '-.-',
  'l': '.-..',
  'm': '--',
  'n': '-.',
  'o': '---',
  'p': '.--.',
  'q': '--.-',
  'r': '.-.',
  's': '...',
  't': '-',
  'u': '..-',
  'v': '...-',
  'w': '.--',
  'x': '-..-',
  'y': '-.--',
  'z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..-.-',
  '"': '.-..-.',
  '$': '...-..-',
  '@': '.--.-.',
  ' ': '/'
};

// Create a reversed dictionary for decoding
export const reverseMorseCode: Record<string, string> = Object.entries(morseCode).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>
);

// Convert text to Morse code
export const textToMorse = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map(char => morseCode[char] || char)
    .join(' ');
};

// Convert Morse code to text
export const morseToText = (morse: string): string => {
  return morse
    .split(' ')
    .map(code => reverseMorseCode[code] || code)
    .join('');
};

// Play Morse code audio
export const playMorseAudio = (morseText: string): void => {
  const context = new (window.AudioContext || (window as any).webkitAudioContext)();
  const dotDuration = 60; // milliseconds
  const dashDuration = dotDuration * 3;
  const pauseBetweenSymbols = dotDuration;
  const pauseBetweenLetters = dotDuration * 3;
  const pauseBetweenWords = dotDuration * 7;

  let startTime = context.currentTime;

  morseText.split(' ').forEach((letter, letterIndex) => {
    if (letter === '/') {
      // This is a space between words
      startTime += pauseBetweenWords / 1000;
      return;
    }

    // For each symbol in the letter
    letter.split('').forEach((symbol, symbolIndex) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 700; // Hz
      gainNode.gain.value = 0.5; // volume
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.start(startTime);
      
      if (symbol === '.') {
        oscillator.stop(startTime + dotDuration / 1000);
        startTime += dotDuration / 1000;
      } else if (symbol === '-') {
        oscillator.stop(startTime + dashDuration / 1000);
        startTime += dashDuration / 1000;
      }
      
      // Add pause between symbols
      if (symbolIndex < letter.length - 1) {
        startTime += pauseBetweenSymbols / 1000;
      }
    });
    
    // Add pause between letters
    if (letterIndex < morseText.split(' ').length - 1) {
      startTime += pauseBetweenLetters / 1000;
    }
  });
};

// Learning modules content
export const learningModules = [
  {
    id: 1,
    title: "Letters A-F",
    characters: ["a", "b", "c", "d", "e", "f"],
    description: "Start with the basics and learn the first six letters of the alphabet in Morse code.",
    exercises: [
      { text: "a", morse: ".-" },
      { text: "be", morse: "-... ." },
      { text: "cafe", morse: "-.-. .- ..-. ." },
      { text: "face", morse: "..-. .- -.-. ." },
      { text: "ace", morse: ".- -.-. ." },
      { text: "deaf", morse: "-.. . .- ..-." },
    ]
  },
  {
    id: 2,
    title: "Letters G-M",
    characters: ["g", "h", "i", "j", "k", "l", "m"],
    description: "Continue your journey with the middle section of the alphabet.",
    exercises: [
      { text: "hi", morse: ".... .." },
      { text: "milk", morse: "-- .. .-.. -.-" },
      { text: "glim", morse: "--. .-.. .. --" },
      { text: "jim", morse: ".--- .. --" },
      { text: "hill", morse: ".... .. .-.. .-.." },
      { text: "kill", morse: "-.- .. .-.. .-.." },
    ]
  },
  {
    id: 3,
    title: "Letters N-T",
    characters: ["n", "o", "p", "q", "r", "s", "t"],
    description: "Master more letters to expand your Morse code vocabulary.",
    exercises: [
      { text: "stop", morse: "... - --- .--." },
      { text: "not", morse: "-. --- -" },
      { text: "spot", morse: "... .--. --- -" },
      { text: "port", morse: ".--. --- .-. -" },
      { text: "sort", morse: "... --- .-. -" },
      { text: "top", morse: "- --- .--." },
    ]
  },
  {
    id: 4,
    title: "Letters U-Z",
    characters: ["u", "v", "w", "x", "y", "z"],
    description: "Complete the alphabet and unlock your full communication potential.",
    exercises: [
      { text: "you", morse: "-.-- --- ..-" },
      { text: "wave", morse: ".-- .- ...- ." },
      { text: "xray", morse: "-..- .-. .- -.--" },
      { text: "zulu", morse: "--.. ..- .-.. ..-" },
      { text: "vow", morse: "...- --- .--" },
      { text: "wax", morse: ".-- .- -..-" },
    ]
  },
  {
    id: 5,
    title: "Numbers 0-9",
    characters: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    description: "Learn how to communicate numbers in Morse code.",
    exercises: [
      { text: "123", morse: ".---- ..--- ...--" },
      { text: "456", morse: "....- ..... -...." },
      { text: "789", morse: "--... ---.. ----." },
      { text: "2023", morse: "..--- ----- ..--- ...--" },
      { text: "1945", morse: ".---- ----. ....- ....." },
      { text: "007", morse: "----- ----- --..." },
    ]
  }
];

// Quiz questions
export const quizQuestions = [
  // Easy
  {
    difficulty: "easy",
    questions: [
      { morse: "... --- ...", answer: "sos", hint: "International distress signal" },
      { morse: ".... ..", answer: "hi", hint: "A greeting" },
      { morse: ".---- ..--- ...--", answer: "123", hint: "Counting" },
      { morse: "-- .- --", answer: "mam", hint: "Informal way to address a female parent" },
      { morse: ".-. ..- -.", answer: "run", hint: "To move at a speed faster than walking" }
    ]
  },
  // Medium
  {
    difficulty: "medium",
    questions: [
      { morse: "--. .-. . .- -", answer: "great", hint: "Synonym for excellent" },
      { morse: ".-- --- .-. .-.. -.. ", answer: "world", hint: "The planet we live on" },
      { morse: "-... .-. .- .. -.", answer: "brain", hint: "Organ in your head" },
      { morse: ".-.. .. --. .... -", answer: "light", hint: "Opposite of dark" },
      { morse: "..-. --- -.-. ..- ...", answer: "focus", hint: "Concentrate attention" }
    ]
  },
  // Hard
  {
    difficulty: "hard",
    questions: [
      { morse: "-.-. .... .- .-.. .-.. . -. --. .", answer: "challenge", hint: "A task that tests abilities" },
      { morse: ".-.. .. --. .... - .... --- ..- ... .", answer: "lighthouse", hint: "A tower with a light to guide ships" },
      { morse: "--.- ..- . ... - .. --- -.", answer: "question", hint: "Something you ask" },
      { morse: ".--. .-. --- --. .-. .- --", answer: "program", hint: "Computer instructions" },
      { morse: "-.-. --- -- .--. .-.. . -..- ", answer: "complex", hint: "Not simple" }
    ]
  }
];

// Export the MorseVisual component from the new file
export { default as MorseVisual } from '@/components/morse/MorseVisual';
