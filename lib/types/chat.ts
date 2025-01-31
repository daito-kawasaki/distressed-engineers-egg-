export type Message = {
  role: "user" | "assistant" | "question";
  content: string;
};
