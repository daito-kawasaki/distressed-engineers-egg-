import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "./types/chat"; // 適切なパスに修正してください

export type GeminiPart = {
  text: string;
};
export type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

const questions = [
  "あなたは、エンジニアの中で将来何の職種につきたいですか？また今まで学習してきた内容を踏まえて何をしている瞬間に楽しいなと感じましたか？ 入力例）将来私はwebエンジニアとして活動していきたいです。中でもフロントエンドをしていて楽しいと思ったのでフロントエンドをしていきたいです。？",
  "最近面白かったことはありますか？",
  "好きな食べ物は何ですか？",
  "明日、楽しみなことはありますか？",
];

export const useChatLogic = () => {
  // useプレフィックスを付けたカスタムフック
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);

  const handleSendMessage = useCallback(
    async (
      // useCallbackでメモ化
      formData: { prompt: string },
      genAI: GoogleGenerativeAI
    ) => {
      try {
        const genAIModel = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const userMessage: Message = { role: "user", content: formData.prompt };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        const geminiHistory: GeminiContent[] = messages.map(
          (message, index) => {
            if (index === 0 && message.role === "question") {
              return {
                role: "user",
                parts: [{ text: message.content }],
              };
            }
            return {
              role: message.role === "user" ? "user" : "model",
              parts: [{ text: message.content }],
            };
          }
        );

        const chat = genAIModel.startChat({ history: geminiHistory });
        const result = await chat.sendMessage(formData.prompt);
        const responseData = result.response;

        const assistantMessage: Message = {
          role: "assistant",
          content: responseData.text(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
        if (questionNumber < questions.length - 1) {
          const newQuestion: Message = {
            role: "question",
            content: questions[questionNumber + 1],
          };
          setMessages((prevMessages) => [...prevMessages, newQuestion]);
          setQuestionNumber((prevNumber) => prevNumber + 1);
        }
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    [messages, questionNumber, setMessages, setQuestionNumber]
  ); // useCallbackの依存配列に不足していたものを追加

  return {
    messages,
    setMessages,
    handleSendMessage,
    questions,
  };
};
