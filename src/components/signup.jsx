import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogle } from "react-icons/si";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = async () => {
    const loadingToast = toast.loading("Signing you up...");
    
    //  Validate fields
    if (!email || !password) {
      toast.error("Please fill out all fields", { id: loadingToast });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format!", { id: loadingToast });
      return;
    }

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters!", { id: loadingToast });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!", { id: loadingToast });

      setTimeout(() => {
        toast.success("You are now logged in!");
        navigate("/todo");
      }, 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use!", { id: loadingToast });
      } else {
        toast.error(error.message || "Signup failed. Try again.", { id: loadingToast });
      }
    }
  };

  const handleGoogleSignup = async () => {
    const loadingToast = toast.loading("Signing you up with Google...");
    
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up successfully!", { id: loadingToast });
      navigate("/todo");
    } catch (error) {
      toast.error(error.message || "Google signup failed.", { id: loadingToast });
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-black min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold text-white">Create an Account</h1>

      <div className="flex flex-col gap-4 mt-4">
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-100 p-3 rounded-lg bg-gray-800 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md"
        />

        <input
          type="password"
          value={password}
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md"
        />

        <button
          className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-800"
          onClick={handleSignup}
        >
          Sign up
        </button>

        <h1 className="text-2xl font-bold text-white text-center">OR</h1>

        <button
          onClick={handleGoogleSignup}
          className="w-full p-3 rounded-lg border-2 border-purple-700 text-white font-bold hover:bg-purple-700 flex items-center justify-center"
        >
          <SiGoogle className="mr-3 text-cyan-200" size={20} />
          Sign up with Google
        </button>

        <p className="text-sm text-purple-300">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-green-400 underline font-bold hover:text-white">
              Log in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
