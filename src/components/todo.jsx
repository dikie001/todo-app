import React from 'react'
import { useNavigate } from 'react-router-dom'

const TodoApp = () => {
    const navigate = useNavigate()
    const logout=()=>{
        navigate("/login")
    }
  return (
    <div class="relative bg-gradient-to-br from-[#1a032a] via-[#3b0764] to-[#0c011e] min-h-screen
     flex flex-col  h-screen items-center">
        <div>
            <h1 className='text-3xl absolute cursor-pointer font-bold top-1 left-1 text-cyan-300'>flex</h1>
            <h1 onClick={logout} className='text-2xl cursor-pointer absolute underline font-semibold top-1 right-2 text-cyan-500'>log out</h1>
        </div>
        <h1 className='text-4xl font-extrabold text-cyan-400 mt-20'>ToDo App</h1>
    </div>

  )
}

export default TodoApp