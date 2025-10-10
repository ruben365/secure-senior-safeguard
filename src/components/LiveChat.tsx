import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, User, X } from "lucide-react";
import { toast } from "sonner";

interface LiveChatProps {
  trigger?: React.ReactNode;
  variant?: "button" | "card";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const LiveChat = ({ trigger, variant = "button", open, onOpenChange }: LiveChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; text: string; sender: 'user' | 'agent'; timestamp: Date }>>([
    { id: 1, text: "Hi! I'm here to help. What can I assist you with today?", sender: 'agent', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const handleOpen = (state: boolean) => {
    if (onOpenChange) {
      onOpenChange(state);
    } else {
      setIsOpen(state);
    }
  };

  const isDialogOpen = open !== undefined ? open : isOpen;

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      toast.error("Please enter your name and email");
      return;
    }
    setHasStarted(true);
    toast.success("Chat started! We'll respond shortly.");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        text: "Thank you for your message. A team member will respond shortly. Average response time is under 5 minutes during business hours (Mon-Fri 9am-6pm ET).",
        sender: 'agent' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1500);
  };

  const TriggerButton = trigger || (
    <Button 
      variant={variant === "button" ? "default" : "outline"}
      onClick={() => handleOpen(true)}
      className={variant === "card" ? "w-full" : ""}
    >
      <MessageSquare className="w-4 h-4 mr-2" />
      {variant === "button" ? "OPEN CHAT" : "Start Live Chat"}
    </Button>
  );

  return (
    <>
      <div onClick={() => !isDialogOpen && handleOpen(true)}>
        {TriggerButton}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleOpen}>
        <DialogContent className="max-w-md max-h-[600px] p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary to-accent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-white">Live Chat Support</DialogTitle>
                  <p className="text-white/80 text-xs">We typically respond within 5 minutes</p>
                </div>
              </div>
            </div>
          </DialogHeader>

          {!hasStarted ? (
            <div className="p-6">
              <form onSubmit={handleStartChat} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Name</label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Start Chat
                </Button>
              </form>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[350px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'agent' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LiveChat;
