"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const signUp = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success(response?.data?.message);
      setLoading(false);
      router.push("/verifyemail");
      e.target.reset();
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (
      user?.username.length > 0 &&
      user?.email?.length > 0 &&
      user?.password.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);
  return (
    <div className="absolute inset-0 h-full w-full bg-[#f1f1f1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex justify-center items-center">
      <Toaster/>
      <form
        onSubmit={signUp}
        className=" w-[500px] shadow-md p-4 rounded-md shadow-gray-500 flex flex-col gap-5"
      >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow py-2 px-3 rounded-sm border-none outline-none ring-1"
            placeholder="Email"
            value={user?.email}
            onChange={(e) =>
              setUser((prv) => ({ ...prv, email: e.target.value }))
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow py-2 px-3 rounded-sm border-none outline-none ring-1"
            placeholder="Username"
            value={user?.username}
            onChange={(e) =>
              setUser((prv) => ({ ...prv, username: e.target.value }))
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow py-2 px-3 rounded-sm border-none outline-none ring-1"
            placeholder="Password"
            value={user?.password}
            name="password"
            onChange={(e) =>
              setUser((prv) => ({ ...prv, password: e.target.value }))
            }
          />
        </label>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={disabled}
            className={`btn btn-secondary  py-3 px-5 rounded-md text-white font-medium ${
              disabled
                ? "bg-red-600 text-white cursor-not-allowed"
                : "bg-violet-700"
            }`}
          >
            {loading ? "Loading....." : " Sign Up"}
          </button>
        </div>
        <p className=" text-sm font-medium text-pink-500 text-end">
          Visit Login Page{" "}
          <Link href="/login" className="text-lg text-blue-600">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUp;
