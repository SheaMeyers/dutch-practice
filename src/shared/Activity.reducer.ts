import { ActivityState, DispatcherActions, Question } from "./Activity.types"
import { setQuestionNumber, getQuestionNumber, setOrdering } from "./session"
import { getRandomQuestionNumber } from "./utils"


const reducer = (questions: Question[], questionKey: string, orderingKey: string, getOptions: (...args: any[]) => string[]) => (state: ActivityState, action: DispatcherActions): ActivityState => {
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
                setQuestionNumber(questionKey, nextQuestionNumber)
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
            setOrdering(orderingKey, ordering)

            let questionNumber = getRandomQuestionNumber(questions.length)

            if (action.payload === 'ordered') {
                questionNumber = getQuestionNumber(questionKey)
                
            }

            return {
                ...state,
                options: getOptions(questions[questionNumber].answer, questions[questionNumber].otherAnswers ?? []),
                questionNumber,
                ordering,
                answer: ''
            }
        case 'closeEndModal':
            setQuestionNumber(questionKey, 0)
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

export default reducer
