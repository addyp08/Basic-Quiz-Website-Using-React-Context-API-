import React, { useContext } from 'react'
import Answers from './Answers';
import { Quizcontext } from './context';

function Questions () {
  const [state,dispatch] = useContext(Quizcontext)
  const currentQuestion = state.questions[state.currentQuestionIndex]
  return (
    <div>
        <div className='question'>{currentQuestion.question}</div>
        <div className='answers'>
        {state.answers.map((answer,index) => 
          (<Answers answerText={answer}
           key={index} 
           index={index}
           currentAnswer = {state.currentAnswer}
           correctAnswer = {currentQuestion.correctAnswer} 
           onSelectAnswer={(answerText)=> dispatch({type:"SELECT_ANSWER", payload:answerText})} />))}
        </div>
    </div>
  )
}

export default Questions;
