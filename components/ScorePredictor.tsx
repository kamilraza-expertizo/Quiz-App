import { useEffect, useState } from "react"

const ScorePredictor = ({
  scorePercentage,
  maxScorePercentage,
  minScorePercentage }: ScorePredictorProps) => {

  return (
    <div className="w-full fixed bottom-0 left-0 z-20 sm:py-4 py-2 px-5 bg-gray-300 ">
      <div className="w-full flex justify-between items-center">
        <span>
          Score: {scorePercentage}%
        </span>


        <span>
          Max Score: {maxScorePercentage}%
        </span>
      </div>
      <div className="border border-black rounded-md  overflow-hidden bg-white">
        <div className="relative h-8">
          <div
            className="absolute top-0 left-0 z-30 bg-slate-600 h-full w-full transition-all"
            style={{ width: `${scorePercentage}%` }}
          >
          </div>
          <div
            className="absolute top-0 left-0 z-20 bg-black h-full w-full transition-all"
            style={{ width: `${minScorePercentage}%` }}>
          </div>
          <div
            className="absolute top-0 left-0 z-10 bg-slate-300 h-full w-full transition-all"
            style={{ width: `${maxScorePercentage}%` }}
          >
          </div>
        </div>
      </div>
    </div >
  )
}

export default ScorePredictor