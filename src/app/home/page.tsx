"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface user {
  _id: string;
  username: string;
  email: string;
  isAdmin: Boolean;
  verify: Boolean;
}
const Home = () => {
  const [userInfo, setUserInfo] = useState<user>();
  const [loading, setLoading] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setUserInfo(response?.data?.data);
      setLoading(false);
    })();
  }, []);

  const handelLogOut = async () => {
    try {
      setLogOutLoading(true);
      const response = await axios.get("/api/users/logout");
      toast.success(response?.data?.message);
      setLogOutLoading(false);
      route.push("/login");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Toaster />
      {loading ? (
        "Loading ..."
      ) : (
        <div>
          <p className=" text-xl font-semibold text-blue-400 ">
            WelCome To Hone Next Js {userInfo?.username}
          </p>

          <p className="pt-4">
            Visit To Our Profile :{" "}
            <Link href={`/profile/${userInfo?._id}`}>
              <span className="text-red-400 font-bold text-sm">
                {" "}
                Click : {userInfo?._id}
              </span>
            </Link>
          </p>
          <div className="flex justify-center items-center py-4">
            <button
              disabled={logOutLoading}
              onClick={handelLogOut}
              className="py-3 px-4 border-none outline-none rounded-lg text-xl font-extrabold text-white bg-black"
            >
              {logOutLoading ? "Loading.." : "Log Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
