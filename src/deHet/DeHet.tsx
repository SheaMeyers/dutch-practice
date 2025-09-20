import { ActivityState, Question } from "../shared/Activity.types";
import nounsJson from "./nouns.json";
import { getOrdering, getQuestionNumber } from "../shared/session";
import { getRandomQuestionNumber } from "../shared/utils";
import Activity from "../shared/Activity";

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


const DeHet = () =>     
    <Activity
        questions={nouns}
        questionKey={questionKey}
        orderingKey={orderingKey}
        getOptions={getOptions}
        initialState={initialState}
    />


export default DeHet
