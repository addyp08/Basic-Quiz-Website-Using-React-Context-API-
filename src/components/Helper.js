export const shuffler = (question) => {
 const unShuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers
 ]

  return unShuffledAnswers.map((unShuffledAnswer) => 
    ({sort:Math.random(), value:unShuffledAnswer})
  ).sort((a,b)=> a.value - b.value).map((a)=> a.value);
};

export const normalizedata = (backendQuestions) => {
  return backendQuestions.map((backendQuestion) => {
      const incorrectAnswers = backendQuestion.incorrect_answers.map((incorrectAnswer) => 
         decodeURIComponent(incorrectAnswer));
      return {
        correctAnswer:decodeURIComponent(backendQuestion.correct_answer),
        question: decodeURIComponent(backendQuestion.question),
        incorrectAnswers
      };
    })
}