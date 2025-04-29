
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlayIcon, X, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';
import { textToMorse, morseToText, playMorseAudio, MorseVisual } from '@/utils/morseCodeUtils';

// Mock user data (in a real app this would come from authentication)
const currentUser = {
  id: 'user1',
  name: 'You',
  avatar: 'https://i.pravatar.cc/150?u=user1'
};

// Mock contacts
const contacts = [
  {
    id: 'contact1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    status: 'online',
    lastSeen: 'now'
  },
  {
    id: 'contact2',
    name: 'Sarah Smith',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    status: 'online',
    lastSeen: 'now'
  },
  {
    id: 'contact3',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    status: 'offline',
    lastSeen: '2 hours ago'
  }
];

// Mock message generator for demo
const generateMockResponse = (to: string, message: string): Promise<string> => {
  // Simple responses based on the incoming message
  const responses: Record<string, string> = {
    'hi': 'Hello there! How are you?',
    'hello': 'Hi! Nice to chat with you in Morse code!',
    'how are you': "I'm doing great! Learning Morse code is fun.",
    'sos': 'Do you need help with something?',
    'help': 'What do you need help with?'
  };
  
  // Get the key closest to the message
  const key = Object.keys(responses).find(k => message.toLowerCase().includes(k));
  const response = key ? responses[key] : "Thanks for your message! I'm practicing my Morse code.";
  
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
};

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  morse: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [inputMode, setInputMode] = useState<'text' | 'morse'>('text');
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    contact1: [],
    contact2: [],
    contact3: []
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations[activeContact.id]]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    let textContent: string;
    let morseContent: string;
    
    // Determine the content type based on the input mode
    if (inputMode === 'text') {
      textContent = message;
      morseContent = textToMorse(message);
    } else {
      // When input is morse, try to convert it to text
      morseContent = message;
      textContent = morseToText(message);
    }
    
    // Create new message object
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: activeContact.id,
      text: textContent,
      morse: morseContent,
      timestamp: new Date()
    };
    
    // Update conversations state
    setConversations(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));
    
    // Clear input
    setMessage('');
    
    // Simulating the other person typing
    setIsTyping(true);
    
    // Generate mock response
    try {
      const responseText = await generateMockResponse(activeContact.id, textContent);
      
      // Add response to conversation
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeContact.id,
        receiverId: currentUser.id,
        text: responseText,
        morse: textToMorse(responseText),
        timestamp: new Date()
      };
      
      setIsTyping(false);
      
      setConversations(prev => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), responseMessage]
      }));
      
      // Play notification sound - simplified version
      new Audio('/assets/notification.mp3').play().catch(err => console.log('Audio play failed:', err));
    } catch (error) {
      console.error('Error generating response:', error);
      setIsTyping(false);
      toast.error('Failed to get a response');
    }
  };

  const handlePlayMorse = (morse: string) => {
    playMorseAudio(morse);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-morse-navy">Morse Code Chat</h1>
        <p className="text-gray-600 mt-2">
          Practice your Morse code skills by chatting with others
        </p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6 lg:gap-8 max-w-6xl mx-auto">
        {/* Contacts sidebar */}
        <div className="md:border-r md:pr-6">
          <div className="mb-6">
            <h2 className="font-semibold text-morse-navy text-lg mb-2">Contacts</h2>
            <div className="relative">
              <Input
                placeholder="Search contacts..."
                className="w-full pr-10"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            {contacts.map(contact => (
              <div
                key={contact.id}
                className={`p-3 rounded-lg flex items-center cursor-pointer transition-colors ${
                  activeContact.id === contact.id
                    ? 'bg-morse-lightBlue'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveContact(contact)}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <img src={contact.avatar} alt={contact.name} />
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></span>
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">
                    {contact.status === 'online' ? 'Online' : `Last seen ${contact.lastSeen}`}
                  </p>
                </div>
                {conversations[contact.id]?.length > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-morse-navy text-white">
                    {conversations[contact.id].filter(m => m.senderId === contact.id).length}
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:block mt-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Tips</CardTitle>
                <CardDescription>
                  Improve your Morse code chat skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Use keyboard shortcuts</p>
                  <p className="text-gray-500">
                    Press Tab+Space to quickly play the Morse code
                  </p>
                </div>
                <div>
                  <p className="font-medium">Common phrases</p>
                  <p className="text-gray-500">
                    "CQ" (seeking you) is used to start a conversation
                  </p>
                </div>
                <div>
                  <p className="font-medium">Abbreviations</p>
                  <p className="text-gray-500">
                    "GM" (Good morning), "73" (Best regards)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col h-[70vh]">
          {/* Chat header */}
          <div className="bg-morse-lightBlue p-4 rounded-t-lg flex items-center">
            <Avatar className="h-10 w-10">
              <img src={activeContact.avatar} alt={activeContact.name} />
            </Avatar>
            <div className="ml-3 flex-1">
              <p className="font-medium">{activeContact.name}</p>
              <p className="text-xs text-gray-500">
                {activeContact.status === 'online' ? 'Online' : `Last seen ${activeContact.lastSeen}`}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-white border-x">
            {conversations[activeContact.id]?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mb-2" />
                <p>No messages yet</p>
                <p className="text-sm">Send a message to start the conversation</p>
              </div>
            ) : (
              <>
                {conversations[activeContact.id]?.map((msg) => {
                  const isCurrentUser = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex max-w-[80%]">
                        {!isCurrentUser && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <img src={activeContact.avatar} alt={activeContact.name} />
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`px-4 py-3 rounded-lg ${
                              isCurrentUser
                                ? 'bg-morse-navy text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div className="mt-1 font-mono text-xs tracking-wider">
                              {msg.morse}
                            </div>
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="text-xs text-gray-500">
                              {formatTime(msg.timestamp)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handlePlayMorse(msg.morse)}
                            >
                              <PlayIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        {isCurrentUser && (
                          <Avatar className="h-8 w-8 ml-2 mt-1">
                            <User className="h-5 w-5" />
                          </Avatar>
                        )}
                      </div>
                    </div>
                  );
                })}
                {isTyping && (
                  <div className="flex items-center mb-4">
                    <Avatar className="h-8 w-8 mr-2">
                      <img src={activeContact.avatar} alt={activeContact.name} />
                    </Avatar>
                    <div className="bg-gray-100 px-4 py-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input area */}
          <div className="p-4 border rounded-b-lg bg-white">
            <Tabs defaultValue="text" onValueChange={(v) => setInputMode(v as 'text' | 'morse')}>
              <div className="flex justify-between items-center mb-3">
                <TabsList>
                  <TabsTrigger value="text">Text Input</TabsTrigger>
                  <TabsTrigger value="morse">Morse Input</TabsTrigger>
                </TabsList>
                {message && inputMode === 'text' && (
                  <div className="px-3 py-1 bg-gray-100 rounded-md text-xs font-mono">
                    {textToMorse(message)}
                  </div>
                )}
                {message && inputMode === 'morse' && (
                  <div className="px-3 py-1 bg-gray-100 rounded-md text-xs">
                    {morseToText(message)}
                  </div>
                )}
              </div>
              
              <TabsContent value="text" className="mt-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    Send
                  </Button>
                </div>
                {message && (
                  <div className="mt-2 flex justify-center">
                    <MorseVisual code={textToMorse(message)} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => handlePlayMorse(textToMorse(message))}
                    >
                      <PlayIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="morse" className="mt-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type morse code (use . for dot, - for dash, space to separate letters, / for words)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-1 font-mono"
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    Send
                  </Button>
                </div>
                {message && (
                  <div className="mt-2 flex justify-center">
                    <MorseVisual code={message} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => handlePlayMorse(message)}
                    >
                      <PlayIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-2">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(prev => prev + '.')}
                  className="h-8 w-8 p-0"
                >
                  <span className="morse-dot"></span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(prev => prev + '-')}
                  className="h-8 w-8 p-0"
                >
                  <span className="morse-dash"></span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(prev => prev + ' ')}
                  className="h-8 px-3"
                >
                  Letter Space
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(prev => prev + ' / ')}
                  className="h-8 px-3"
                >
                  Word Space
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
