import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
const PORT = Number(process.env.PORT) || 8787;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

app.use(cors({ origin: true }));
app.use(express.json({ limit: "256kb" }));

app.post("/api/chat", async (req, res) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Missing OPENROUTER_API_KEY. Copy .env.example to .env and add your key.",
    });
  }

  const { messages, model } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array required" });
  }

  const body = {
    model: model || "openai/gpt-4o-mini",
    messages,
  };

  try {
    const r = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
        "X-Title": process.env.OPENROUTER_APP_NAME || "SIOLENCE",
      },
      body: JSON.stringify(body),
    });

    const data = await r.json();
    if (!r.ok) {
      const msg =
        data?.error?.message ||
        data?.error ||
        `OpenRouter error (${r.status})`;
      return res.status(r.status >= 400 && r.status < 600 ? r.status : 502).json({
        error: String(msg),
      });
    }

    const text = data?.choices?.[0]?.message?.content ?? "";
    return res.json({ text, model: data?.model });
  } catch (e) {
    return res.status(502).json({
      error: e instanceof Error ? e.message : "Upstream request failed",
    });
  }
});

const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  const keyOk = Boolean(process.env.OPENROUTER_API_KEY?.trim());
  console.log(`API + static server http://127.0.0.1:${PORT}`);
  if (!keyOk) {
    console.warn(
      "[chat] OPENROUTER_API_KEY is missing or empty — copy .env.example to .env in the project root."
    );
  }
});
