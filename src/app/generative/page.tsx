"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FiSend,
  FiZap,
  FiImage,
  FiCode,
  FiStar,
  FiBookmark,
  FiCpu,
} from "react-icons/fi";
import {
  GiGoblinHead,
  GiSpellBook,
  GiPuzzle,
  GiTrophyCup,
} from "react-icons/gi";
import { chatWithGemini, GeminiMessage, INITIAL_CONTEXT } from "@/lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "code" | "image";
  imageUrl?: string;
}

interface Suggestion {
  icon: React.ReactElement;
  text: string;
}

export default function GenerativePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [chatHistory, setChatHistory] = useState<GeminiMessage[]>([]);

  const suggestions: Suggestion[] = [
    { icon: <GiSpellBook className="w-5 h-5" />, text: "Büyü sistemi önerisi" },
    { icon: <GiPuzzle className="w-5 h-5" />, text: "Yaratıcı boss fikirleri" },
    {
      icon: <GiTrophyCup className="w-5 h-5" />,
      text: "Görev sistemi tasarımı",
    },
  ];

  const handleSubmit = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      // Add user message to Gemini chat history
      const userGeminiMessage: GeminiMessage = {
        role: "user",
        parts: input,
      };
      const newHistory = [...chatHistory, userGeminiMessage];
      setChatHistory(newHistory);

      // Get response from Gemini
      const response = await chatWithGemini(newHistory);

      // Add assistant message
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
        type: "text",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setChatHistory((prev) => [...prev, { role: "model", parts: response }]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <GiGoblinHead className="w-12 h-12 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
                CodeGoblin - Oyun Geliştirici Asistanı
              </h1>
              <p className="text-gray-400">
                Yaratıcı fikirler, teknik çözümler ve görsel öneriler için
                buradayım!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Card className="lg:col-span-1 bg-gray-900/50 border-gray-800 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Hızlı Öneriler</h3>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start gap-2 text-left"
                      onClick={() => setInput(suggestion.text)}
                    >
                      {suggestion.icon}
                      {suggestion.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-900/50 border-gray-800">
                <TabsTrigger value="chat">Sohbet</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="mt-6">
                <Card className="bg-gray-900/50 border-gray-800 min-h-[600px] flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-lg ${
                            message.role === "user"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {message.content}
                          {message.imageUrl && (
                            <img
                              src={message.imageUrl}
                              alt="Generated content"
                              className="mt-4 rounded-lg"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isGenerating && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-blue-500/10 text-blue-500 p-4 rounded-lg">
                          CodeGoblin düşünüyor...
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex gap-4">
                      <Input
                        placeholder="Bir soru sorun veya fikir isteyin..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSubmit}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                      >
                        <FiSend className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="mt-6">
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h2 className="text-xl font-semibold mb-4">Görsel Üretimi</h2>
                  <Textarea
                    placeholder="Görsel için detaylı bir açıklama yazın..."
                    className="mb-4"
                  />
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                    <FiImage className="w-5 h-5 mr-2" />
                    Görsel Üret
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h2 className="text-xl font-semibold mb-4">Kod Örnekleri</h2>
                  <Textarea
                    placeholder="Hangi özellik için kod örneği istiyorsunuz?"
                    className="mb-4"
                  />
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                    <FiCode className="w-5 h-5 mr-2" />
                    Kod Üret
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                <Card className="bg-gray-900/50 border-gray-800 p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Kaydedilen Öneriler
                  </h2>
                  <div className="space-y-4">
                    <Button
                      className="w-full justify-start gap-2"
                      variant="outline"
                    >
                      <FiBookmark className="w-5 h-5" />
                      Kaydedilen örnek yok
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
