import { Question } from "../shared/Activity.types";
import Activity from '../shared/Activity';
import prepositionsJson from "./prepositionsSentences.json";

const prepositions: Question[] = prepositionsJson

const options: string[] = [
    'in', 'naast', 'langs', 'bij', 'rond',
    'tot', 'door', 'op', 'onder', 'van',
    'tegen', 'uit', 'over', 'om', 'spuiten',
    'aan', 'met', 'naar', 'voor']

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


const PrepositionsSentences = () => 
    <Activity
        documentTitle='Dutch Sentences Prepositions Practice'
        questions={prepositions}
        questionKey='prepositionsSentencesQuestionKey'
        orderingKey='prepositionsSentencesOrderingKey'
        getOptions={getOptions}
    />


export default PrepositionsSentences
