"use client"
import AnswersComponent from "@/components/AnswersComponent"
import ProgressBar from "@/components/ProgressBar"
import ScorePredictor from "@/components/ScorePredictor"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { decodeData } from '@/utils';
import { IoIosStar } from "react-icons/io"
import Skeleton from "@/components/Skeleton"

const QuizPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState<number>(0)
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [questionNo, setQuestionNo] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [scorePercentage, setScorePercentage] = useState<number>(0)
  const [maxScorePercentage, setMaxScorePercentage] = useState<number>(100)
  const [minScorePercentage, setMinScorePercentage] = useState<number>(0)

  useEffect(() => {
    setIsLoading(true)
    fetch('/questions.json')
      .then(response => response.json())
      .then((rawData: QuestionType[]) => {
        const decodedData = decodeData(rawData);
        setQuestions(decodedData);
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(()=>{
        setIsLoading(false)
      })
  }, []);

  const handleSetSelectedAnswer = (answer: string) => {
    let currScore = score; 
    const totalQues = questions?.length;
    const attemptedQues = questionNo;
    const correctAnswer = questions[questionNo]?.correct_answer;
    if (selectedAnswer) return
    setSelectedAnswer(answer)
    if (answer === correctAnswer) {
      setScore((prevScore: number) => (prevScore + 1))
      currScore++
    }

    const scorePerc = ((currScore / totalQues) * 100)
    const maxScorePerc = +(((currScore + (totalQues - (attemptedQues + 1))) / totalQues) * 100).toFixed(2)
    const minScorePerc = +((currScore / (attemptedQues + 1)) * 100).toFixed(2)

    setScorePercentage(scorePerc)
    setMaxScorePercentage(maxScorePerc)
    setMinScorePercentage(minScorePerc)
  }

  const handleProceedNextQues = () => {
    if (questionNo == questions.length - 1) {

      localStorage.setItem("totalScore", JSON.stringify(score))
      router.push("/done")
      return
    };
    setSelectedAnswer("")
    setQuestionNo(questionNo + 1)
  }



  return (
    <main className="flex-center">
      <div className="max-w-[800px] w-full">
        <ProgressBar totalQues={questions.length} attemptedQues={questionNo} />

        <div className="container mb-16">
          <div>
            <h1 className="text-3xl font-bold">Question {questionNo + 1} of {questions.length}</h1>
          </div>

          {
            isLoading 
            ? 
            <div className="relative max-w-full w-[300px] h-8  mt-1">
              <Skeleton/>
            </div>
            :
            <div className="text-slate-500 mt-1">
              Entertainment:{" "}
              <span>{questions[questionNo]?.category}</span>
            </div>
                }
            <div className="py-5">
              {isLoading ?
              <div className="relative w-full max-w-[600px] h-8">
                <Skeleton/>
              </div>
              :    
              <p className="font-semibold sm:text-lg">{questions[questionNo]?.question}</p>
            }

            <div className="flex gap-1 mt-2">
              <IoIosStar className={`text-black`} /> 
              <IoIosStar className={`${questions[questionNo]?.difficulty === "easy" ? "text-slate-300": "text-black"}`} /> 
              <IoIosStar className={`${questions[questionNo]?.difficulty === "easy" || questions[questionNo]?.difficulty === "medium" ? "text-slate-300": "text-black"}`} />
            </div>

            <div className="py-5">
              <AnswersComponent
                loading={isLoading}
                onSelectAnswer={handleSetSelectedAnswer}
                type={questions[questionNo]?.type}
                correctAnswer={questions[questionNo]?.correct_answer}
                incorrectAnswers={questions[questionNo]?.incorrect_answers}
                selectedAnswer={selectedAnswer}
              />
            </div>
          </div>

          <div className="w-full flex-center flex-col gap-3">
            <p className="text-3xl">{selectedAnswer ? questions[questionNo].correct_answer === selectedAnswer ? "Correct!" : "Sorry!" : ""}</p>

            {selectedAnswer && <button onClick={handleProceedNextQues} className="my-btn !font-normal">Next Question</button>}
          </div>
        </div>

        <ScorePredictor 
          scorePercentage={scorePercentage}
          maxScorePercentage={maxScorePercentage}
          minScorePercentage={minScorePercentage}
        />
      </div>
    </main>
  )
}

export default QuizPage