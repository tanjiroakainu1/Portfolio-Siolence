import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { assistant, profile, youtubeChannel } from "../data/portfolioData";
import { buildSystemPrompt } from "../lib/systemPrompt";

export type BubbleRole = "user" | "assistant" | "system";

export interface ChatLine {
  id: string;
  role: BubbleRole;
  content: string;
}

export const CHAT_MODEL = "openai/gpt-4o-mini";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatAssistantReply(raw: string): string {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  if (!normalized) return "";
  if (!normalized.includes("\n")) {
    const hasManyItems = (normalized.match(/\b\d+\.\s/g) ?? []).length >= 2;
    if (hasManyItems) {
      return normalized.replace(/\s+(\d+\.\s)/g, "\n$1").trim();
    }
  }
  return normalized;
}

function buildWelcome(): string {
  return `Hi — I’m ${assistant.name}. You can ask me anything: general questions, coding, study tips, ideas — I’ll stay polite and do my best. I can also tell you about Raminder’s work, stack, and demos (YouTube: ${youtubeChannel.handle}). For quotes or hiring, use Contact & social on the Portfolio page.`;
}

export type ChatSessionContextValue = {
  lines: ChatLine[];
  input: string;
  setInput: (v: string) => void;
  loading: boolean;
  onSubmit: (e: FormEvent) => Promise<void>;
  onInputKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: RefObject<HTMLTextAreaElement>;
  messagesRef: RefObject<HTMLDivElement>;
  formId: string;
  inputFieldId: string;
  focusInput: () => void;
  scrollToBottom: () => void;
};

const ChatSessionContext = createContext<ChatSessionContextValue | null>(null);

export function ChatSessionProvider({ children }: { children: React.ReactNode }) {
  const systemPrompt = useMemo(
    () => buildSystemPrompt(assistant, profile, youtubeChannel),
    []
  );
  const threadRef = useRef<{ role: string; content: string }[]>([
    { role: "system", content: systemPrompt },
  ]);

  const welcome = useMemo(() => buildWelcome(), []);

  const [lines, setLines] = useState<ChatLine[]>([
    { id: uid(), role: "assistant", content: welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const formId = useId();
  const inputFieldId = `${formId}-input`;

  const scrollToBottom = useCallback(() => {
    const el = messagesRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, loading, scrollToBottom]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || loading) return;

      setInput("");
      const userLine: ChatLine = { id: uid(), role: "user", content: text };
      setLines((prev) => [...prev, userLine]);
      threadRef.current.push({ role: "user", content: text });

      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: threadRef.current,
            model: CHAT_MODEL,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string; text?: string };
        if (!res.ok) {
          const err = data.error ?? res.statusText ?? "Request failed";
          setLines((prev) => [...prev, { id: uid(), role: "system", content: String(err) }]);
          threadRef.current.pop();
          return;
        }
        const reply = formatAssistantReply(data.text ?? "");
        threadRef.current.push({ role: "assistant", content: reply });
        setLines((prev) => [
          ...prev,
          { id: uid(), role: "assistant", content: reply || "(empty response)" },
        ]);
      } catch (err) {
        setLines((prev) => [
          ...prev,
          {
            id: uid(),
            role: "system",
            content: err instanceof Error ? err.message : "Network error",
          },
        ]);
        threadRef.current.pop();
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, loading]
  );

  const onInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Enter") return;
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    },
    []
  );

  const value = useMemo<ChatSessionContextValue>(
    () => ({
      lines,
      input,
      setInput,
      loading,
      onSubmit,
      onInputKeyDown,
      inputRef,
      messagesRef,
      formId,
      inputFieldId,
      focusInput,
      scrollToBottom,
    }),
    [
      lines,
      input,
      loading,
      onSubmit,
      onInputKeyDown,
      formId,
      inputFieldId,
      focusInput,
      scrollToBottom,
    ]
  );

  return (
    <ChatSessionContext.Provider value={value}>{children}</ChatSessionContext.Provider>
  );
}

export function useChatSession(): ChatSessionContextValue {
  const ctx = useContext(ChatSessionContext);
  if (!ctx) throw new Error("useChatSession must be used within ChatSessionProvider");
  return ctx;
}
