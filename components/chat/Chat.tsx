"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import ChatMessages from "@/components/chat/ChatMessages";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import InputPrompt from "@/components/chat/InputPrompt";
import { useChatLogic } from "@/lib/useChatLogic";
import { createGeminiClient } from "@/lib/geminiApi";
import { Message } from "@/lib/types/chat";
import FinishModal from "./FinishModal";

export default function Chat() {
  const router = useRouter();
  const [reseted, setReseted] = useState(false);
  const [loading, setLoading] = useState(false);
  const genAIRef = useRef<GoogleGenerativeAI | null>(null);
  const isFirstRender = useRef(true);
  const {
    messages,
    setMessages,
    handleSendMessage,
    questions,
    questionNumber,
  } = useChatLogic();

  useEffect(() => {
    if (!genAIRef.current) {
      const apiKey = process.env.GEMINI_API_KEY || "";
      if (!apiKey) {
        toast({
          variant: "destructive",
          title: "APIキーが見つかりません",
          description: "環境変数を確認してください",
        });
        return;
      }
      genAIRef.current = createGeminiClient(apiKey);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      const firstQuestion: Message = {
        role: "question",
        content: questions[0],
      };
      setMessages((prevMessages) => [...prevMessages, firstQuestion]);
      isFirstRender.current = false;
    }
  }, [questions, setMessages]);

  const handleSubmit = async (formData: { prompt: string }) => {
    setLoading(true);
    try {
      if (!genAIRef.current) {
        throw new Error("APIクライアントの初期化に失敗しました。");
      }
      await handleSendMessage(formData, genAIRef.current);
    } catch (error: unknown) {
      let errorMessage = "内容をご確認ください。";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }
      toast({
        variant: "destructive",
        title: "メッセージの取得に失敗しました。",
        description: errorMessage,
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
      <FinishModal questionNumber={questionNumber} />
    </div>
  );
}
