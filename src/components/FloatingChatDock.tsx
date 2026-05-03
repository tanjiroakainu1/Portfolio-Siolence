import { useEffect } from "react";
import type { AppRoute } from "../hooks/useHashRoute";
import { assistant } from "../data/portfolioData";
import { useChatSession } from "../context/ChatSessionContext";
import { ChatMessageThread } from "./ChatMessageThread";
import { NavChatIcon, SendIcon } from "../icons";
import type { HeaderNavTarget } from "./SiteHeader";

type Nav = HeaderNavTarget | null;

export function FloatingChatDock({
  route,
  navTarget,
  panelOpen,
  setPanelOpen,
  onOpenFullChat,
}: {
  route: AppRoute;
  navTarget: Nav;
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
  onOpenFullChat: () => void;
}) {
  const visible =
    (route === "portfolio" || route === "showcase") && navTarget === null;

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
    if (panelOpen && visible) {
      focusInput();
    }
  }, [panelOpen, visible, focusInput]);

  useEffect(() => {
    if (!visible) setPanelOpen(false);
  }, [visible, setPanelOpen]);

  if (!visible) return null;

  return (
    <>
      {panelOpen ? (
        <button
          type="button"
          aria-label="Close chat panel"
          className="fixed inset-0 z-[84] bg-black/50 backdrop-blur-[2px] motion-safe:animate-in motion-safe:fade-in"
          onClick={() => setPanelOpen(false)}
        />
      ) : null}

      <div
        className={`fixed z-[86] flex flex-col items-end gap-3 ${
          panelOpen
            ? "bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))] sm:left-auto sm:max-w-[22rem]"
            : "bottom-[max(1rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))]"
        }`}
      >
        {panelOpen ? (
          <div
            className="flex max-h-[min(85dvh,32rem)] w-full flex-col overflow-hidden rounded-2xl border border-cyan-400/35 bg-surface/95 shadow-[0_16px_56px_rgba(0,0,0,0.55),0_0_48px_rgba(34,211,238,0.12)] ring-1 ring-cyan-400/15 backdrop-blur-lg motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in sm:max-h-[min(80dvh,28rem)] sm:w-[22rem]"
            role="dialog"
            aria-modal="true"
            aria-label={`${assistant.name} quick chat`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-cyan-400/20 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-200 ring-1 ring-white/10">
                  <NavChatIcon className="block h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[0.8rem] font-bold text-slate-100">{assistant.name}</p>
                  <p className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-slate-500">
                    Same session as full chat
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setPanelOpen(false);
                    onOpenFullChat();
                  }}
                  className="rounded-lg px-2 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-bolt ring-1 ring-cyan-400/30 transition-colors hover:bg-cyan-500/10"
                >
                  Full
                </button>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
                  aria-label="Close"
                >
                  <span className="text-lg leading-none" aria-hidden>
                    ×
                  </span>
                </button>
              </div>
            </div>

            <ChatMessageThread
              lines={lines}
              loading={loading}
              messagesRef={messagesRef}
              compact
            />

            <form
              id={`${formId}-dock`}
              onSubmit={onSubmit}
              className="shrink-0 border-t border-cyan-500/10 bg-surface-2/90 p-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
            >
              <div className="flex gap-2">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Message {assistant.name}</span>
                  <textarea
                    ref={inputRef}
                    id={`${inputFieldId}-dock`}
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder={`Message ${assistant.name}…`}
                    autoComplete="off"
                    enterKeyHint="send"
                    disabled={loading}
                    className="box-border block min-h-[3.25rem] w-full resize-none rounded-xl border border-cyan-500/15 bg-page/95 px-3 py-2 font-sans text-[max(16px,0.85rem)] leading-snug text-slate-100 outline-none placeholder:text-muted/80 focus-visible:ring-2 focus-visible:ring-accent/35"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-xl bg-gradient-to-r from-accent to-cyan-400 text-page shadow-bolt-sm disabled:opacity-50"
                  aria-label="Send"
                >
                  <SendIcon className="block h-[18px] w-[18px]" />
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {!panelOpen ? (
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="group inline-flex min-h-[52px] min-w-[52px] items-center justify-center gap-2 rounded-full border border-cyan-400/35 bg-gradient-to-br from-cyan-500/28 via-violet-600/22 to-cyan-600/18 px-4 py-3 text-cyan-50 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_40px_rgba(34,211,238,0.2),0_0_28px_rgba(139,92,246,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_48px_rgba(34,211,238,0.28),0_0_36px_rgba(139,92,246,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60 active:translate-y-0 sm:min-h-[56px] sm:min-w-0 sm:px-5"
            aria-label={`Open ${assistant.name} quick chat`}
            aria-expanded={false}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-current ring-1 ring-white/10">
              <NavChatIcon className="block h-[1.1rem] w-[1.1rem]" />
            </span>
            <span className="hidden max-w-[10rem] flex-col items-start pr-0.5 text-left sm:flex">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-100/95">
                {assistant.name}
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-200/85">
                {assistant.navSubtitle}
              </span>
            </span>
          </button>
        ) : null}
      </div>
    </>
  );
}
