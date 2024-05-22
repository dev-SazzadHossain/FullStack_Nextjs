import Link from "next/link";
import React from "react";

const Profile = ({ params }: any) => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div>
        <div className="flex items-center gap-6 py-5">
          <h3 className=" text-xl font-semibold">Profile</h3>
          <button className="py-2 px-4 border-none outline-none ring-2 rounded-lg bg-red-500 text-white">
            <Link href="/home"> Back To Home</Link>
          </button>
        </div>
        <button className="text-white bg-black px-5 py-3 border-none outline-none ring-2 rounded-md">
          {params?.id}
        </button>
      </div>
    </div>
  );
};

export default Profile;
