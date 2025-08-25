import { useReducer } from 'react';
import { setQuestionNumber, getQuestionNumber } from './session';
import questions from "./questions.json";
import "./Prepositions.css";

interface Question {
    word: string;
    answer: string;
    otherAnswers: string[]
}

const options: string[] = [
    'in', 'naast', 'langs', 'bij', 'rond',
    'tot', 'door', 'op', 'onder', 'van',
    'tegen', 'uit', 'over', 'om', 'spuiten',
    'aan', 'met', 'op', 'naar', 'voor']

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

type PrepositionsState = {
    options: string[]
    questionNumber: number
    answer: string
};

type DispatcherActions =
    | { type: 'previousQuestion' }
    | { type: 'nextQuestion' }
    | { type: 'giveAnswer', payload: string };


const initialQuestionNumber = getQuestionNumber()
const initialState: PrepositionsState = {
    options: getOptions(questions[initialQuestionNumber].answer, questions[initialQuestionNumber].otherAnswers),
    questionNumber: initialQuestionNumber,
    answer: ''
}

const prepositionsReducer = (state: PrepositionsState, action: DispatcherActions): PrepositionsState => {
    switch (action.type) {
        case 'previousQuestion':
            const previousQuestionNumber = state.questionNumber - 1
            setQuestionNumber(previousQuestionNumber)
            return {
                questionNumber: previousQuestionNumber,
                answer: '',
                options: getOptions(questions[previousQuestionNumber].answer, questions[previousQuestionNumber].otherAnswers)
            }
        case 'nextQuestion':
            const nextQuestionNumber = state.questionNumber + 1
            setQuestionNumber(nextQuestionNumber)
            return {
                questionNumber: nextQuestionNumber,
                answer: '',
                options: getOptions(questions[nextQuestionNumber].answer, questions[nextQuestionNumber].otherAnswers)
            }
        case 'giveAnswer':
            return { questionNumber: state.questionNumber, answer: action.payload, options: state.options }
        default:
            return state
    }
}

const Prepositions = () => {

    const [prepositionsState, dispatch] = useReducer(prepositionsReducer, initialState)
    const { options, questionNumber, answer } = prepositionsState

    return (
        <div className="Prepositions">
            <p>Question {questionNumber+1} of {questions.length}</p>
            <p>Choose the correct preposition for the verb</p>
            <p className="h3 Verb">{questions[questionNumber].word}</p>
            <div className="Choices">
                {options.map(option =>
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
                <button
                    disabled={!answer || questionNumber === 0}
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => dispatch({ type: 'previousQuestion' })}
                >
                    Previous
                </button>
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
