import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button className="py-2 px-4 border-none outline-none ring-2 rounded-lg bg-red-500 text-white">
        <Link href="/login"> Log in</Link>
      </button>
    </div>
  );
};

export default page;
