import { Question } from "../shared/Activity.types";
import Activity from "../shared/Activity";
import expressionsJson from "./expressions.json";

const expressions: Question[] = expressionsJson

const options: string[] = [
    "The decision has been made",
    "To master something",
    "To have a bone to pick with someone",
    "The truth is revealed",
    "They get along very well",
    "That’s not my responsibility",
    "To lose the overview",
    "To disappoint someone",
    "To wait and see",
    "A fuss about nothing",
    "To get straight to the point",
    "Someone who is really enjoying their meal",
    "It is raining a lot",
    "You should not criticize others as you have faults yourself",
    "To be at the right place at the right time",
    "You are free to leave",
    "Where there’s smoke, there’s fire",
    "He who hesitates is lost",
    "To make a half-hearted attempt",
    "To begin is half the work.",
    "To see problems that may happen",
    "You’re not going to melt.",
    "The way to a man’s heart is through his stomach.",
    "Mopping with the faucet open",
    "If you don't try you will never succeed",
    "Better late than never",
    "Take a look in the mirror",
    "Get ready!",
    "To overlook a mistake",
    "The apple doesn’t fall far from the tree",
    "He bought it for next to nothing",
    "We all need to compromise to reach a solution",
    "He tried to lie, but he was quickly found out",
    "He hit the nail on the head",
    "By making that decision, he harmed himself",
    "Can you keep an eye on things while I’m away?",
    "Let’s get started with this project",
    "They asked him a lot of questions about his new job",
    "Well known people face a lot of criticism",
    "A taste of your own medicine",
    "To postponed indefinitely",
    "Here everyone has a say",
]

const getOptions = (correctAnswer: string): string[] => {

    const retrievedOptions: string[] = []

    // Get three random options
    while (retrievedOptions.length < 3) {
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex]

        if (randomOption !== correctAnswer &&
            !retrievedOptions.includes(randomOption)) {
            retrievedOptions.push(randomOption)
        }
    }

    // Put the correct answer at a random spot
    const randomIndex = Math.random() * 4
    retrievedOptions.splice(randomIndex, 0, correctAnswer)

    return retrievedOptions
}


const Expressions = () =>     
    <Activity
        documentTitle='Dutch Expressions Practice'
        questions={expressions}
        questionKey='expressionsQuestionKey'
        orderingKey='expressionsOrderingKey'
        getOptions={getOptions}
    />


export default Expressions
