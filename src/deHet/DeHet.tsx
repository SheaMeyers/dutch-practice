import { Question } from "../shared/Activity.types";
import Activity from "../shared/Activity";
import nounsJson from "./nouns.json";

const nouns: Question[] = nounsJson

const getOptions = (..._: any[]): string[] => ['de', 'het']


const DeHet = () =>     
    <Activity
        questions={nouns}
        questionKey='deHetQuestionKey'
        orderingKey='deHetOrderingKey'
        getOptions={getOptions}
    />


export default DeHet
