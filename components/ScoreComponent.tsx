"use client";

import { useEffect, useState } from 'react';

const ScoreComponent = () => {
  const [totalScore, setTotalScore] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const score = localStorage.getItem("totalScore")
    const name = localStorage.getItem("username")

    setTotalScore(score);
    setUsername(name);
  }, []);

  return (
    <div className='border-2 border-slate-300 rounded-xl p-10 shadow-md'>
      <div className="text-xl font-medium">
        <h1 className='text-3xl font-bold mb-3'>Result</h1>
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
    </div>
  );
}

export default ScoreComponent;
