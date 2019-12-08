import React from "react";
import "./Answer.css";
const Answer = props => {
  console.log("answer", props.answer);
  return (
    <div id="result">
      <p className="question">
        Which of all StarWars movies has longest opening crawl
      </p>
      <p className="answer">{props.answer.openingCrawl}</p>
      <p className="question">
        what character (person) appeared in the most of starWars films
      </p>
      <p className="answer">{props.answer.personAppeared}</p>
      <p className="question">
        which species appeared in the most number of starWars films
      </p>
      <p className="answer">{props.answer.mostSpeciesAppeared}</p>
      <p className="question">
        what planet in starWars universe provided largest number of vehicle
        pilots.
      </p>
      <p className="answer">{props.answer.plantWithPilots}</p>
    </div>
  );
};
export default Answer;
