
const settingsAppState = {
    status: 'idle' as RequestStatusType,
    error: ''
}
export const appReducer = (state: settingsAppStateType = settingsAppState, action: ActionType): settingsAppStateType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {...state, status: action.status}
        case "SET-APP-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type settingsAppStateType = typeof settingsAppState
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>

type ActionType = SetAppStatusAT | SetAppErrorAT

//AC
export const SetAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)
export const SetAppErrorAC = (error: string) => ({type: 'SET-APP-ERROR', error} as const)

//TC

