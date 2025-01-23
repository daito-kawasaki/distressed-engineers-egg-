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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const FromSchema = z.object({
  prompt: z.string().min(2, {
    message: "2文字以上入力する必要があります。",
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
  }, [reseted]);

  const handleSubmit = (data: FromValues) => {
    onSubmit(data);
    setReseted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="メッセージを入力してください" {...field} />
              </FormControl>
              <FormDescription>
                プロンプトに返答を入力してください
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div id="button_field" className=" flex flex-col items-end">
          <Button type="submit" disabled={loading} className=" w-fit">
            送信
          </Button>
        </div>
      </form>
    </Form>
  );
}
