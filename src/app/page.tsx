'use client';

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-center items-center mt-64 gap-20">
      <button className="bg-gray-500 px-8 py-4 rounded-2xl text-2xl" onClick={() => router.push("/create-new-token")}>
        Create New Token
      </button>
      <button className="bg-gray-500 px-8 py-4 rounded-2xl text-2xl" onClick={() => router.push("/create-bundle")}>
        Create Bundle
      </button>
    </div>
  );
}
