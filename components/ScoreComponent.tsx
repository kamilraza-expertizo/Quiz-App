"use client";

import { useEffect, useState } from 'react';

const ScoreComponent = () => {
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const score = +(localStorage.getItem("totalScore") ?? 0);
    const name = localStorage.getItem("username") ?? "No name available";

    setTotalScore(+score);
    setUsername(name);
  }, []);

  return (
    <div className='border-2 border-slate-300 rounded-xl p-10 shadow-md'>
      <div className="text-xl font-medium flex flex-col gap-2">
        <h1 className='text-3xl font-bold mb-3'>Result</h1>
        <p>
          <span className="text-[#777777]">Name:{" "}</span>
          {username}
        </p>

        <p>
          <span className="text-[#777777]">
            Total Score:{" "}
          </span>
          <span className="text-primary">{totalScore}</span>
        </p>

        <p>
          <span className="text-[#777777]">
            Status:{" "}
          </span>
          <span className="text-primary">{totalScore ? totalScore > 10 ? 
          <span className='text-green-600'>Passed</span>
          :
          <span className='text-red-600'>Failed</span>
          : "No score available"}</span>
        </p>
      </div>
    </div>
  );
}

export default ScoreComponent;
