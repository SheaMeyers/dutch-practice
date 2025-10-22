import { Question } from "../shared/Activity.types";
import Activity from "../shared/Activity";
import verbsJson from "./verbs.json";

const verbs: Question[] = verbsJson

const getOptions = (..._: any[]): string[] => ['zijn', 'hebben']


const ZijnHebben = () =>     
    <Activity
        questions={verbs}
        questionKey='zijnHebbenQuestionKey'
        orderingKey='zijnHebbenOrderingKey'
        getOptions={getOptions}
    />


export default ZijnHebben
