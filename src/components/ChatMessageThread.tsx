import type { RefObject } from "react";
import type { ChatLine } from "../context/ChatSessionContext";
import { assistant } from "../data/portfolioData";

const AVATAR_MSG = "h-9 w-9 shrink-0";

/** Per-line tints for assistant replies — keeps body readable, highlights structure. */
function assistantLineClass(row: string): string {
  const t = row.trimStart();
  if (!t) return "text-slate-400/75";
  if (/^\d+\.\s/.test(t)) return "font-medium text-violet-200/95";
  if (/^[-*•]\s/.test(t)) return "font-medium text-emerald-200/95";
  if (/^(#{1,3}\s|Note:|Tip:|Warning:)/i.test(t)) return "font-semibold text-fuchsia-200/95";
  return "text-slate-100/[0.94]";
}

function FormattedAssistantText({ text }: { text: string }) {
  const rows = text.split("\n");
  return (
    <>
      {rows.map((row, i) => (
        <span key={i}>
          {i !== 0 ? "\n" : null}
          <span className={assistantLineClass(row)}>{row}</span>
        </span>
      ))}
    </>
  );
}

const assistantBubbleShell =
  "relative min-w-0 max-w-[min(100%,calc(100%-3rem))] overflow-hidden rounded-2xl rounded-tl-sm border border-fuchsia-400/28 bg-gradient-to-br from-violet-600/[0.18] from-[0%] via-[#1e1038]/96 via-[45%] to-fuchsia-600/[0.14] to-[100%] px-3 py-2 leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_6px_28px_rgba(0,0,0,0.35),0_0_36px_rgba(139,92,246,0.12),0_0_24px_rgba(232,121,249,0.08)] ring-1 ring-violet-400/15 [overflow-wrap:anywhere]";

const assistantBubbleSheen =
  "pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(125deg,rgba(232,121,249,0.12)_0%,transparent_38%,transparent_62%,rgba(167,139,250,0.1)_100%)] opacity-90";

export function TypingDots() {
  return (
    <span className="inline-flex gap-1.5 py-0.5" aria-hidden>
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-fuchsia-400/85 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-violet-400/85 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-typing-bounce rounded-full bg-emerald-400/80 [animation-delay:300ms]" />
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
          "linear-gradient(180deg, rgba(232,121,249,0.07) 0%, transparent 36%), radial-gradient(ellipse 85% 55% at 100% 0%, rgba(139,92,246,0.11), transparent 52%), radial-gradient(ellipse 60% 40% at 0% 100%, rgba(16,185,129,0.06), transparent 50%), #1a0a2e",
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
                className={`${AVATAR_MSG} mt-0.5 flex items-center justify-center rounded-full border border-fuchsia-400/35 bg-fuchsia-500/15 text-[0.55rem] font-bold uppercase tracking-wider text-bolt sm:text-[0.6rem]`}
                aria-hidden
              >
                You
              </span>
              <div
                className={`min-w-0 max-w-[min(100%,calc(100%-3rem))] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-gradient-to-br from-fuchsia-600/22 to-violet-600/18 px-3 py-2 leading-relaxed text-slate-100 shadow-sm ring-1 ring-fuchsia-400/25 [overflow-wrap:anywhere] ${bubbleUser}`}
              >
                {line.content}
              </div>
            </div>
          );
        }
        return (
          <div key={line.id} className="flex w-full items-start gap-2 sm:gap-2.5">
            <img
              className={`${AVATAR_MSG} mt-0.5 rounded-full border border-fuchsia-400/35 bg-surface-2 object-cover shadow-[0_0_22px_rgba(232,121,249,0.22)] ring-2 ring-violet-400/25`}
              src={assistant.avatarSrc}
              alt=""
              width={36}
              height={36}
              decoding="async"
              loading="lazy"
            />
            <div className={`${assistantBubbleShell} whitespace-pre-wrap ${bubbleAsst}`}>
              <span className={assistantBubbleSheen} aria-hidden />
              <span className="relative z-[1] block">
                <FormattedAssistantText text={line.content} />
              </span>
            </div>
          </div>
        );
      })}

      {loading ? (
        <div className="flex w-full items-start gap-2 sm:gap-2.5">
          <img
            className={`${AVATAR_MSG} mt-0.5 rounded-full border border-fuchsia-400/35 bg-surface-2 object-cover shadow-[0_0_22px_rgba(232,121,249,0.22)] ring-2 ring-violet-400/25`}
            src={assistant.avatarSrc}
            alt=""
            width={36}
            height={36}
          />
          <div className={`${assistantBubbleShell} flex min-h-[2.25rem] items-center px-3 py-2`}>
            <span className={assistantBubbleSheen} aria-hidden />
            <span className="relative z-[1]">
              <TypingDots />
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
