import { useEffect, useState } from "react"

const AnswersComponent = ({
  setScore,
  type,
  incorrectAnswers,
  correctAnswer,
  setIsAnswerCorrect,
  isAnswerSelected,
  setIsAnswerSelected }: AnswersComponentProps) => {

  const [allAnswers, setAllAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState("")


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

  const handleSetSelectedAnswer = (answer: string) => {
    if (isAnswerSelected) return
    setIsAnswerSelected(true)
    setSelectedAnswer(answer)
    if (answer === correctAnswer) {
      setIsAnswerCorrect(true);
      setScore((prevScore: number) => (prevScore + 1))
    }
  }

  useEffect(() => {
    handleCreateAnswersArray()
  }, [correctAnswer, incorrectAnswers])

  return (


    <div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        {allAnswers?.map((answer, key) => (
          <div className={`
          ${answer === selectedAnswer && "!bg-black text-white"}
          ${isAnswerSelected ? answer === correctAnswer || answer === selectedAnswer ? "border-black" : "!border-slate-300 text-slate-600 bg-slate-100" : ""}
          max-w-[300px] cursor-pointer p-2 border-2 border-black rounded-md bg-slate-200`} onClick={() => handleSetSelectedAnswer(answer)}>
            {answer}
          </div>
        ))}
      </div>

      <div>
      </div>
    </div>
  )
}

export default AnswersComponent