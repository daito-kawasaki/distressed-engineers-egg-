"use client";

import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Message } from "@/components/chat/Chat";

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
            message.role === "user" && "flex justify-end",
            message.role === "question" && "text-gray-500"
          )}
        >
          <div className="flex items-center">
            {message.role === "assistant" && (
              <div className="relative h-10 w-10 mr-2">
                <Image src="/robot.png" fill alt="robot" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[500px] p-3 shadow",
                message.role === "user"
                  ? "bg-primary text-white rounded-t-lg rounded-bl-lg"
                  : message.role === "assistant"
                  ? "bg-muted rounded-t-lg rounded-br-lg"
                  : "bg-gray-100 rounded-t-lg rounded-br-lg"
              )}
            >
              <div className="text-sm break-words break-keep">
                {message.content}
              </div>
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
