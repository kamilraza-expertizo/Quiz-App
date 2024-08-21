import { useEffect, useState } from "react"
import Skeleton from "./Skeleton"

const AnswersComponent = ({
  loading,
  onSelectAnswer,
  type,
  incorrectAnswers,
  correctAnswer,
  selectedAnswer }: AnswersComponentProps) => {

  const [allAnswers, setAllAnswers] = useState<string[]>([])


  const handleCreateAnswersArray = () => {
    const answersArray = incorrectAnswers

    if (answersArray?.includes(correctAnswer)) return;

    let count = 2;
    if (type === "multiple") count = 4;

    const randomPos = Math.floor(Math.random() * count);
    answersArray?.splice(randomPos, 0, correctAnswer)

    setAllAnswers(answersArray)
  }

  useEffect(() => {
    handleCreateAnswersArray()
  }, [correctAnswer, incorrectAnswers])

  return (
    <div className="flex-center">
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5">
        {loading || !allAnswers?.length 
        ?  
        <>
          <div className="relative w-full h-10">
            <Skeleton/>
          </div>
          <div className="relative w-full h-10">
            <Skeleton/>
          </div>
          <div className="relative w-full h-10">
            <Skeleton/>
          </div>
          <div className="relative w-full h-10">
            <Skeleton/>
          </div>
        </>
        :
          allAnswers?.map((answer, key) => (
            <div key={key} className={`
            ${answer === selectedAnswer && "!bg-black text-white"}
            ${selectedAnswer && answer !== correctAnswer && "!border-slate-300 text-slate-600 bg-slate-100"}
            w-full cursor-pointer p-2 border-2 border-black rounded-md text-black bg-slate-200`} onClick={() => onSelectAnswer(answer)}>
              {answer}
            </div>
          ))}
      </div>
    </div>
  )
}

export default AnswersComponent