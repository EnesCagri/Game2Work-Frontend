"use client";

import { useState, useRef, useEffect } from "react";
import { chatWithGemini } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeminiResponseRenderer } from "@/components/gemini-response-renderer";
import Image from "next/image";

interface Message {
  role: "user" | "model";
  parts: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage: Message = { role: "user", parts: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithGemini([...messages, newMessage]);
      setMessages((prev) => [...prev, { role: "model", parts: response }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Mascot Header */}
      <div className="flex items-center justify-center p-4 border-b">
        <div className="flex items-center gap-3">
          <Image
            src="/mascot.png"
            alt="CodeGoblin Mascot"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            CodeGoblin AI
          </h1>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground p-8">
              <h2 className="text-lg font-semibold mb-2">
                Merhaba! Ben CodeGoblin 🧙‍♂️
              </h2>
              <p>
                Oyun geliştirme konusunda size yardımcı olmak için buradayım.
                Bir soru sorun veya kod örneği isteyin!
              </p>
            </div>
          )}

          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.role === "user" ? (
                  <p className="whitespace-pre-wrap">{message.parts}</p>
                ) : (
                  <GeminiResponseRenderer content={message.parts} />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="relative max-w-[80%] rounded-lg p-4 bg-muted">
                <p>Düşünüyorum... 🤔</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bir soru sorun veya kod örneği isteyin..."
              className="flex-1 min-h-[60px] max-h-[200px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={isLoading}>
              Gönder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
