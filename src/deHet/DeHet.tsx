import { useReducer } from "react";
import { ActivityState, DispatcherActions, Ordering, Question } from "../shared/Activity.types";
import nounsJson from "./nouns.json";
import { getOrdering, getQuestionNumber, setOrdering, setQuestionNumber } from "./session";
import EndModal from "../shared/EndModal";

const nouns: Question[] = nounsJson

const getRandomQuestionNumber = (maxLength: number) => Math.floor(Math.random() * (maxLength - 1))

const getOptions = (..._: any[]): string[] => ['de', 'het']

const initialOrdering = getOrdering()
const initialQuestionNumber = initialOrdering === 'ordered' ? getQuestionNumber() : getRandomQuestionNumber(nouns.length)
const initialState: ActivityState = {
    options: getOptions(),
    questionNumber: initialQuestionNumber,
    answer: '',
    ordering: initialOrdering,
    showEndModal: false,
}

const reducer = (questions: Question[]) => (state: ActivityState, action: DispatcherActions): ActivityState => {
    switch (action.type) {
        case 'nextQuestion':
            let nextQuestionNumber = state.questionNumber + 1

            if (nextQuestionNumber > (questions.length - 1)) {
                return {
                    ...state,
                    showEndModal: true
                }
            }

            if (state.ordering === 'ordered') {
                setQuestionNumber(nextQuestionNumber)
            } else {
                nextQuestionNumber = getRandomQuestionNumber(questions.length)
            }

            return {
                ...state,
                questionNumber: nextQuestionNumber,
                answer: '',
                options: getOptions(questions[nextQuestionNumber].answer, questions[nextQuestionNumber].otherAnswers ?? [])
            }
        case 'giveAnswer':
            return { 
                ...state,
                questionNumber: state.questionNumber, 
                answer: action.payload
            }
        case 'changeOrdering':
            const ordering = action.payload
            setOrdering(ordering)

            let questionNumber = getRandomQuestionNumber(questions.length)

            if (action.payload === 'ordered') {
                questionNumber = getQuestionNumber()
                
            }

            return {
                ...state,
                options: getOptions(questions[questionNumber].answer, questions[questionNumber].otherAnswers ?? []),
                questionNumber,
                ordering,
                answer: ''
            }
        case 'closeEndModal':
            setQuestionNumber(0)
            return {
                ...state, 
                showEndModal: false,
                questionNumber: 0,
                answer: ''
            }
        default:
            return state
    }
}

const DeHet = () => {
    const [state, dispatch] = useReducer(reducer(nouns), initialState)
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

            {ordering === 'ordered' && <p>Question {questionNumber+1} of {nouns.length}</p>}
            <p>Choose the correct article for the noun</p>
            <p className="h3 Verb">{nouns[questionNumber].word}</p>
            <div className="Choices">
                {options.map(option =>
                    <button
                        key={option}
                        className={`btn Choices__Button ${!answer && 'btn-light'} ${answer === option ? 'btn-lg' : 'btn-sm'} ${answer && option === nouns[questionNumber].answer ? 'btn-success' : 'btn-danger'}`}
                        type="button"
                        disabled={!!answer}
                        onClick={() => dispatch({ type: 'giveAnswer', payload: option })}
                    >
                        {option}
                    </button>
                )}
            </div>
            {answer ?
                answer === nouns[questionNumber].answer ?
                    <p>Correct!</p> :
                    <p>Unfortunate.  Your answer: {answer}.  Correct answer: {nouns[questionNumber].answer}</p>
                :
                <></>
            }
            <div className="Navigator">
                <button
                    disabled={!answer || questionNumber > nouns.length}
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
}

export default DeHet;
