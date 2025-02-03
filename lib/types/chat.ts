export type Message = {
  role: "user" | "assistant" | "question";
  content: string;
};
type GeminiPart = {
  text: string;
};
export type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};
