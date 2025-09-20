import { useReducer } from "react";
import { DeHetState, DispatcherActions, Ordering } from "./DeHet.types";
import nouns from "./nouns.json";
import { getOrdering, getQuestionNumber, setOrdering, setQuestionNumber } from "./session";
import EndModal from "../shared/EndModal";

const getRandomQuestionNumber = () => Math.floor(Math.random() * (nouns.length - 1))

const initialOrdering = getOrdering()
const initialQuestionNumber = initialOrdering === 'ordered' ? getQuestionNumber() : getRandomQuestionNumber()
const initialState: DeHetState = {
    options: ['de', 'het'],
    questionNumber: initialQuestionNumber,
    answer: '',
    ordering: initialOrdering,
    showEndModal: false,
}

const deHetReducer = (state: DeHetState, action: DispatcherActions): DeHetState => {
    switch (action.type) {
        case 'previousQuestion':
            const previousQuestionNumber = state.questionNumber - 1
            setQuestionNumber(previousQuestionNumber)
            return {
                ...state,
                questionNumber: previousQuestionNumber,
                answer: '',
            }
        case 'nextQuestion':
            let nextQuestionNumber = state.questionNumber + 1

            if (nextQuestionNumber > (nouns.length - 1)) {
                return {
                    ...state,
                    showEndModal: true
                }
            }

            if (state.ordering === 'ordered') {
                setQuestionNumber(nextQuestionNumber)
            } else {
                nextQuestionNumber = getRandomQuestionNumber()
            }
            return {
                ...state,
                questionNumber: nextQuestionNumber,
                answer: ''
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

            let questionNumber = getRandomQuestionNumber()

            if (action.payload === 'ordered') {
                questionNumber = getQuestionNumber()
                
            }

            return {
                ...state,
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
    const [prepositionsState, dispatch] = useReducer(deHetReducer, initialState)
    const { options, questionNumber, answer, ordering, showEndModal } = prepositionsState

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
            <p className="h3 Verb">{nouns[questionNumber].noun}</p>
            <div className="Choices">
                {options.map(option =>
                    <button
                        key={option}
                        className={`btn Choices__Button ${!answer && 'btn-light'} ${answer === option ? 'btn-lg' : 'btn-sm'} ${answer && option === nouns[questionNumber].article ? 'btn-success' : 'btn-danger'}`}
                        type="button"
                        disabled={!!answer}
                        onClick={() => dispatch({ type: 'giveAnswer', payload: option })}
                    >
                        {option}
                    </button>
                )}
            </div>
            {answer ?
                answer === nouns[questionNumber].article ?
                    <p>Correct!</p> :
                    <p>Unfortunate.  Your answer: {answer}.  Correct answer: {nouns[questionNumber].article}</p>
                :
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
