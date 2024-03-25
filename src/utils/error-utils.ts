import { Dispatch } from "redux"
import { ResponseType } from "api/todolist-api"
import { appActions } from "reducers/app-reducer"
import axios from "axios"

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "failed" }))
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Some Error" }))
  }
}

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = "Some error occurred"
  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
