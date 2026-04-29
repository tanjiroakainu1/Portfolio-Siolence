import type { RefObject } from "react";
import type { ChatLine } from "../context/ChatSessionContext";
import { assistant } from "../data/portfolioData";

const AVATAR_MSG = "h-9 w-9 shrink-0";

export function TypingDots() {
  return (
    <span className="inline-flex gap-1.5 py-0.5" aria-hidden>
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-accent/70 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-accent/70 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-accent/70 [animation-delay:300ms]" />
    </span>
  );
}

export function ChatMessageThread({
  lines,
  loading,
  messagesRef,
  compact,
}: {
  lines: ChatLine[];
  loading: boolean;
  messagesRef: RefObject<HTMLDivElement>;
  compact?: boolean;
}) {
  const bubbleUser = compact
    ? "text-[0.8125rem] sm:text-[0.875rem]"
    : "text-[0.875rem] sm:text-[0.9375rem]";
  const bubbleAsst = bubbleUser;

  return (
    <div
      ref={messagesRef}
      className={`chat-messages-scroll flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-2.5 py-2.5 sm:gap-3 sm:px-3 sm:py-3 ${
        compact ? "max-h-[min(52vh,22rem)]" : ""
      }`}
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
              className="max-w-[95%] self-center whitespace-pre-wrap rounded-xl border border-danger/25 bg-danger/10 px-2.5 py-1.5 text-center text-xs text-danger [overflow-wrap:anywhere] sm:px-3 sm:text-sm"
            >
              {line.content}
            </div>
          );
        }
        if (line.role === "user") {
          return (
            <div key={line.id} className="flex w-full flex-row-reverse items-start gap-2 sm:gap-2.5">
              <span
                className={`${AVATAR_MSG} mt-0.5 flex items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-500/15 text-[0.55rem] font-bold uppercase tracking-wider text-bolt sm:text-[0.6rem]`}
                aria-hidden
              >
                You
              </span>
              <div
                className={`min-w-0 max-w-[min(100%,calc(100%-3rem))] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-gradient-to-br from-cyan-600/22 to-violet-600/18 px-3 py-2 leading-relaxed text-slate-100 shadow-sm ring-1 ring-cyan-400/25 [overflow-wrap:anywhere] ${bubbleUser}`}
              >
                {line.content}
              </div>
            </div>
          );
        }
        return (
          <div key={line.id} className="flex w-full items-start gap-2 sm:gap-2.5">
            <img
              className={`${AVATAR_MSG} mt-0.5 rounded-full border border-white/10 bg-surface-2 object-cover ring-1 ring-cyan-400/25`}
              src={assistant.avatarSrc}
              alt=""
              width={36}
              height={36}
              decoding="async"
              loading="lazy"
            />
            <div
              className={`min-w-0 max-w-[min(100%,calc(100%-3rem))] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-surface-2/90 px-3 py-2 leading-relaxed text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-white/[0.08] [overflow-wrap:anywhere] ${bubbleAsst}`}
            >
              {line.content}
            </div>
          </div>
        );
      })}

      {loading ? (
        <div className="flex w-full items-start gap-2 sm:gap-2.5">
          <img
            className={`${AVATAR_MSG} mt-0.5 rounded-full border border-white/10 bg-surface-2 object-cover ring-1 ring-cyan-400/25`}
            src={assistant.avatarSrc}
            alt=""
            width={36}
            height={36}
          />
          <div className="flex min-h-[2.25rem] items-center rounded-2xl rounded-tl-sm bg-surface-2/90 px-3 py-2 ring-1 ring-white/[0.08]">
            <TypingDots />
          </div>
        </div>
      ) : null}
    </div>
  );
}
