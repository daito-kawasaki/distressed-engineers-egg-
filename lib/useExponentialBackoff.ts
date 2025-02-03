import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeminiContent, Message } from "./types/chat";

const useExponentialBackoff = async (
  retries: number,
  maxRetries: number,
  processingMessage: string,
  genAI: GoogleGenerativeAI,
  geminiHistory: GeminiContent[]
): Promise<{
  success: boolean;
  response?: any;
  assistantMessage?: Message;
}> => {
  if (retries >= maxRetries) {
    throw new Error("Max retries exceeded");
  }
  const delay = Math.pow(2, retries) * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  console.log(`Retrying after ${delay / 1000} seconds...`);
  try {
    const genAIModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const chat = genAIModel.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(processingMessage);
    const responseData = result.response;

    const assistantMessage: Message = {
      role: "assistant",
      content: responseData.text(),
    };
    return { success: true, response: responseData, assistantMessage };
  } catch (error: unknown) {
    console.error(`APIリクエストエラー (${retries + 1} 回目の試行):`, error);
    throw error;
  }
};

export default useExponentialBackoff;
