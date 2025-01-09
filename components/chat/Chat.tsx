"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoogleGenerativeAI } from "@google/generative-ai";

import ChatMessages from "@/components/chat/ChatMessages";
import * as z from "zod";
import { Content } from "next/font/google";
import { postAction } from "@/app/gemini/action";

const FromSchema = z.object({
  prompt: z.string().min(2, {
    message: "2文字以上入力する必要があります。",
  }),
});

export type FromValues = z.infer<typeof FromSchema>;

const dummyChat = [
  {
    role: "user",
    content: "こんにちは",
  },
  {
    role: "assistant",
    content: "こんにちは！なにかお手伝いできますか？？",
  },
  {
    role: "user",
    content: "こんにちは",
  },
  {
    role: "assistant",
    content: "こんにちは！なにかお手伝いできますか？？",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(dummyChat);

  const form = useForm<FromValues>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(FromSchema),
  });

  const loding = form.formState.isSubmitting;

  const handleSubmit = async (formData: FormData) => {
    // try {
    //   const res = await postAction(formData.get("prompt") as string);
    //   setMessages(res);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  return (
    <>
      <ChatMessages messages={messages} loading={loding} />
    </>
  );
}
