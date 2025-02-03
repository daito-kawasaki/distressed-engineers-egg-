"use client";

import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Message } from "@/lib/types/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";

export default function ChatMessages({
  messages,
  loading,
}: {
  messages: Message[];
  loading: boolean;
}) {
  return (
    <div className="space-y-5 pb-40">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            message.role === "user" && "flex justify-end max-w-full",
            message.role === "question" &&
              "flex justify-center   items-center text-gray-500"
          )}
        >
          <div
            className={cn(
              message.role === "user" &&
                "flex sm:justify-end items-center max-w-[70%] sm:max-w-[500px]",
              message.role === "question" &&
                "flex items-center max-w-full sm:max-w-[500px]"
            )}
          >
            {message.role === "assistant" && (
              <div className="relative h-10 w-10 mr-2">
                <Image src="/robot.png" fill alt="robot" />
              </div>
            )}

            <div
              className={cn(
                "max-w-full p-3 shadow sm:max-w-[500px]",
                message.role === "user"
                  ? "bg-primary text-white rounded-t-lg rounded-bl-lg"
                  : message.role === "assistant"
                  ? "bg-muted rounded-t-lg rounded-br-lg"
                  : "bg-gray-100 rounded-t-lg rounded-br-lg"
              )}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                className="text-sm break-words break-keep"
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <Image src="/robot.png" fill alt="robot" />
          </div>
          <Skeleton className="w-[300px] h-[44px] bg-muted rounded-t-lg rounded-br-lg" />
        </div>
      )}
    </div>
  );
}
