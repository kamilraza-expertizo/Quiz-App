import { memo, useEffect, useState } from "react"

const ProgressBar = memo(({ totalQues, attemptedQues }: ProgressBarProps) => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const barPercentage = (attemptedQues / totalQues) * 100
    setWidth(barPercentage)
  }, [attemptedQues])

  return (
    <div className="w-full fixed top-0 left-0 z-20">
      <div className={`h-2 bg-gray-400 transition-all`} style={{ width: `${width}%` }}>

      </div>
    </div>
  )
})

export default ProgressBar