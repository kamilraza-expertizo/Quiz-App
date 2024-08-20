"use client"
import AnswersComponent from "@/components/AnswersComponent"
import ProgressBar from "@/components/ProgressBar"
import ScorePredictor from "@/components/ScorePredictor"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { decodeData } from '@/utils';
import { IoIosStar } from "react-icons/io"

const QuizPage = () => {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [questionNo, setQuestionNo] = useState(0)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)

  useEffect(() => {
    // Fetch the JSON data from the public directory
    fetch('/questions.json')
      .then(response => response.json())
      .then((rawData: QuestionType[]) => {
        // Decode the URL-encoded data
        const decodedData = decodeData(rawData);
        setQuestions(decodedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const stars = useMemo(() => {
    const starsCount =
      questions[questionNo]?.difficulty === "easy" ? 1
        : questions[questionNo]?.difficulty === "medium" ? 2
          : questions[questionNo]?.difficulty === "hard" ? 3 : 0


    console.log(starsCount)

    const star = <IoIosStar />
    return Array(starsCount).fill(star)
  }, [questionNo, questions])

  const handleProceedNextQues = () => {
    // console.log("q#", questionNo)
    // console.log("total ques", questions.length)

    if (questionNo == questions.length - 1) {
      localStorage.setItem("tatalScore", JSON.stringify(score))
      router.push("/done")
      return
    };
    setQuestionNo(questionNo + 1)
  }

  return (
    <main className="min-h-screen relative">
      <ProgressBar totalQues={questions.length} attemptedQues={questionNo} />

      <div className="container">
        <div>
          <h1 className="text-3xl font-bold">Question {questionNo + 1} of {questions.length}</h1>
        </div>
        <p className="text-slate-500 mt-1">{questions[questionNo]?.category}</p>

        <div className="py-10">
          <p className="font-semibold sm:text-lg">{questions[questionNo]?.question}</p>

          <div className="flex gap-1 mt-2">
            {stars.map((star) => (
              <span>
                {star}
              </span>
            ))}
          </div>

          <div className="py-10">
            <AnswersComponent
              setScore={setScore}
              type={questions[questionNo]?.type}
              correctAnswer={questions[questionNo]?.correct_answer}
              incorrectAnswers={questions[questionNo]?.incorrect_answers}
              setIsAnswerCorrect={setIsAnswerCorrect}
              isAnswerSelected={isAnswerSelected}
              setIsAnswerSelected={setIsAnswerSelected}
            />
          </div>
        </div>

        <div className="w-full flex-center flex-col gap-3">
          <p className="text-3xl">{isAnswerSelected ? isAnswerCorrect ? "Correct!" : "Sorry!" : ""}</p>

          {isAnswerSelected && <button onClick={handleProceedNextQues} className="my-btn !font-normal mb-16">Next Question</button>}
        </div>
      </div>

      <ScorePredictor totalQues={questions.length} attemptedQues={questionNo} userScore={score} />

    </main>
  )
}

export default QuizPage