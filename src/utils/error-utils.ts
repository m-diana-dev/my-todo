import { Dispatch } from 'redux'
import {SetAppErrorAC, SetAppErrorAT, SetAppStatusAC, SetAppStatusAT} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolist-api";

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    dispatch(SetAppStatusAC('failed'))
    if (data.messages.length) {
        dispatch(SetAppErrorAC(data.messages[0]))
    } else {
        dispatch(SetAppErrorAC('Some Error'))
    }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(SetAppErrorAC(error.message))
    dispatch(SetAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppStatusAT | SetAppErrorAT>
