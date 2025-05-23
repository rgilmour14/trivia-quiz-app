import './App.css';
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import ResultsSection from './components/ResultsSection';


export default function App() {
  const [step, setStep] = useState('home');
  const [userData, setUserData] = useState({
    name: '',
    category: '',
    difficulty: '',
  });
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const startQuiz = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${userData.category}&difficulty=${userData.difficulty}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results.length === 0) throw new Error("No questions found.");

      const question = data.results[0];
      const allAnswers = [
        ...question.incorrect_answers,
        question.correct_answer
      ];
      const shuffledAnswers = allAnswers
        .map((ans) => decodeHtml(ans))
        .sort(() => Math.random() - 0.5);

      setQuestionData({
        question: decodeHtml(question.question),
        correct_answer: decodeHtml(question.correct_answer),
        answers: shuffledAnswers
      });
      setStep('question');
      setApiError(null);
    } catch (err) {
      console.error(err);
      setApiError('Failed to fetch question. Please try again.');
    }
  };

  const checkAnswer = () => {
    const isCorrect = selectedAnswer === questionData.correct_answer;
    setResult({ isCorrect, correctAnswer: questionData.correct_answer });
    setStep('result');
  };

  const resetQuiz = () => {
    setStep('home');
    setUserData({ name: '', category: '', difficulty: '' });
    setQuestionData(null);
    setSelectedAnswer('');
    setResult(null);
    setApiError(null);
  };

  return (
    <>
      {step === 'home' && (
        <HomePage
          userData={userData}
          setUserData={setUserData}
          onSubmit={startQuiz}
        />
      )}
      {step === 'question' && (
        <QuestionForm
          questionData={questionData}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          onSubmit={checkAnswer}
          apiError={apiError}
        />
      )}
      {step === 'result' && (
        <ResultsSection
          name={userData.name}
          result={result}
          onTryAgain={resetQuiz}
        />
      )}
    </>
  );
}