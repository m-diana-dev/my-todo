import { Dispatch } from 'redux'
import {SetAppStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType, RESULT_CODE, todolistAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {addTaskAC} from "./tasks-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// TYPES
type ActionsType = ReturnType<typeof setIsLoggedInAC>


//AC
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const)


//TC
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            // debugger
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(setIsLoggedInAC(true))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                debugger
            }
        })
        .catch(e=>{
            handleServerNetworkError(e, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(SetAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(SetAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
