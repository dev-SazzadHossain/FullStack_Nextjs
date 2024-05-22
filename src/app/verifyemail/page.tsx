"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Verify = () => {
  const route = useRouter();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let token = window.location.search.split("=")[1];
    setId(token);
  }, []);

  const handelVerify = async () => {
    setLoading(true);
    const response = await axios.post("/api/users/verifyemail", { token: id });
    if (response) {
      toast.success(response?.data?.message);
      route.push("/login");
      setLoading(false);
    } else {
      toast.error("error Verify");
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <div>
        <p className="py-3 font-semibold">
          Your Code :{" "}
          <span className="text-red-400 font-normal text-lg">{id}</span>
        </p>
        <div>
          <input
            type="text"
            className="py-3 px-4 border-none  outline-none ring-2 rounded-md"
            placeholder="Enter  Your Code"
          />
        </div>
        <div className="pt-3">
          <button
            onClick={handelVerify}
            className="bg-violet-700 py-2 px-5 rounded-md text-white font-medium"
          >
            {loading ? "Loading..." : " Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
