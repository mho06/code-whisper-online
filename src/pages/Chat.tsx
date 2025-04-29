
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-morse-cream">
      <Navbar />
      <ChatInterface />
    </div>
  );
};

export default Chat;
