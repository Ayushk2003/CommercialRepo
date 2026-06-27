"use client";

import { useEffect, useState } from "react";
import { Heart, Sparkles, X } from "lucide-react";

export default function Chatbot({ chatOpen, setChatOpen, chatMessages, chatInput, setChatInput, sendChat, content }) {
  const [dock, setDock] = useState(0);

  useEffect(() => {
    let frame = 0;

    function handleScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setDock(Math.abs(Math.floor(window.scrollY / 430)) % 4);
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`chatbot dock-${dock} ${chatOpen ? "is-open" : ""}`} aria-label={`${content.assistantName} chat assistant`}>
      <button className="chat-launcher" type="button" onClick={() => setChatOpen((value) => !value)} aria-expanded={chatOpen}>
        <span className="chat-face"><Sparkles size={16} /><Heart className="chat-heart" size={12} /></span><strong>{content.launchLabel}</strong>
      </button>
      <div className={`chat-window ${chatOpen ? "open" : ""}`} aria-hidden={!chatOpen}>
        <div className="chat-topbar">
          <div><span className="chat-status" /><strong>{content.assistantName}</strong><small>{content.assistantSubtitle}</small></div>
          <button className="icon-button ghost small-icon" type="button" onClick={() => setChatOpen(false)} aria-label="Close chat"><X size={18} /></button>
        </div>
        <div className="chat-messages" role="log" aria-live="polite">
          {chatMessages.map((message, index) => <div className={`chat-message ${message.sender}`} key={`${message.sender}-${index}`}>{message.text}</div>)}
        </div>
        <div className="quick-prompts" aria-label="Quick chat prompts">
          {content.quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendChat(prompt)}>{prompt}</button>)}
        </div>
        <form className="chat-form" onSubmit={(event) => { event.preventDefault(); sendChat(chatInput); }}>
          <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} type="text" placeholder={content.inputPlaceholder} />
          <button className="button primary" type="submit">Send</button>
        </form>
      </div>
    </section>
  );
}
