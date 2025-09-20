import { useReducer } from "react"
import reducer from "./Activity.reducer"
import { ActivityState, Ordering, Question } from "./Activity.types"
import EndModal from "./EndModal"
import './Activity.css'


const Activity = (props: {
    questions: Question[]
    questionKey: string
    orderingKey: string
    getOptions: (...args: any[]) => string[]
    initialState: ActivityState
}) => {

    const { questions, questionKey, orderingKey, getOptions, initialState } = props
    const [state, dispatch] = useReducer(reducer(questions, questionKey, orderingKey, getOptions), initialState)
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

            {ordering === 'ordered' && <p>Question {questionNumber+1} of {questions.length}</p>}
            <p className="h3 Question">{questions[questionNumber].word}</p>
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
                    questions[questionNumber].otherAnswers && questions[questionNumber].otherAnswers!.length > 0 ?
                        <p>Other correct answers: {questions[questionNumber].otherAnswers!.join(', ')}</p> :
                        <></> :
                    <></>
            }
            <div className="Navigator">
                <button
                    disabled={!answer || questionNumber > questions.length}
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
    )
}

export default Activity
