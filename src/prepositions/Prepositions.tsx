import { useReducer } from 'react';
import prepositionsJson from "./prepositions.json";
import { ActivityState, Ordering, Question } from "../shared/Activity.types";
import EndModal from '../shared/EndModal';
import "./Prepositions.css";
import reducer from '../shared/Activity.reducer';
import { getOrdering, getQuestionNumber } from '../shared/session';
import { getRandomQuestionNumber } from '../shared/utils';

const prepositions: Question[] = prepositionsJson


const options: string[] = [
    'in', 'naast', 'langs', 'bij', 'rond',
    'tot', 'door', 'op', 'onder', 'van',
    'tegen', 'uit', 'over', 'om', 'spuiten',
    'aan', 'met', 'op', 'naar', 'voor']

const questionKey = 'questionKey'
const orderingKey = 'orderingKey'

const getOptions = (correctAnswer: string, otherAnswers: string[]): string[] => {

    const retrievedOptions: string[] = []

    // Get three random options
    while (retrievedOptions.length < 3) {
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex]

        if (randomOption !== correctAnswer &&
            !retrievedOptions.includes(randomOption) &&
            !otherAnswers.includes(randomOption)) {
            retrievedOptions.push(randomOption)
        }
    }

    // Put the correct answer at a random spot
    const randomIndex = Math.random() * 4
    retrievedOptions.splice(randomIndex, 0, correctAnswer)

    return retrievedOptions
}

const initialOrdering = getOrdering(orderingKey)
const initialQuestionNumber = initialOrdering === 'ordered' ? getQuestionNumber(questionKey) : getRandomQuestionNumber(prepositions.length)
const initialState: ActivityState = {
    options: getOptions(prepositions[initialQuestionNumber].answer, prepositions[initialQuestionNumber].otherAnswers ?? []),
    questionNumber: initialQuestionNumber,
    answer: '',
    ordering: initialOrdering,
    showEndModal: false
}


const Prepositions = () => {

    const [state, dispatch] = useReducer(reducer(prepositions, questionKey, orderingKey, getOptions), initialState)
    const { options, questionNumber, answer, ordering, showEndModal } = state

    return (
        <div className="Component">
            <div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" name="options" 
                        id="orderedOption" 
                        value="ordered" 
                        checked={ordering === 'ordered'}
                        onChange={(e) => dispatch({ type: 'changeOrdering', payload: e.target.value as Ordering })}
                    />
                    <label className="form-check-label" htmlFor="orderedOption">Ordered</label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="options" 
                        id="randomOption" 
                        value="random" 
                        checked={ordering === 'random'}
                        onChange={(e) => dispatch({ type: 'changeOrdering', payload: e.target.value as Ordering })}
                    />
                    <label className="form-check-label" htmlFor="randomOption">Random</label>
                </div>
            </div>

            {ordering === 'ordered' && <p>Question {questionNumber+1} of {prepositions.length}</p>}
            <p>Choose the correct preposition for the verb</p>
            <p className="h3 Question">{prepositions[questionNumber].word}</p>
            <div className="Choices">
                {options.map(option =>
                    <button
                        key={option}
                        className={`btn Choices__Button ${!answer && 'btn-light'} ${answer === option ? 'btn-lg' : 'btn-sm'} ${answer && option === prepositions[questionNumber].answer ? 'btn-success' : 'btn-danger'}`}
                        type="button"
                        disabled={!!answer}
                        onClick={() => dispatch({ type: 'giveAnswer', payload: option })}
                    >
                        {option}
                    </button>
                )}
            </div>
            {answer ?
                answer === prepositions[questionNumber].answer ?
                    <p>Correct!</p> :
                    <p>Unfortunate.  Your answer: {answer}.  Correct answer: {prepositions[questionNumber].answer}</p>
                :
                <></>
            }
            {
                answer ?
                    prepositions[questionNumber].otherAnswers && prepositions[questionNumber].otherAnswers!.length > 0 ?
                        <p>Other correct answers: {prepositions[questionNumber].otherAnswers!.join(', ')}</p> :
                        <></> :
                    <></>
            }
            <div className="Navigator">
                <button
                    disabled={!answer || questionNumber > prepositions.length}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => dispatch({ type: 'nextQuestion' })}
                >
                    Next
                </button>
            </div>
            {showEndModal && 
                <EndModal 
                    onClick={() => dispatch({ type: 'closeEndModal' })}
                /> 
            }
        </div>
    );
};

export default Prepositions
