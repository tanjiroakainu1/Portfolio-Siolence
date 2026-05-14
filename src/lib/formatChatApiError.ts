/** Adds a short hint when OpenRouter rejects the request for credit / max_tokens reasons. */
export function formatChatApiError(raw: unknown): string {
  const m = String(raw ?? "Request failed");
  if (/more credits|max_tokens|afford \d+/i.test(m)) {
    return `${m}\n\nTip: Restart your dev server after updating — replies are capped to save credits. Set OPENROUTER_MAX_TOKENS=1024 in .env if needed, or add credits at https://openrouter.ai/settings/credits`;
  }
  return m;
}
