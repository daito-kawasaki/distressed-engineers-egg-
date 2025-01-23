"use client";

import { useState } from "react";
import { postAction } from "./action";

export default function Page() {
  var [result, setResult] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await postAction(formData.get("prompt") as string);
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-white">Gemini</h1>

      <form action={handleSubmit}>
        <input type="text" name="prompt" className=" text-black w-2/5" />
        <button type="submit" className=" text-black">
          送信
        </button>
      </form>

      <div className=" text-black">{result}</div>
    </div>
  );
}
