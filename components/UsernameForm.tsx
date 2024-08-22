"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const UsernameForm:React.FC = () => {
  const router = useRouter()
  const [name, setName] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSaveName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim().length < 3) {
      setError("Name is required and must be minimum 3 characters or more.")
      return;
    }

    try {
      localStorage.setItem("username", name);
      router.push("/quiz");
    } catch (err) {
      setError("Unable to save name. Please try again.");
    }
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