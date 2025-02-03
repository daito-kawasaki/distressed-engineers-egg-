import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function First() {
  return (
    <>
      <div className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className=" absolute sm:static w-full h-auto inset-0">
          <Image
            src="/main_visual.jpeg"
            alt="Main Visual"
            layout="fill"
            objectFit="cover"
            className=" w-full h-full opacity-50"
          />
        </div>

        <div className=" relative text-center sm:absolute sm:left-8 sm:bottom-60 sm:text-left text-white p-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            エンジニアで未来を掴む
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            そのためのアシストを目的としています。
          </p>
          <p className="mt-2 text-md md:text-lg">
            このサイトでは、エンジニアとして何をどう進めればいいのかどんな職種があるのか、この経験が何につながるのかを解決できます。
          </p>
          <Button className="bg-red-500 mt-6 text-xl py-6 font-semibold h-0">
            <Link href={"/Description"}>Let&#39;s seize the future!</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
