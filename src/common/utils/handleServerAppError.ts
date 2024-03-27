import { Dispatch } from "redux"
import { appActions } from "app/app-reducer"
import { ResponseType } from "common/types"
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "failed" }))
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: "Some Error" }))
  }
}
