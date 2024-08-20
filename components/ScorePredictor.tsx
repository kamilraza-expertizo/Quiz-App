import { useEffect, useState } from "react"

const ScorePredictor = ({
  totalQues,
  attemptedQues,
  userScore }: ScorePredictorProps) => {

  const [scorePercentage, setScorePercentage] = useState(0)
  const [maxScorePercentage, setMaxScorePercentage] = useState(0)
  const [minScorePercentage, setMinScorePercentage] = useState(0)

  useEffect(() => {
    const scorePerc = attemptedQues == 0 ? 0 : +((userScore / attemptedQues) * 100).toFixed(2)
    const maxScorePerc = ((userScore + (totalQues - attemptedQues)) / totalQues) * 100
    const minScorePerc = ((userScore / totalQues) * 100)


    setScorePercentage(scorePerc)
    setMaxScorePercentage(maxScorePerc)
    setMinScorePercentage(minScorePerc)
  }, [attemptedQues, totalQues])


  return (
    <div className="w-full absolute bottom-0 left-0 py-5 px-10">
      <div className="w-full flex justify-between items-center">
        <span>
          Score: {scorePercentage}%
        </span>


        <span>
          Max Score: {maxScorePercentage}%
        </span>
      </div>
      <div className="border border-black rounded-md  overflow-hidden">
        <div className="w-screen relative h-8">
          <div
            className="absolute top-0 left-0 z-30 bg-black h-full"
            style={{ width: `${minScorePercentage}vw` }}>
          </div>
          <div
            className="absolute top-0 left-0 z-20 bg-slate-600 h-full"
            style={{ width: `${scorePercentage}vw` }}
          >
          </div>
          <div
            className="absolute top-0 left-0 z-10 bg-slate-300 h-full"
            style={{ width: `${maxScorePercentage}vw` }}
          >
          </div>
        </div>
      </div>
    </div >
  )
}

export default ScorePredictor