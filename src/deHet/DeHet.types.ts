export type DeHetState = {
    questionNumber: number
    answer: string
    ordering: 'ordered' | 'random'
    showEndModal: boolean
};

export type Ordering = 'ordered' | 'random'
export type DispatcherActions =
    | { type: 'previousQuestion' }
    | { type: 'nextQuestion' }
    | { type: 'giveAnswer', payload: string }
    | { type: 'changeOrdering', payload: Ordering}
    | { type: 'closeEndModal' }
