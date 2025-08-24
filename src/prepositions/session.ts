const questionKey = 'questionKey'

export const setQuestionNumber = (questionNumber: number): void => 
    localStorage.setItem(questionKey, questionNumber.toString())

export const getQuestionNumber = (): number =>
    Number(localStorage.getItem(questionKey))
