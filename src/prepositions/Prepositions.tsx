import { useReducer } from 'react';
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

type PrepositionsState = {
  questionNumber: number;
  answer: string;
};

type DispatcherActions =
  | { type: 'previousQuestion' }
  | { type: 'nextQuestion' }
  | { type: 'giveAnswer', payload: string };

const initialState: PrepositionsState = {
    questionNumber: 0,
    answer: ''
}

const prepositionsReducer = (state: PrepositionsState, action: DispatcherActions): PrepositionsState => {
    switch(action.type) {
        case 'previousQuestion':
            return { questionNumber: state.questionNumber-1, answer: '' }
        case 'nextQuestion':
            return { questionNumber: state.questionNumber+1, answer: '' }
        case 'giveAnswer':
            return { questionNumber: state.questionNumber, answer: action.payload }
        default:
            return state
    }
}

const Prepositions = () => {

    const [prepositionsState, dispatch] = useReducer(prepositionsReducer, initialState)
    const { questionNumber, answer } = prepositionsState

  return (
    <div className="Prepositions">
      <p>Choose the correct preposition for the verb</p>
      <p className="h3 Verb">{questions[questionNumber].word}</p>
      <div className="Choices">
        {questions[questionNumber].options.map(option => 
            <button 
                className={`btn Choices__Button ${!answer && 'btn-light'} ${answer === option ? 'btn-lg' : 'btn-sm'} ${answer && option === questions[questionNumber].answer ? 'btn-success' : 'btn-danger'}`}
                type="button"
                disabled={!!answer}
                onClick={() => dispatch({ type: 'giveAnswer', payload: option })}
            >
                {option}
            </button>
        )}
      </div>
      {answer ?
        answer === questions[questionNumber].answer ?
            <p>Correct!</p> :
            <p>Unfortunate.  Your answer: {answer}.  Correct answer: {questions[questionNumber].answer}</p>
      :
      <></>}
      <div className="Navigator">
            <button
                disabled={!answer || questionNumber === 0}
                className="btn btn-secondary" 
                type="button"
                onClick={() => dispatch({ type: 'previousQuestion'})}
            >
                Previous
            </button>
            <button
                disabled={!answer || questionNumber === (questions.length-1)}
                className="btn btn-primary" 
                type="button"
                onClick={() => dispatch({ type: 'nextQuestion'})}
            >
                Next
            </button>
      </div>
    </div>
  );
};

export default Prepositions
