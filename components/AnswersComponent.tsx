import { useCallback, useEffect, useState } from "react"

const AnswersComponent = ({
  onSelectAnswer,
  type,
  incorrectAnswers,
  correctAnswer,
  selectedAnswer }: AnswersComponentProps) => {

  const [allAnswers, setAllAnswers] = useState<string[]>([])

  const handleCreateAnswersArray = useCallback(() => {
    const answersArray = incorrectAnswers

    if (answersArray?.includes(correctAnswer)) return;

    let count = 2;
    if (type === "multiple") count = 4;

    const randomPos = Math.floor(Math.random() * count);
    answersArray?.splice(randomPos, 0, correctAnswer)

    setAllAnswers(answersArray)
  },[correctAnswer, incorrectAnswers, type])

  useEffect(() => {
    handleCreateAnswersArray()
  }, [correctAnswer, incorrectAnswers])

  const getAnswerClassNames = useCallback((answer: string): string => {
    const baseClass = "w-full cursor-pointer p-2 border-2 border-black rounded-md text-black bg-slate-200";

    if (answer === selectedAnswer) {
      return `${baseClass} !bg-black text-white`;
    }

    if (selectedAnswer && answer !== correctAnswer) {
      return `${baseClass} !border-slate-300 text-slate-600 bg-slate-100`;
    }

    return baseClass;
  }, [selectedAnswer, correctAnswer]);

  return (
    <div className="flex-center">
      <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5">
        {
          allAnswers?.map((answer, key) => (
            <div key={key} className={getAnswerClassNames(answer)} onClick={() => onSelectAnswer(answer)}>
              {answer}
            </div>
          ))}
      </div>
    </div>
  )
}

export default AnswersComponent