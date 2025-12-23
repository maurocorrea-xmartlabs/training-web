"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="bg-black px-4 py-2 flex items-center gap-6">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Uni-Do"
          width={60}
          height={60}
          className="ml-2"
        />
      </Link>

      <Link href="/todo" className="text-white text-2xl hover:underline">
        To-Do
      </Link>

      <Link href="/exams" className="text-white text-2xl hover:underline">
        Exams
      </Link>
    </nav>
  );
}
