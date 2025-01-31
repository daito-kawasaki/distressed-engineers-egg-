import { GoogleGenerativeAI } from "@google/generative-ai";
export const createGeminiClient = (apikey: string) => {
  return new GoogleGenerativeAI(apikey);
};
