import { useContext, useEffect, useState } from 'react'
import './App.scss'
import './index.scss'
import Questions from './components/questions'
import { Quizcontext } from './components/context'

function App() {
  const [state,dispatch] = useContext(Quizcontext);
  const apiUrl = "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple&encode=url3986";
  const nextQuestion = () => {
    dispatch({type:"NEXT_QUESTION"});
  }
  useEffect(()=> {
    if(state.questions.length > 0 || state.error){
      return;
    }
    fetch(apiUrl)
    .then((res)=> res.json())
    .then((data)=> {console.log("data",data); dispatch({type:"LOADED_QUESTIONS", payload:data.results})})
    .catch((err)=> {
      dispatch({type:"ERROR",payload:err.message})
    });
  });

  return (
    <div className='quiz'>
      {state.error &&(
        <div className='results'>
          <div className='congratulations'>ERROR</div>
          <div className='results-info'>
            <div>{state.error}</div>
        </div>
        </div>
      )}
      {state.questionLimit &&(
        <div className='results'>
          <div className='congratulations'>Congratulations</div>
          <div className='results-info'>
            <div>You have completed the quiz</div>
          <div>You have got {state.correctAnswerCount} out of {state.questions.length} correct</div>
        </div>
        <div className='next-button' onClick={()=>dispatch({type:"RESTART"})}>Restart</div>
        </div>
      )}
      {!state.questionLimit && state.questions.length > 0 &&(
        <div>
      <div className='score'>Question {state.currentQuestionIndex+1}/{state.questions.length}</div>
      <div><Questions /></div>
        <button className='next-button' onClick={nextQuestion}>Next Question</button>
      </div>
      )}
    </div>
  )
}

export default App
