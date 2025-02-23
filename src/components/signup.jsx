import React from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const submit = async () => {
    const loadingT = toast.loading("Signing you up..");
    try {
      await createUserWithEmailAndPassword(auth, email, password, username);
    } catch (e) {
      console.log(e);
    }
    const load = toast.success("Account Created Successfully!", {
      id: loadingT,
    });
    setTimeout(()=>toast.success("You are now logged in!", {id:load}),1200)
    setTimeout(() => navigate("/todo"), 1500);
  };
  const googleSignUp = async () => {
    const loadingToast = toast.loading("Signing you up...");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log(e);
      let errorMessage;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered";
      }
    }
    toast.success("Account Created Successfully", {
      id: loadingToast,
    });
  navigate("/login")
  };
  return (
    <div className="bg-gradient-to-r relative from-gray-900 via-purple-900 to-black min-h-screen h-screen flex flex-col justify-center items-center ">
      <h1 className="text-2xl text-cyan-200 absolute top-2 left-2 font-bold">
        flex
      </h1>
      <h1 className="text-4xl font-extrabold text-white">Create an Account</h1>

      <div className="flex flex-col gap-4 mt-4 ">
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-100 p-3 rounded-lg bg-gray-800 autofill:bg-gray-800 bg-opacity-50 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md shadow-purple-900"
        />

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-gray-800 autofill:bg-gray-800 bg-opacity-50 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md shadow-purple-900"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 autofill:bg-gray-800 bg-opacity-50 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md shadow-purple-900"
          placeholder="Create a password"
          required
        />
        <button
          className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold shadow-md shadow-purple-900 hover:bg-purple-800 outline-none"
          type="submit"
          onClick={submit}
        >
          Sign up
        </button>
        <h1 className="text-2xl font-bold text-white flex flex-col justify-center items-center">
          OR
        </h1>
        <button
          onClick={googleSignUp}
          className="w-full p-3 rounded-lg border-2 border-purple-700 text-white font-bold hover:bg-purple-700"
        >
          <SiGoogle className="inline-block  mx-3 text-cyan-200" size={20} />
          Sign up with google
        </button>

        <p className="text-sm text-purple-300">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-green-400 underline font-bold hover:text-white">
              log in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
