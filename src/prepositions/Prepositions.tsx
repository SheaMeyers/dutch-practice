import { useState } from 'react';
import "./Prepositions.css";

interface Question {
  word: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
    {
        word: 'aanbeiden',
        options: ['op', 'aan', 'bij', 'met'],
        answer: 'aan'
    },
    {
        word: 'aandringen',
        options: ['op', 'aan', 'bij', 'met'],
        answer: 'op'
    },
    {
        word: 'aankleden',
        options: ['op', 'aan', 'bij', 'met'],
        answer: 'met'
    }
]

const Prepositions = () => {

    const [questionNumber, setQuestionNumber] = useState<number>(0);

  return (
    <div className="Prepositions">
      <p>Choose the correct preposition for the verb</p>
      <p className="h3 Verb">{questions[questionNumber].word}</p>
      <div className="Choices">
        {questions[questionNumber].options.map(option => 
            <button 
                className="btn btn-light Choices__Button" 
                type="button"
            >
                {option}
            </button>
        )}
      </div>
      <div className="Navigator">
            <button
                disabled={questionNumber === 0}
                className="btn btn-secondary" 
                type="button"
                onClick={() => setQuestionNumber(questionNumber-1)}
            >
                Previous
            </button>
            <button
                disabled={questionNumber === (questions.length-1)}
                className="btn btn-primary" 
                type="button"
                onClick={() => setQuestionNumber(questionNumber+1)}
            >
                Next
            </button>
      </div>
    </div>
  );
};

export default Prepositions
