import React from 'react'

function Answers({answerText,onSelectAnswer,index,currentAnswer,correctAnswer}) {
  const letters = ['A','B','C','D'];
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer = currentAnswer === answerText && answerText !== correctAnswer;
  const isCorrectAnswerClass = isCorrectAnswer ? 'correct-answer' : '';
  const isWrongAnswerClass = isWrongAnswer ? 'wrong-answer' : '';
  const isDisabledClass = currentAnswer ? 'disabled-answer' : '';
  return (
    <div className={`answer ${isCorrectAnswerClass} ${isWrongAnswerClass} ${isDisabledClass}` } onClick={()=> onSelectAnswer(answerText)}>
      <div className='answer-letter'>{letters[index]}</div>
      <div className='answer-text'>{answerText}</div>
    </div>
  )
}

export default Answers;