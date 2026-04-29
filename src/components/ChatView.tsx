import { useEffect } from "react";
import { assistant } from "../data/portfolioData";
import { useChatSession } from "../context/ChatSessionContext";
import { FloatingParticles } from "./FloatingParticles";
import { ChatMessageThread } from "./ChatMessageThread";
import { SendIcon } from "../icons";

export function ChatView({ hidden }: { hidden: boolean }) {
  const {
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
  } = useChatSession();

  useEffect(() => {
    if (!hidden) {
      focusInput();
      window.scrollTo(0, 0);
    }
  }, [hidden, focusInput]);

  if (hidden) {
    return (
      <section
        id="view-chat"
        className="relative z-10 hidden min-h-0 flex-1 flex-col"
        aria-label={`${assistant.name} chat`}
        aria-hidden
      />
    );
  }

  return (
    <section
      id="view-chat"
      className="relative z-10 flex min-h-0 flex-1 flex-col"
      aria-label={`${assistant.name} chat`}
    >
      <FloatingParticles variant="chat" />
      <div className="relative z-[1] mx-auto flex min-h-0 w-full max-w-[min(48rem,100%)] flex-1 flex-col px-[clamp(0.75rem,3.5vw,1.25rem)] pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-3 sm:px-6 sm:pb-4 sm:pt-4 lg:max-w-[52rem]">
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

          <ChatMessageThread
            lines={lines}
            loading={loading}
            messagesRef={messagesRef}
            compact={false}
          />

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
                  id={inputFieldId}
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
