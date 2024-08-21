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
  scorePercentage: number,
  maxScorePercentage: number,
  minScorePercentage: number
}



declare type AnswersComponentProps = {
  loading: boolean;
  onSelectAnswer: any,
  type: string,
  incorrectAnswers: string[],
  correctAnswer: string,
  // isAnswerSelected: boolean,
  // setIsAnswerSelected: any,
  selectedAnswer: string
}