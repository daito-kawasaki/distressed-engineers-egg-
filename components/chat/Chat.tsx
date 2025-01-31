"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import ChatMessages from "@/components/chat/ChatMessages";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import InputPrompt from "@/components/chat/InputPrompt";
import { chatLogic } from "@/lib/chatLogic";
import { createGeminiClient } from "@/lib/geminiApi";

// Gemini API の Content 型に合わせるための型定義
type GeminiPart = {
  text: string;
};

type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

export type Message = {
  role: "user" | "assistant" | "question";
  content: string;
};

const questions = [
  "あなたは、エンジニアの中で将来何の職種につきたいですか？また今まで学習してきた内容を踏まえて何をしている瞬間に楽しいなと感じましたか？ 入力例）将来私はwebエンジニアとして活動していきたいです。中でもフロントエンドをしていて楽しいと思ったのでフロントエンドをしていきたいです。？",
  "最近面白かったことはありますか？",
  "好きな食べ物は何ですか？",
  "明日、楽しみなことはありますか？",
];
export default function Chat() {
  const router = useRouter();
  const [reseted, setReseted] = useState(false);
  const [loading, setLoading] = useState(false);
  const genAIRef = useRef<GoogleGenerativeAI | null>(null);
  const {
    messages,
    setMessages,
    handleSendMessage,
    questions,
    questionNumber,
  } = chatLogic();

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
    const firstQuestion: Message = {
      role: "question",
      content: questions[0],
    };
    setMessages((prevMessages) => [...prevMessages, firstQuestion]);
  }, []);

  const handleSubmit = async (formData: { prompt: string }) => {
    setLoading(true);
    try {
      if (!genAIRef.current) {
        throw new Error("APIクライアントの初期化に失敗しました。");
      }
      await handleSendMessage(formData, genAIRef.current);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "メッセージの取得に失敗しました。",
        description: error.message || "内容を御覧ください。",
      });
    } finally {
      setLoading(false);
      router.refresh;
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
