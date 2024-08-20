// utils/decode.ts
export const decodeURIComponentSafe = (str: string): string => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str; // Return the original string if decoding fails
  }
};

const removeEntertainmentPrefix = (category: string) =>{
  if(category.startsWith("Entertainment:")) {
    return category.replace("Entertainment:", "")
  }

    return category;
}

export const decodeData = (data: QuestionType[]): QuestionType[] => {
  return data.map(item => ({
    ...item,
    category: removeEntertainmentPrefix(decodeURIComponentSafe(item.category)),
    question: decodeURIComponentSafe(item.question),
    correct_answer: decodeURIComponentSafe(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(decodeURIComponentSafe)
  }));
};
