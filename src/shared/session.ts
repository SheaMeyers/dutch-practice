import { Ordering } from "./Activity.types"

export const setQuestionNumber = (questionKey: string, questionNumber: number): void => 
    localStorage.setItem(questionKey, questionNumber.toString())

export const getQuestionNumber = (questionKey: string, ): number =>
    Number(localStorage.getItem(questionKey))

export const setOrdering = (orderingKey: string, ordering: Ordering): void =>
    localStorage.setItem(orderingKey, ordering)

export const getOrdering = (orderingKey: string): Ordering =>
    (localStorage.getItem(orderingKey) ?? 'ordered') as Ordering
