import SectionTitle from "@/components/common/sectionTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Description() {
  return (
    <main>
      <div className="min-h-screen bg-white pb-28">
        <SectionTitle ttl="Description" sub_ttl="使用説明" />

        <li className="flex items-center flex-col  lg:flex-row lg:gap-28 mt-8 px-12">
          <div className="lg:w-1/2">
            <p className="text-gray-600 mb-8 lg:mb-8 leading-[1.2] text-lg">
              このシステムでは、灰色の文字の質問に対して、ユーザーが
              回答すると、自動的に文字が加工されてAIにチャットが回答されます。
            </p>
          </div>

          <div className="lg:w-1/2">
            <Image
              src="/description_1.png"
              alt="System explanation screenshot"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </li>
        <li className="flex items-center flex-col lg:flex-row lg:gap-28 mt-8 px-12">
          <div className="lg:w-1/2">
            <p className="text-gray-600 mb-8 lg:mb-8 leading-[1.2] text-lg">
              右の画像のようにユーザーの回答と
              AIから返ってきた回答が表示されます。
              また、スクロールすると新しい質問が表示されます。
              最後の質問が回答された時点で、終了の表示がされます。
            </p>
          </div>

          <div className="lg:w-1/2">
            <Image
              src="/description_2.png"
              alt="System explanation screenshot"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </li>
        <div className="flex justify-center mt-12">
          <Button className="  mt-6 text-xl py-6 font-semibold h-0">
            <Link href={"/Chat"}>Let's start!</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
