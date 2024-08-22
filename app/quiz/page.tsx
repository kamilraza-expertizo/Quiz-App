"use client"
import AnswersComponent from "@/components/AnswersComponent"
import ProgressBar from "@/components/ProgressBar"
import ScorePredictor from "@/components/ScorePredictor"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { decodeData } from '@/utils';
import { IoIosStar } from "react-icons/io"
import Skeleton from "@/components/Skeleton"
import AnswersSkeleton from "@/components/AnswersSkeleton"

const QuizPage:React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [score, setScore] = useState<number>(0)
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [questionNo, setQuestionNo] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [scoreDetails, setScoreDetails] = useState<ScoreDetailsType>({
    scorePercentage: 0,
    maxScorePercentage: 100,
    minScorePercentage: 0
  })

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const rawData = await response.json();
        const decodedData = decodeData(rawData);
        setQuestions(decodedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSetSelectedAnswer = useCallback((answer: string) => {
    if (selectedAnswer) return

    setSelectedAnswer(answer)

    let currScore = score; 

    if (answer === questions[questionNo]?.correct_answer) {
      setScore((prevScore: number) => (prevScore + 1))
      currScore++
    }

    const totalQues = questions?.length;
    const attemptedQues = questionNo;
    const scorePercentage = ((currScore / totalQues) * 100)
    const maxScorePercentage = +(((currScore + (totalQues - (attemptedQues + 1))) / totalQues) * 100).toFixed(2)
    const minScorePercentage = +((currScore / (attemptedQues + 1)) * 100).toFixed(2)

    setScoreDetails({
      scorePercentage,
      maxScorePercentage,
      minScorePercentage,
    });
  },[selectedAnswer, score, questions, questionNo])

  const handleProceedNextQues = () => {
    if (questionNo == questions.length - 1) {

      localStorage.setItem("totalScore", JSON.stringify(score))
      router.push("/done")
      return
    };
    setSelectedAnswer("")
    setQuestionNo(prev => prev + 1)
  }

  const currentQues = useMemo(()=>{
  return questions[questionNo]; 
  },[questions, questionNo])

  const starClasses = useMemo(() => {
    if (!currentQues) return ["text-slate-300", "text-slate-300", "text-slate-300"];
  
    const difficultyClasses = {
      easy: ["text-black", "text-slate-300", "text-slate-300"],
      medium: ["text-black", "text-black", "text-slate-300"],
      hard: ["text-black", "text-black", "text-black"]
    };
  
    const difficulty: Difficulty = currentQues.difficulty as Difficulty;
  
    return difficultyClasses[difficulty] || ["text-slate-300", "text-slate-300", "text-slate-300"];
  }, [currentQues]);
  
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
              <span>{currentQues?.category}</span>
            </div>
                }
            <div className="py-5">
              {isLoading ?
              <div className="relative w-full max-w-[600px] h-8">
                <Skeleton/>
              </div>
              :    
              <p className="font-semibold sm:text-lg">{currentQues?.question}</p>
            }

            <div className="flex gap-1 mt-2">
              {starClasses.map((starClass, index)=>(
                <IoIosStar key={index} className={starClass} /> 
              ))}
            </div>

            <div className="py-5">
              {
                isLoading ?
                  <AnswersSkeleton/>
                 : 
                  <AnswersComponent
                    onSelectAnswer={handleSetSelectedAnswer}
                    type={currentQues?.type}
                    correctAnswer={currentQues?.correct_answer}
                    incorrectAnswers={currentQues?.incorrect_answers}
                    selectedAnswer={selectedAnswer}
                  />
              }

            </div>
          </div>

          <div className="w-full flex-center flex-col gap-3">
            <p className="text-3xl">{selectedAnswer ? currentQues.correct_answer === selectedAnswer ? "Correct!" : "Sorry!" : ""}</p>

            {selectedAnswer && <button onClick={handleProceedNextQues} className="my-btn !font-normal">Next Question</button>}
          </div>
        </div>

        <ScorePredictor 
          scorePercentage={scoreDetails.scorePercentage}
          maxScorePercentage={scoreDetails.maxScorePercentage}
          minScorePercentage={scoreDetails.minScorePercentage}
        />
      </div>
    </main>
  )
}

export default QuizPage