import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useCallback } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const FromSchema = z.object({
  prompt: z.string().min(5, {
    message: "5文字以上入力する必要があります。",
  }),
});

type FromValues = z.infer<typeof FromSchema>;

type InputPromptProps = {
  onSubmit: (formData: FromValues) => void;
  loading: boolean;
  reseted: boolean;
  setReseted: (reseted: boolean) => void;
};

export default function InputPrompt({
  onSubmit,
  loading,
  reseted,
  setReseted,
}: InputPromptProps) {
  const form = useForm<FromValues>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(FromSchema),
  });

  useEffect(() => {
    if (reseted) {
      form.reset();
      setReseted(false);
    }
  }, [form, setReseted, reseted]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (
        (e.metaKey && e.key === "Enter") ||
        (e.ctrlKey && e.key === "Enter")
      ) {
        form.handleSubmit((data: FromValues) => {
          onSubmit(data);
          setReseted(true);
        })();
        e.preventDefault();
      }
    },
    [form, onSubmit, setReseted]
  );

  const handleSubmit = (data: FromValues) => {
    onSubmit(data);
    setReseted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div id="input_prompt_pc" className=" hidden sm:block">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="メッセージを入力してください"
                    onKeyDown={handleKeyDown}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  プロンプトに返答を入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div id="input_prompt_sp" className=" sm:hidden !my-0">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="メッセージを入力してください"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  プロンプトに返答を入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div id="button_field" className=" flex flex-col items-end !my-0">
          <Button
            type="submit"
            disabled={loading}
            className=" w-fit hidden sm:block"
          >
            ⌘ + Enter　送信
          </Button>
          <Button type="submit" disabled={loading} className=" w-fit sm:hidden">
            送信
          </Button>
        </div>
      </form>
    </Form>
  );
}
