import { useNavigate } from "react-router-dom";
import { useState } from "react";
import getQuestions from "../src/services/getQuestions";
import "./App.css";

export default function App() {
  const [gameOptions, setGameOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  
  // Function to handle changes in game options select inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameOptions((prevGameOptions) => ({
      ...prevGameOptions,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  // Function to navigate to the quiz page and fetch questions
  const goToQuizPage = async () => {
    setLoading(true);
    try {
      const questions = await getQuestions(gameOptions);
      if (questions && questions.length > 0) {
        navigate("/quiz", { state: { gameOptions, questions } });
      } else {
        alert("Failed to fetch questions. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render the App component with quiz title, game options selectors, and start quiz button
  return (
    <main>
      <h1 className="quiz-title">Quizzical</h1>
      <p className="quiz-text">Test your knowledge</p>

      <div className="gameOptions-container">
        <div className="select-container">
          <label className="custom-label" htmlFor="category">
            Category:
          </label>
          <select
            name="category"
            id="category"
            className="custom-select"
            value={gameOptions.category}
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </select>
        </div>

        <div className="select-container">
          <label className="custom-label" htmlFor="difficulty">
            Difficulty:
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="custom-select"
            value={gameOptions.difficulty}
            onChange={handleChange}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="select-container">
          <label className="custom-label" htmlFor="type">
            Type of questions:
          </label>
          <select
            name="type"
            id="type"
            className="custom-select"
            value={gameOptions.type}
            onChange={handleChange}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
      </div>

      <button className="btn-start" onClick={goToQuizPage} disabled={loading}>
        {loading ? "Loading..." : "Start quiz"}
      </button>
    </main>
  );
}
