import prepositionsJson from "./prepositions.json";
import { ActivityState, Question } from "../shared/Activity.types";
import { getOrdering, getQuestionNumber } from '../shared/session';
import { getRandomQuestionNumber } from '../shared/utils';
import Activity from '../shared/Activity';

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


const Prepositions = () => 
    <Activity
        questions={prepositions}
        questionKey={questionKey}
        orderingKey={orderingKey}
        getOptions={getOptions}
        initialState={initialState}
    />


export default Prepositions
