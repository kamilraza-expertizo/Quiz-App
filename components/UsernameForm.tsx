"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const UsernameForm = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleError = (msg: string) => {
    setError(msg)
    setTimeout(() => {
      setError("")
    }, 3000);
  }

  const handleSaveName = (e: any) => {
    e.preventDefault()

    if (name.length < 3) {
      handleError("Name is required and must be minimum 3 characters or more.")
      return;
    }
    localStorage.setItem("username", name)
    router.push("/quiz")
  }

  return (
    <form onSubmit={handleSaveName} className="w-[400px] max-w-full" >
      <div className="flex flex-col my-3">
        <label htmlFor="name" className="text-slate-600">Your Name:</label>

        <input
          autoFocus
          type="text"
          name="name"
          id="name"
          placeholder="please enter your name"
          className="px-3 py-2 border border-slate-400 rounded-md outline-primary"
          value={name}
          onChange={(e) => setName(e.target.value)} />

        <p className="text-red-600">{error}</p>

        <input type="submit" className="my-btn uppercase" />
      </div>

    </form>
  )
}

export default UsernameForm