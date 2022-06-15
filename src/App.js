import React, { useState, useEffect } from "react";
import "./Style/style.css";
import Start from "./components/Start";
import Question from "./components/Question";
import End from "./components/End";
import Modal from "./components/Modal";
import quizData from "./data/quiz.json";
import axios from "axios";

let interval;

const App = () => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/quizzes");
        setData(res.data);
        console.log(res.data);
      } catch {
        console.log("err");
      }
    };
    getData();
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const quizStartHandler = async (e) => {
    e.preventDefault();
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    const res = await axios.post("http://localhost:4000/api/users/register", {
      username,
      email,
    });
    console.log(res.data);
  };

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  return (
    <div className="App">
      {step === 1 && (
        <Start
          onQuizStart={quizStartHandler}
          onChangeName={onChangeName}
          onChangeEmail={onChangeEmail}
        />
      )}
      {step === 2 && (
        <Question
          data={data[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={data.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />
      )}
      {step === 3 && (
        <End
          results={answers}
          data={data}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
        />
      )}

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          results={answers}
          data={data}
        />
      )}
    </div>
  );
};

export default App;
