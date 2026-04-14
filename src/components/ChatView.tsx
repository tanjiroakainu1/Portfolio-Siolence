import { useCallback, useEffect, useId, useRef, useState } from "react";
import { assistant, profile, youtubeChannel } from "../data/portfolioData";
import { buildSystemPrompt } from "../lib/systemPrompt";
import { FloatingParticles } from "./FloatingParticles";
import { SendIcon } from "../icons";

type BubbleRole = "user" | "assistant" | "system";

interface ChatLine {
  id: string;
  role: BubbleRole;
  content: string;
}

const MODEL = "openai/gpt-4o-mini";
const AVATAR_MSG = "h-9 w-9 shrink-0";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1.5 py-0.5" aria-hidden>
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-accent/70 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-accent/70 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-accent/70 [animation-delay:300ms]" />
    </span>
  );
}

export function ChatView({ hidden }: { hidden: boolean }) {
  const systemPrompt = buildSystemPrompt(assistant, profile, youtubeChannel);
  const threadRef = useRef<{ role: string; content: string }[]>([
    { role: "system", content: systemPrompt },
  ]);

  const welcome = `Hi — I’m ${assistant.name}. You can ask me anything: general questions, coding, study tips, ideas — I’ll stay polite and do my best. I can also tell you about Raminder’s work, stack, and demos (YouTube: ${youtubeChannel.handle}). For quotes or hiring, use Contact & social on the Portfolio page.`;

  const [lines, setLines] = useState<ChatLine[]>([
    { id: uid(), role: "assistant", content: welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const formId = useId();

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

  useEffect(() => {
    if (!hidden) {
      inputRef.current?.focus();
      window.scrollTo(0, 0);
    }
  }, [hidden]);

  const onSubmit = async (e: React.FormEvent) => {
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
          model: MODEL,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; text?: string };
      if (!res.ok) {
        const err = data.error ?? res.statusText ?? "Request failed";
        setLines((prev) => [...prev, { id: uid(), role: "system", content: String(err) }]);
        threadRef.current.pop();
        return;
      }
      const reply = data.text ?? "";
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
      if (!hidden) inputRef.current?.focus();
    }
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
    // Let IME composition finish before submitting (e.g. Japanese/Chinese input).
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
  };

  return (
    <section
      id="view-chat"
      className="relative z-10 flex min-h-0 flex-1 flex-col"
      aria-label={`${assistant.name} chat`}
      hidden={hidden}
    >
      <FloatingParticles variant="chat" />
      <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[min(48rem,100%)] flex-1 flex-col px-[clamp(0.75rem,3.5vw,1.25rem)] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-3 sm:px-6 sm:pb-4 sm:pt-4 lg:max-w-[52rem]">
        {/* Single card: fills remaining viewport; messages pane scrolls inside */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-cyan-400/35 bg-surface/85 shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_56px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-cyan-400/12 backdrop-blur-md">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-cyan-400/20 px-3 py-2.5 sm:px-4">
            <a
              href="#portfolio"
              className="text-sm font-semibold text-bolt no-underline transition-opacity hover:opacity-90 sm:text-[0.9rem]"
            >
              ← Portfolio
            </a>
            <span
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-bolt/90"
              title="Assistant ready"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent motion-reduce:animate-none motion-reduce:shadow-[0_0_10px_rgba(34,211,238,0.55)] motion-safe:animate-chat-pulse"
                aria-hidden
              />
              Ready
            </span>
          </div>

          <p className="shrink-0 border-b border-white/[0.05] px-3 py-2 text-center text-[0.78rem] leading-snug text-slate-400 sm:px-4 sm:text-[0.8rem]">
            {assistant.headerTagline}
          </p>

          <div
            ref={messagesRef}
            className="chat-messages-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-3 py-3 sm:gap-3.5 sm:px-4 sm:py-4"
            style={{
              background:
                "linear-gradient(180deg, rgba(34,211,238,0.05) 0%, transparent 32%), radial-gradient(ellipse 80% 50% at 100% 0%, rgba(139,92,246,0.08), transparent 50%), #0a1220",
            }}
            role="log"
            aria-live="polite"
          >
            {lines.map((line) => {
              if (line.role === "system") {
                return (
                  <div
                    key={line.id}
                    className="max-w-[95%] self-center rounded-xl border border-danger/25 bg-danger/10 px-3 py-2 text-center text-sm text-danger [overflow-wrap:anywhere]"
                  >
                    {line.content}
                  </div>
                );
              }
              if (line.role === "user") {
                return (
                  <div key={line.id} className="flex w-full flex-row-reverse items-start gap-2.5 sm:gap-3">
                    <span
                      className={`${AVATAR_MSG} mt-0.5 flex items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/15 text-[0.6rem] font-bold uppercase tracking-wider text-bolt`}
                      aria-hidden
                    >
                      You
                    </span>
                    <div className="min-w-0 max-w-[min(100%,calc(100%-3rem))] rounded-2xl rounded-tr-sm bg-gradient-to-br from-cyan-600/22 to-violet-600/18 px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-slate-100 shadow-sm ring-1 ring-cyan-400/25 [overflow-wrap:anywhere] sm:text-[0.9375rem]">
                      {line.content}
                    </div>
                  </div>
                );
              }
              return (
                <div key={line.id} className="flex w-full items-start gap-2.5 sm:gap-3">
                  <img
                    className={`${AVATAR_MSG} mt-0.5 rounded-full border border-white/10 bg-surface-2 object-cover ring-1 ring-cyan-400/25`}
                    src={assistant.avatarSrc}
                    alt=""
                    width={36}
                    height={36}
                    decoding="async"
                    loading="lazy"
                  />
                  <div className="min-w-0 max-w-[min(100%,calc(100%-3rem))] rounded-2xl rounded-tl-sm bg-surface-2/90 px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-white/[0.08] [overflow-wrap:anywhere] sm:text-[0.9375rem]">
                    {line.content}
                  </div>
                </div>
              );
            })}

            {loading ? (
              <div className="flex w-full items-start gap-2.5 sm:gap-3">
                <img
                  className={`${AVATAR_MSG} mt-0.5 rounded-full border border-white/10 bg-surface-2 object-cover ring-1 ring-cyan-400/25`}
                  src={assistant.avatarSrc}
                  alt=""
                  width={36}
                  height={36}
                />
                <div className="flex min-h-[2.5rem] items-center rounded-2xl rounded-tl-sm bg-surface-2/90 px-3.5 py-2.5 ring-1 ring-white/[0.08]">
                  <TypingDots />
                </div>
              </div>
            ) : null}
          </div>

          <form
            id={formId}
            onSubmit={onSubmit}
            className="shrink-0 border-t border-cyan-500/10 bg-surface-2/85 px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom,0px))] sm:px-4 sm:py-3"
          >
            <div className="flex w-full min-w-0 flex-col gap-2.5 sm:flex-row sm:items-end sm:gap-3">
              <label className="block w-full min-w-0 flex-1 sm:min-w-0">
                <span className="sr-only">Message {assistant.name}</span>
                <textarea
                  ref={inputRef}
                  id={`${formId}-input`}
                  rows={3}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder={`Ask anything — ${assistant.name} replies politely…`}
                  autoComplete="off"
                  enterKeyHint="send"
                  aria-label={`Message ${assistant.name} — any topic welcome`}
                  disabled={loading}
                  className="box-border block min-h-[5rem] w-full min-w-0 max-w-full resize-y rounded-xl border border-cyan-500/15 bg-page/95 px-3.5 py-3 font-sans text-[max(16px,0.9rem)] leading-snug text-slate-100 outline-none placeholder:text-muted/90 [overflow-wrap:anywhere] focus-visible:ring-2 focus-visible:ring-accent/40 sm:min-h-[5.25rem]"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan-400 px-6 py-3 text-sm font-semibold text-page shadow-bolt-sm transition-[opacity,transform,box-shadow] hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_0_28px_rgba(34,211,238,0.45)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-h-[52px] sm:min-w-[7.5rem] sm:self-stretch sm:px-5"
              >
                <span>Send</span>
                <SendIcon className="block h-[18px] w-[18px]" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
