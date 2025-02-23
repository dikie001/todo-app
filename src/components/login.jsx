import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { SiGoogle } from 'react-icons/si'
import { signInWithEmailAndPassword ,signInWithPopup} from 'firebase/auth'
import {toast} from 'react-hot-toast'

import { auth, googleProvider } from '../config/firebase'
import { useState } from 'react'


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const userLogin = async ()=>{
    const loadingToast = toast.loading("logging in")
    try{
      await signInWithEmailAndPassword(auth, username, password)
    }catch(e){
      console.log(e)
      toast.error("wrong credentials");
      return;
    }
    toast.success("logged in successfully!",{
      id:loadingToast,
  });
    navigate("/todo")
  }
  const googleSignIn = async()=>{
    const loaderT = toast.loading("Just a moment...")
    try{
      await signInWithPopup(auth, googleProvider)
    }catch(e){
      toast.error("error signing in!", {
        id:loaderT
      })
    
    }
    toast.success("Logged in Successful!",{
      id:loaderT
    })
    navigate("/todo")
  }
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-black min-h-screen h-screen flex flex-col justify-center items-center ">
   <h1 className="text-2xl text-cyan-200 absolute top-2 left-2 font-bold">flex</h1>
    <h1 className="text-4xl font-extrabold text-white">Log in</h1>

    <div className="flex flex-col gap-4 mt-4 ">
      <input
        type="text"
        onChange={(e)=>setUsername(e.target.value)}
        placeholder="Enter your username or email"
        className="w-full p-3 rounded-lg bg-gray-800 autofill:bg-gray-800 bg-opacity-50 border border-purple-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-md shadow-purple-900"
      />

   

      <input
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
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
        Don't have an account? <Link to="/"><span className="text-green-400 underline font-bold hover:text-white">sign up</span></Link>
      </p>
      <h1 className="text-2xl font-bold text-white flex flex-col justify-center items-center">
                OR
              </h1>
              <button onClick={googleSignIn} className="w-full p-3 rounded-lg border-2 border-purple-700 text-white font-bold hover:bg-purple-700">
                <SiGoogle
                  className="inline-block  mx-3 text-cyan-200"
                  size={20}
                  
                />
                Sign in with google
              </button>
           
              
                
              
      
    </div>
  </div>
  )
}

export default Login