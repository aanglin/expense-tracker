import React, { useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const { googleLoginHandler } = useContext(authContext);
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center md:mt-9">Finance -Tracker 💵 </h1>

      <div className="flex flex-col overflow-hidden shadow-md shadow-gray-500 bg-gray-800 rounded-2xl ">
        <div className="h-52">
          <img
            className="object-cover w-full h-full "
            src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="login"
          />
        </div>
        <div className="px-4 py-4">
          <h2 className="text-2xl text-center">Please sign in to continue</h2>
          <button
            onClick={googleLoginHandler}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg "
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </div>
      </div>
    </main>
  );
}
