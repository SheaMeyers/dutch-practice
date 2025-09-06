import { useReducer } from 'react';
import { setQuestionNumber, getQuestionNumber, getOrdering, setOrdering } from './session';
import questions from "./questions.json";
import { DispatcherActions, Ordering, PrepositionsState } from './Preposition.types';
import "./Prepositions.css";


const options: string[] = [
    'in', 'naast', 'langs', 'bij', 'rond',
    'tot', 'door', 'op', 'onder', 'van',
    'tegen', 'uit', 'over', 'om', 'spuiten',
    'aan', 'met', 'op', 'naar', 'voor']

const getRandomQuestionNumber = () => Math.floor(Math.random() * (questions.length - 1))

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

const initialOrdering = getOrdering()
const initialQuestionNumber = initialOrdering === 'ordered' ? getQuestionNumber() : getRandomQuestionNumber()
const initialState: PrepositionsState = {
    options: getOptions(questions[initialQuestionNumber].answer, questions[initialQuestionNumber].otherAnswers),
    questionNumber: initialQuestionNumber,
    answer: '',
    ordering: initialOrdering
}

const prepositionsReducer = (state: PrepositionsState, action: DispatcherActions): PrepositionsState => {
    switch (action.type) {
        case 'previousQuestion':
            const previousQuestionNumber = state.questionNumber - 1
            setQuestionNumber(previousQuestionNumber)
            return {
                ...state,
                questionNumber: previousQuestionNumber,
                answer: '',
                options: getOptions(questions[previousQuestionNumber].answer, questions[previousQuestionNumber].otherAnswers),
            }
        case 'nextQuestion':
            let nextQuestionNumber = state.questionNumber + 1

            if (state.ordering === 'ordered') {
                setQuestionNumber(nextQuestionNumber)
            } else {
                nextQuestionNumber = getRandomQuestionNumber()
            }
            return {
                ...state,
                questionNumber: nextQuestionNumber,
                answer: '',
                options: getOptions(questions[nextQuestionNumber].answer, questions[nextQuestionNumber].otherAnswers)
            }
        case 'giveAnswer':
            return { 
                ...state,
                questionNumber: state.questionNumber, 
                answer: action.payload, 
                options: state.options 
            }
        case 'changeOrdering':
            const ordering = action.payload
            setOrdering(ordering)

            let questionNumber = getRandomQuestionNumber()

            if (action.payload === 'ordered') {
                questionNumber = getQuestionNumber()
                
            }

            const options = getOptions(questions[questionNumber].answer, questions[questionNumber].otherAnswers)

            return {
                ...state,
                options,
                questionNumber,
                ordering
            }
        default:
            return state
    }
}

const Prepositions = () => {

    const [prepositionsState, dispatch] = useReducer(prepositionsReducer, initialState)
    const { options, questionNumber, answer, ordering } = prepositionsState

    return (
        <div className="Prepositions">

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

            {ordering === 'ordered' && <p>Question {questionNumber+1} of {questions.length}</p>}
            <p>Choose the correct preposition for the verb</p>
            <p className="h3 Verb">{questions[questionNumber].word}</p>
            <div className="Choices">
                {options.map(option =>
                    <button
                        key={option}
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
                <></>
            }
            {
                answer ?
                    questions[questionNumber].otherAnswers.length > 0 ?
                        <p>Other correct answers: {questions[questionNumber].otherAnswers.join(', ')}</p> :
                        <></> :
                    <></>
            }
            <div className="Navigator">
                {ordering === 'ordered' &&
                    <button
                        disabled={!answer || questionNumber === 0}
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => dispatch({ type: 'previousQuestion' })}
                    >
                        Previous
                    </button>
                }
                <button
                    disabled={!answer || questionNumber === (questions.length - 1)}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => dispatch({ type: 'nextQuestion' })}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Prepositions
