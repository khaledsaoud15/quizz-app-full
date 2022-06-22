import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatTime } from "../utils";

const End = ({ results, data, onReset, onAnswersCheck, time, username }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const res = await axios.get("http://localhost:4000/api/results");
      console.log(res.data);
    };
    getResult();
  }, []);

  const onSubmitAnswers = async () => {
    const res = await axios.post("http://localhost:4000/api/results/result", {
      username,
      result: correctAnswers,
    });
    console.log(res.data);
    setIsShown(false);
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>
            {correctAnswers} of {data.length}
          </p>
          <p>
            <strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong>
          </p>
          <p>
            <strong>Your time:</strong> {formatTime(time)}
          </p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>
            Check your answers
          </button>
          <button className="button is-success" onClick={onReset}>
            Try again
          </button>
          {isShown ? (
            <button className="button is-success" onClick={onSubmitAnswers}>
              Submit the results
            </button>
          ) : (
            <p>Data Submitted</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default End;
