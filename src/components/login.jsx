import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";

import { auth, googleProvider } from "../config/firebase";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async (e) => {
    e.preventDefault;
    if (!email && !password) {
      toast.error("Both email and password are required!");
      return;
    } else if (!email) {
      toast.error("Email is required!");
      return;
    } else if (!password) {
      toast.error("Password is required!");
      return;
    }

    //Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }
    //password length validation
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters.");
      return;
    }

    const loadingToast = toast.loading("logging in");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
      if (e.code === "auth/user-not-found") {
        toast.error("Account not found!", { id: loadingToast });
        return;
      } else if (e.code === "auth/wrong-password") {
        toast.error("Incorrect password!", { id: loadingToast });
        return;
      }
      else if(e.code ==="auth/invalid-credential"){
        toast.error("Invalid credentials", {id:loadingToast});
        setEmail('')
        setPassword('')
        return;
      }
      else{
        toast.error("Login failed. Please try again",{id:loadingToast})
           return;
      }
    }
    toast.success("logged in successfully!", {
      id: loadingToast,
    });
    navigate("/todo");
  };
  const googleSignIn = async () => {
    const loaderT = toast.loading("Just a moment...");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      toast.error("error signing in!", {
        id: loaderT,
      });
    }
    toast.success("Logged in Successful!", {
      id: loaderT,
    });
    navigate("/todo");
  };
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-black min-h-screen h-screen flex flex-col justify-center items-center ">
      <h1 className="text-3xl text-cyan-200 absolute top-2 left-2 font-bold">
        flex
      </h1>
      <h1 className="text-4xl font-extrabold text-white">Log in</h1>

      <div className="flex flex-col gap-4 mt-4 ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-gray-800 autofill:bg-gray-800 bg-opacity-50 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md shadow-purple-900"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-100 p-3 rounded-lg bg-gray-800 autofill:bg-gray-800 bg-opacity-50 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md shadow-purple-900"
          placeholder="Enter your password"
          required
        />
        <button
          className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold shadow-md shadow-purple-900 hover:bg-purple-800 outline-none"
          onClick={userLogin}
        >
          Log in
        </button>
        <p className="text-sm text-purple-300">
          Don't have an account?{" "}
          <Link to="/">
            <span className="text-green-400 underline font-bold hover:text-white">
              sign up
            </span>
          </Link>
        </p>
        <h1 className="text-2xl font-bold text-white flex flex-col justify-center items-center">
          OR
        </h1>
        <button
          onClick={googleSignIn}
          className="w-full p-3 rounded-lg border-2 border-purple-700 text-white font-bold hover:bg-purple-700"
        >
          <SiGoogle className="inline-block  mx-3 text-cyan-200" size={20} />
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Login;
