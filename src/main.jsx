
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NotFound from './NotFound.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import './index.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="quiz" element={<Quiz />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)
