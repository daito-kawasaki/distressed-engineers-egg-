"use client";
import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

interface ttlProps {
  ttl: string;
  sub_ttl: string;
}
export default function SectionTitle({ ttl, sub_ttl }: ttlProps) {
  return (
    <div
      id="section_ttl"
      className=" w-fit pt-10 pl-7.5 pr-9 border-b border-black lg:~lg/xl:~pt-14/20 md:~md/xl:~pr-9/24.5"
    >
      <span
        className={`~/md:~text-xs/sm block text-black opacity-70 xl:text-base ${playfairDisplay.className}`}
      >
        {ttl}
      </span>
      <span className=" block pb-2 ~/md:~text-lg/xl lg:~lg/xl:~text-xl/2xl">
        {sub_ttl}
      </span>
    </div>
  );
}
