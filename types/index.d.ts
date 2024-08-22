type QuestionType = {
  category: string,
  type: string
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

type ProgressBarProps = {
  totalQues: number,
  attemptedQues: number
}

type ScoreDetailsType = {
  scorePercentage: number,
  maxScorePercentage: number,
  minScorePercentage: number
}

type AnswersComponentProps = {
  onSelectAnswer: any,
  type: string,
  incorrectAnswers: string[],
  correctAnswer: string,
  selectedAnswer: string
}

type Difficulty = "easy" | "medium" | "hard";