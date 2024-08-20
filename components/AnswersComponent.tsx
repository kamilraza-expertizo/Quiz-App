import { useEffect, useState } from "react"
import Skeleton from "./Skeleton"

const AnswersComponent = ({
  loading,
  onSelectAnswer,
  type,
  incorrectAnswers,
  correctAnswer,
  setIsAnswerCorrect,
  isAnswerSelected,
  setIsAnswerSelected, 
  selectedAnswer }: AnswersComponentProps) => {

  const [allAnswers, setAllAnswers] = useState<string[]>([])


  const handleCreateAnswersArray = () => {
    const answersArray = incorrectAnswers

    if (answersArray?.includes(correctAnswer)) return;

    let count = 2;
    if (type === "multiple") count = 4;
    // console.log("count==> ", count)
    const randomPos = Math.floor(Math.random() * count);
    // console.log("random position==> ", randomPos)
    answersArray?.splice(randomPos, 0, correctAnswer)

    setIsAnswerSelected(false)
    setIsAnswerCorrect(false)
    setAllAnswers(answersArray)
  }

  useEffect(() => {
    handleCreateAnswersArray()
  }, [correctAnswer, incorrectAnswers])

  return (
    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        {loading || allAnswers?.length === 0 
        ?  
        <>
          <div className="relative w-full max-w-[300px] h-10">
            <Skeleton/>
          </div>
          <div className="relative w-full max-w-[300px] h-10">
            <Skeleton/>
          </div>
          <div className="relative w-full max-w-[300px] h-10">
            <Skeleton/>
          </div>
          <div className="relative w-full max-w-[300px] h-10">
            <Skeleton/>
          </div>
        </>
        :
          allAnswers?.map((answer, key) => (
            <div key={key} className={`
            ${answer === selectedAnswer && "!bg-black text-white"}
            ${isAnswerSelected ? answer === correctAnswer || answer === selectedAnswer ? "border-black" : "!border-slate-300 text-slate-600 bg-slate-100" : ""}
            max-w-[300px] cursor-pointer p-2 border-2 border-black rounded-md bg-slate-200`} onClick={() => onSelectAnswer(answer)}>
              {answer}
            </div>
          ))}
      </div>
    </div>
  )
}

export default AnswersComponent