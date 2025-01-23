"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import ChatMessages from "@/components/chat/ChatMessages";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import InputPrompt from "@/components/chat/InputPrompt";

// Gemini API の Content 型に合わせるための型定義
type GeminiPart = {
  text: string;
};

type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

export type Message = { role: "user" | "assistant"; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const [reseted, setReseted] = useState(false);
  const [loading, setLoading] = useState(false);

  const genAIRef = useRef<GoogleGenerativeAI | null>(null);
  useEffect(() => {
    if (!genAIRef.current) {
      genAIRef.current = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY || ""
      );
    }
  }, []);

  const handleSubmit = async (formData: { prompt: string }) => {
    setLoading(true);
    try {
      if (!genAIRef.current) {
        throw new Error("APIクライアントの初期化に失敗しました");
      }
      const model = genAIRef.current.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const userMessage: Message = { role: "user", content: formData.prompt };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const geminiHistory: GeminiContent[] = messages.map((msg) => {
        return {
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        };
      });

      const chat = model.startChat({
        history: geminiHistory,
      });

      const result = await chat.sendMessage(formData.prompt);
      const response = await result.response;
      const assistantMessage: Message = {
        role: "assistant",
        content: response.text(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast({
        variant: "destructive",
        title: "メッセージの取得に失敗しました",
        description: error.message || "内容をご確認ください",
      });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="relative h-screen">
      <div className="pb-20">
        <ChatMessages messages={messages} loading={loading} />
      </div>
      <div className=" fixed left-0 bottom-[8%] lg:bottom-[6%] w-full p-4 border-t bg-background">
        <InputPrompt
          onSubmit={handleSubmit}
          loading={loading}
          reseted={reseted}
          setReseted={setReseted}
        />
      </div>
    </div>
  );
}
