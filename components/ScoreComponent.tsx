"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ScoreComponent = () => {
  const router = useRouter()
  const [totalScore, setTotalScore] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const score = localStorage.getItem("totalScore")
    const name = localStorage.getItem("username")

    if (!name || !score) {
      router.push("/")
      return;
    }

    setTotalScore(score);
    setUsername(name);
  }, []);

  return (
    <div className="text-2xl font-medium">
      <p>
        <span className="text-[#777777]">Name:{" "}</span>
        {username || "No name available"}
      </p>

      <p>
        <span className="text-[#777777]">
          Total Score:{" "}
        </span>
        <span className="text-primary">{totalScore || "No score available"}</span>
      </p>
    </div>
  );
}

export default ScoreComponent;
