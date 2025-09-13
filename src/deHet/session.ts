import { Ordering } from './DeHet.types'

const questionKey = 'deHetQuestionKey'
const orderingKey = 'deHetOrderingKey'

export const setQuestionNumber = (questionNumber: number): void => 
    localStorage.setItem(questionKey, questionNumber.toString())

export const getQuestionNumber = (): number =>
    Number(localStorage.getItem(questionKey))

export const setOrdering = (ordering: Ordering): void =>
    localStorage.setItem(orderingKey, ordering)

export const getOrdering = (): Ordering =>
    (localStorage.getItem(orderingKey) ?? 'ordered') as Ordering
