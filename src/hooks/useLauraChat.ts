import { useCallback, useMemo, useRef, useState } from "react";
import { lauraConfig } from "@/lib/lauraConfig";

export interface LauraMessage {
  role: "user" | "assistant";
  content: string;
}

const fallbackResponse =
  "I can only help with questions about using InVision Network. For other assistance, please contact support@invisionnetwork.org";

const containsUrl = (text: string) => /https?:\/\/\S+/i.test(text);

const isDisallowed = (text: string) => {
  const lower = text.toLowerCase();
  const blocked = [
    "analyze this",
    "read this",
    "open this",
    "visit this",
    "summarize this",
    "review this file",
    "check this link",
    "code",
    "api key",
    "system prompt",
    "access system",
  ];

  return blocked.some((phrase) => lower.includes(phrase)) || containsUrl(text);
};

const isAllowedTopic = (text: string) => {
  const lower = text.toLowerCase();
  const allowedKeywords = [
    "hello",
    "hi",
    "hey",
    "thanks",
    "thank you",
    "scanner",
    "scan",
    "pricing",
    "cost",
    "price",
    "how much",
    "invision",
    "services",
    "privacy",
    "private",
    "secure",
    "safe",
    "data",
    "delete",
    "report",
    "scam",
    "fraud",
    "phishing",
    "file types",
    "files",
    "upload",
    "analysis",
    "analyze",
    "how long",
    "how do",
    "what is",
    "what are",
    "can i",
    "help",
    "use",
    "navigation",
    "workshop",
    "training",
    "contact",
    "support",
    "book",
    "library",
    "laura",
  ];

  return allowedKeywords.some((keyword) => lower.includes(keyword));
};

export const useLauraChat = () => {
  const [messages, setMessages] = useState<LauraMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const CHAT_URL = useMemo(
    () => `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
    [],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) return;

      if (isDisallowed(trimmed) || !isAllowedTopic(trimmed)) {
        setMessages((prev) => [
          ...prev,
          { role: "user" as const, content: trimmed },
          { role: "assistant" as const, content: fallbackResponse },
        ]);
        return;
      }

      const updated: LauraMessage[] = [
        ...messages,
        { role: "user" as const, content: trimmed },
      ];
      setMessages(updated);
      setIsLoading(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            messages: updated.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            type: "laura",
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error("Unable to reach Laura right now.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantMessage += delta;
                setMessages([
                  ...updated,
                  { role: "assistant" as const, content: assistantMessage },
                ]);
              }
            } catch {
              // Ignore partial chunks
            }
          }
        }

        if (!assistantMessage) {
          setMessages([
            ...updated,
            { role: "assistant" as const, content: fallbackResponse },
          ]);
        }
      } catch (err) {
        if (err?.name === "AbortError") return;
        setMessages([
          ...updated,
          { role: "assistant" as const, content: fallbackResponse },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [CHAT_URL, messages],
  );

  const resetChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
    config: lauraConfig,
  };
};

export default useLauraChat;
