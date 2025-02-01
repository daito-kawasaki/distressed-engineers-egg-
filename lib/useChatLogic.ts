import { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "./types/chat";

export type GeminiPart = {
  text: string;
};
export type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

const questions = [
  "1. あなたが今まで行ってきたこと（言語やフレームワーク、開発の内容など）はなんですか？それを踏まえてロボットにそれらがどのような職種があるか訪ねて見てください",
  "2. ロボットから返ってきた職種についてあなたはどれに関心を持ちますか？優先順位をつけてみてください",
  "3. あなたの長所と短所はなんですか？",
  "4. あなたは将来的にを元にどんなエンジニアになりたいですか？例）自分の強みの人を見る力を活かし、プロジェクトマネージャーとしてよりよいプロジェクトをメンバーと共に開発していき、顧客のニーズに合わせたストレスの無いプロダクトを生み出すエンジニアになりたい。",
  "5. あなたはどのようにキャリアプランを進めて生きたいですか？また、あなたの理想の働き方についても回答して下さい。例）私は経験がなくても挑戦をさせていただける環境で、どんどん知識を蓄えていきたいです。その中で、コミュニケーションをしつつチームで開発を行う関係のある環境での方が成長していけると考えています。働き方については、基本出社でチームメイトと濃密なコミュニケーションをとりつつ働いて行きたいです。それとは反対に自宅でコミュニケーションがなくなるような働き方はコミュニケーションが少なくなってしまうためあまり理想的な働き方では無いと考えています。",
];

export const useChatLogic = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [messageNumber, setMessageNumber] = useState(0);

  const handleSendMessage = useCallback(
    async (formData: { prompt: string }, genAI: GoogleGenerativeAI) => {
      const maxRetries = 3; // 最大リトライ回数
      let retries = 0;

      while (retries <= maxRetries) {
        if (retries !== 0) {
        }
        try {
          const genAIModel = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
          });

          let processingMessage = formData.prompt;
          if (messageNumber === 0) {
            processingMessage +=
              "これらの経験を活かせる職種はどのようなものがありますか？";
            console.log(processingMessage);
            setMessageNumber((prevMessageNumber) => prevMessageNumber + 1);
          }
          if (messageNumber === 1) {
            processingMessage +=
              "これらの優先順位を踏まえて、現状のスキルセットや開発経験などを鑑み、キャリアプランが豊富だったり、最終的なゴールにどのようなものがあるか教えて下さい";
            setMessageNumber((prevMessageNumber) => prevMessageNumber + 1);
          }
          if (messageNumber === 2) {
            processingMessage +=
              "それを踏まえて、キャリアプランや最終的なゴールを選定してください。";
            setMessageNumber((prevMessageNumber) => prevMessageNumber + 1);
          }
          if (messageNumber === 3) {
            processingMessage +=
              "上記の内容を元に、今までの回答（1番の開発経験、二番の職種の関心に対する優先順位）を踏まえて、どの職種やキャリアプランを目指すのがいいかを教えて下さい。それに付け加えて、10年後の目標を1から3年、3から6年、6から10年という単位で定めてください。";
            setMessageNumber((prevMessageNumber) => prevMessageNumber + 1);
          } else {
            processingMessage +=
              "先ほどの質問にあった細分化した目標を組織の形ごとのキャリアプランの進め方と、理想の働き方について抑えながら、最終的な目標を効率的に達成できる環境や組織の形が自分に見合っているか教えて下さい。";
            setMessageNumber((prevMessageNumber) => prevMessageNumber + 1);
          }

          const userMessage: Message = {
            role: "user",
            content: processingMessage,
          };
          setMessages((prevMessages) => [...prevMessages, userMessage]);

          const geminiHistory: GeminiContent[] = messages.reduce(
            (acc: GeminiContent[], msg) => {
              if (msg.role === "question") {
                return acc;
              }
              acc.push({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
              });
              return acc;
            },
            []
          );

          const chat = genAIModel.startChat({ history: geminiHistory });

          const result = await chat.sendMessage(processingMessage);
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
          return; // 成功したらループを抜ける
        } catch (error: unknown) {
          console.error(
            `APIリクエストエラー (${retries + 1} 回目の試行):`,
            error
          );
          retries++;
          if (retries > maxRetries) {
            throw error;
          }
          const delay = Math.pow(2, retries) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          console.log(`Retrying after ${delay / 1000} seconds...`);
        }
      }
    },
    [messages, questionNumber, setMessages, setQuestionNumber, messageNumber]
  );

  return {
    messages,
    setMessages,
    handleSendMessage,
    questions,
  };
};
