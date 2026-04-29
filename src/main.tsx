import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChatSessionProvider } from "./context/ChatSessionContext";
import App from "./App";
import "./index.css";

const root = document.getElementById("app");
if (!root) throw new Error('Missing #app root element');

createRoot(root).render(
  <StrictMode>
    <ChatSessionProvider>
      <App />
    </ChatSessionProvider>
  </StrictMode>
);
