// Laura AI Assistant Component
import { useEffect, useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BookOpen,
  FileQuestion,
  Mail,
  MessageCircle,
  Mic,
  MicOff,
  Phone,
  Send,
  Shield,
  X,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLauraChat } from "@/hooks/useLauraChat";
import lauraAvatar from "@/assets/laura-avatar-new.png";
import { SITE } from "@/config/site";

const quickActions = [
  "How do I scan a file?",
  "What's the cost?",
  "Is it private?",
  "Report a scam",
];

type QuickHelpAction = {
  icon: typeof Shield;
  label: string;
  description: string;
  href?: string;
  action?: () => void;
  color: string;
  urgent?: boolean;
  closeOnAction?: boolean;
};

export const LauraAIAssistant = forwardRef<HTMLDivElement>(function LauraAIAssistant(_props, _ref) {
  const { messages, isLoading, sendMessage } = useLauraChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<"chat" | "help">("chat");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickHelpActions: QuickHelpAction[] = [
    {
      icon: AlertTriangle,
      label: "Report a Scam",
      description: "Encountered something suspicious?",
      href: "/library",
      color: "from-rose-500 to-orange-500",
      urgent: true,
    },
    {
      icon: Phone,
      label: "Call Us",
      description: "Speak with a security expert",
      action: () => window.open(SITE.phone.tel, "_self"),
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: MessageCircle,
      label: "Chat with Laura",
      description: "Ask about pricing & scans",
      action: () => setMode("chat"),
      color: "from-primary to-accent",
      closeOnAction: false,
    },
    {
      icon: FileQuestion,
      label: "FAQ",
      description: "Quick answers",
      href: "/faq",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      label: "Workshops",
      description: "Learn to stay protected",
      href: "/training",
      color: "from-orange-500 to-[#d96c4a]",
    },
    {
      icon: Mail,
      label: "Email Support",
      description: "We respond within 24 hours",
      action: () => window.open(`mailto:${SITE.emails.hello}`, "_self"),
      color: "from-amber-500 to-yellow-500",
    },
  ];

  useEffect(() => {
    if (!scrollRef.current) return;
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, [messages, isLoading]);

  useEffect(() => {
    const w = window as Window;
    if (!(w.webkitSpeechRecognition || w.SpeechRecognition)) return;
    const SpeechRecognitionCtor = w.webkitSpeechRecognition || w.SpeechRecognition;
    recognitionRef.current = new SpeechRecognitionCtor!();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      if (transcript.trim()) {
        // Put transcript in input for review — don't auto-send
        setInput(transcript.trim());
      }
    };

    recognitionRef.current.onerror = () => {
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };
  }, [sendMessage]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    const message = input.trim();
    setInput("");
    await sendMessage(message);
  };

  /* ─── Closed FAB ─── */
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-fab">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_2px_12px_hsl(var(--primary)/0.35),0_8px_24px_-6px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.45)] active:scale-95 overflow-hidden ring-2 ring-white/20"
          aria-label="Open Laura AI Assistant"
          style={{ contain: "layout" }}
        >
          <img
            src={lauraAvatar}
            alt="Laura"
            width={48}
            height={48}
            loading="eager"
            className="w-full h-full object-cover object-top"
          />
          <span className="absolute bottom-0.5 right-0.5 flex h-2.5 w-2.5">
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border-2 border-white/50" />
          </span>
        </button>
      </div>
    );
  }

  /* ─── Open Panel ─── */
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-fab w-[min(calc(100vw-1.5rem),340px)] sm:w-[360px]">
      <div className="rounded-2xl border border-white/15 bg-black/30 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.35),0_12px_40px_-8px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img
                src={lauraAvatar}
                alt="Laura"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width={40}
                height={40}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white/30" />
            </div>
            <div>
              <p className="text-sm font-bold text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>Laura</p>
              <p className="text-[11px] text-white/70 font-medium" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                {isLoading ? "Thinking..." : "Navigation & help"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMode("chat")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                mode === "chat"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-black/25 text-white/80 hover:bg-black/35"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("help")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                mode === "help"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-black/25 text-white/80 hover:bg-black/35"
              }`}
            >
              Help
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
              aria-label="Close Laura"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {mode === "chat" ? (
          <>
            {/* Messages */}
            <div
              ref={scrollRef}
              className="max-h-[45vh] sm:max-h-[420px] overflow-y-auto p-4 space-y-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,255,255,0.2) transparent",
              }}
            >
              {messages.length === 0 && (
                <div className="space-y-5 text-center py-4">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/10 mx-auto">
                    <img
                      src={lauraAvatar}
                      alt="Laura"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                      Hi, I'm Laura
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed px-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                      I help with scanning, pricing, privacy, and navigating
                      InVision Network.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => sendMessage(action)}
                        className="px-3.5 py-2 rounded-full bg-black/25 text-xs font-semibold text-white hover:bg-black/35 transition-all border border-white/30"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[82%] ${
                      msg.role === "assistant"
                        ? "bg-black/25 text-white border border-white/20"
                        : "bg-gradient-to-br from-primary to-accent text-white shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-4 py-2.5 bg-black/25 text-sm text-white/70 border border-white/20 flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    Laura is typing
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/10 bg-black/20 flex gap-2"
            >
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isRecording
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110 animate-pulse"
                    : "bg-black/25 text-white hover:bg-black/35"
                }`}
                aria-label={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Laura a question..."
                className="flex-1 rounded-full bg-black/25 border border-white/20 px-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="rounded-full w-10 h-10 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          /* Quick Help Panel */
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-black/25 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>Quick Help</p>
                <p className="text-[11px] text-white/70" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                  Fast paths to support & resources
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {quickHelpActions.map((action) => {
                const ActionIcon = action.icon;
                const content = (
                  <div
                    className={`relative p-3 rounded-xl bg-black/25 hover:bg-black/35 border border-white/20 hover:border-white/30 transition-all cursor-pointer group ${
                      action.urgent ? "ring-1 ring-rose-400/40" : ""
                    }`}
                    onClick={() => {
                      if (action.action) action.action();
                      if (action.closeOnAction !== false) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {action.urgent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                    )}
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-2 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all`}
                    >
                      <ActionIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xs font-bold text-white" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                      {action.label}
                    </div>
                    <div className="text-[10px] text-white/70 leading-tight mt-0.5" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
                      {action.description}
                    </div>
                  </div>
                );

                if (action.href) {
                  return (
                    <Link
                      key={action.label}
                      to={action.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </Link>
                  );
                }

                return <div key={action.label}>{content}</div>;
              })}
            </div>
          </div>
        )}
      </div>
      <p className="mt-1.5 text-[10px] text-white/50 text-right pr-2 opacity-60">
        Laura only answers InVision Network questions
      </p>
    </div>
  );
});

export default LauraAIAssistant;
