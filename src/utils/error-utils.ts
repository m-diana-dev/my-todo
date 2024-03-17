import { Dispatch } from "redux"
import { ResponseType } from "api/todolist-api"
import { appActions } from "reducers/app-reducer"

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "failed" }))
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Some Error" }))
  }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setAppError({ error: error.message }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
