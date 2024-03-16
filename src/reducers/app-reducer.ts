import { authAPI } from "../api/todolist-api"
import { Dispatch } from "redux"
import { setIsLoggedInAC } from "./auth-reducer"

const settingsAppState = {
  status: "idle" as RequestStatusType,
  error: "",
  isInitialized: false,
}
export const appReducer = (
  state: settingsAppStateType = settingsAppState,
  action: ActionType,
): settingsAppStateType => {
  switch (action.type) {
    case "SET-APP-STATUS":
      return { ...state, status: action.status }
    case "SET-APP-ERROR":
      return { ...state, error: action.error }
    case "SET-APP-INITIALIZED":
      return { ...state, isInitialized: action.initialized }
    default:
      return state
  }
}

//TYPES
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type settingsAppStateType = typeof settingsAppState
export type SetAppStatusAT = ReturnType<typeof SetAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof SetAppErrorAC>
export type SetAppInitializedAT = ReturnType<typeof SetAppInitializedAC>

type ActionType = SetAppStatusAT | SetAppErrorAT | SetAppInitializedAT

//AC
export const SetAppStatusAC = (status: RequestStatusType) => ({ type: "SET-APP-STATUS", status }) as const
export const SetAppErrorAC = (error: string) => ({ type: "SET-APP-ERROR", error }) as const
export const SetAppInitializedAC = (initialized: boolean) => ({ type: "SET-APP-INITIALIZED", initialized }) as const

//TC

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
      } else {
      }
    })
    .then((res) => {
      dispatch(SetAppInitializedAC(true))
    })
}
