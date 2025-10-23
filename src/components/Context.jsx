import { createContext, useReducer } from "react";
import { normalizedata, shuffler } from "./Helper";

const initialState = {
    currentQuestionIndex:0,
    questionLimit:false,
    questions:[],
    answers:[],
    currentAnswer: '',
    correctAnswerCount: 0,
    error:null,
};

export const reducer = (state,action) => {
    switch(action.type){
        case "SELECT_ANSWER": {
            const correctAnswerCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer ? state.correctAnswerCount+1 : state.correctAnswerCount;

            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswerCount:correctAnswerCount
            }
        }
    case "NEXT_QUESTION":{
        const questionLimit = state.currentQuestionIndex === state.questions.length-1;
        const currentQuestionIndex = questionLimit ? state.currentQuestionIndex : state.currentQuestionIndex+1; 
        const answers = questionLimit ? [] : shuffler(state.questions[currentQuestionIndex]);
        return{...state,currentQuestionIndex:currentQuestionIndex,questionLimit,answers:answers,currentAnswer:''}
    };
    case "RESTART":{
        return initialState;
    }
    case "LOADED_QUESTIONS": {
        const normalizeddata = normalizedata(action.payload)
        return {
            ...state,
            questions:normalizeddata,
            answers: shuffler(normalizeddata[0])
        }
    }
    case "ERROR":{
        return{
            ...state,
            error:action.payload
        }
    }
    case "default":
    return state;
}
};

export const Quizcontext = createContext();

export const Quizprovider = ({children}) => {
    const value = useReducer(reducer,initialState);
    return <Quizcontext.Provider value={value}>{children}</Quizcontext.Provider> 
}

