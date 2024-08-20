import { useEffect, useState } from "react"

const ProgressBar = ({ totalQues, attemptedQues }: ProgressBarProps) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const barPercentage = (attemptedQues / totalQues) * 100
    setWidth(barPercentage)
  }, [attemptedQues])

  return (
    <div className="w-full relative transition-all">
      <div className={`h-2 bg-gray-400`} style={{ width: `${width}vw` }}>

      </div>
    </div>
  )
}

export default ProgressBar