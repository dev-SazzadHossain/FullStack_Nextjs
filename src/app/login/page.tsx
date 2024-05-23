"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const signIn = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response?.data?.error === true) {
        setLoading(false);
        return toast.error(response?.data?.message);
      }
      toast.success(response?.data?.message);
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      setLoading(false);
      router.push("/home");
      e.target.reset();
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (user?.email?.length > 0 && user?.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <div className="absolute inset-0 h-full w-full bg-[#f1f1f1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex justify-center items-center">
      <Toaster />
      <form
        onSubmit={signIn}
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
            onChange={(e) =>
              setUser((prv) => ({ ...prv, password: e.target.value }))
            }
          />
        </label>
        <div className="flex justify-center">
          <button
            disabled={disabled}
            type="submit"
            className={`btn btn-secondary bg-violet-700 py-3 px-5 rounded-md text-white font-medium ${
              disabled && "bg-red-500 text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <p className="py-2 text-end">
          Are You New Here{" "}
          <Link href="/signup" className="text-red-400 font-bold text-sm">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
