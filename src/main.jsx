import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Quizprovider } from './components/context.jsx'

createRoot(document.getElementById('root')).render(
    <Quizprovider>
    <App />
    </Quizprovider>,
)
