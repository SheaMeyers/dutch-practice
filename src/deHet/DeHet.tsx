import { useReducer } from "react";
import { ActivityState, Ordering, Question } from "../shared/Activity.types";
import nounsJson from "./nouns.json";
import EndModal from "../shared/EndModal";
import reducer from "../shared/Activity.reducer";
import { getOrdering, getQuestionNumber } from "../shared/session";
import { getRandomQuestionNumber } from "../shared/utils";

const nouns: Question[] = nounsJson


const getOptions = (..._: any[]): string[] => ['de', 'het']

const questionKey = 'deHetQuestionKey'
const orderingKey = 'deHetOrderingKey'

const initialOrdering = getOrdering(orderingKey)
const initialQuestionNumber = initialOrdering === 'ordered' ? getQuestionNumber(questionKey) : getRandomQuestionNumber(nouns.length)
const initialState: ActivityState = {
    options: getOptions(),
    questionNumber: initialQuestionNumber,
    answer: '',
    ordering: initialOrdering,
    showEndModal: false,
}



const DeHet = () => {
    const [state, dispatch] = useReducer(reducer(nouns, questionKey, orderingKey, getOptions), initialState)
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
