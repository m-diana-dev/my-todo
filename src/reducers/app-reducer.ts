
const settingsAppState = {
    status: 'loading' as RequestStatusType
}
export const appReducer = (state: settingsAppStateType = settingsAppState, action: ActionType): settingsAppStateType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type settingsAppStateType = typeof settingsAppState
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>
type ActionType = SetAppStatusAT

//AC
export const SetAppStatusAC = (status: RequestStatusType) => ({type: 'SET-APP-STATUS', status} as const)

//TC

