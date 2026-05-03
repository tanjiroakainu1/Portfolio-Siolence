/** Normalizes model output for chat bubbles. */
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
