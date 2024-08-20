declare type QuestionType = {
  category: string,
  type: string
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[]
}

declare type ProgressBarProps = {
  totalQues: number,
  attemptedQues: number
}

declare type ScorePredictorProps = {
  totalQues: number,
  attemptedQues: number
  userScore: number
}



declare type AnswersComponentProps = {
  setScore: any,
  type: string,
  incorrectAnswers: string[],
  correctAnswer: string,
  setIsAnswerCorrect: any
  isAnswerSelected: boolean,
  setIsAnswerSelected: any
}