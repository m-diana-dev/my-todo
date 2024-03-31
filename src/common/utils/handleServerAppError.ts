import { Dispatch } from "redux"
import { appActions } from "app/appSlice"
import { BaseResponseType } from "common/types"

/**
 *
 * @param data
 * @param dispatch
 * @param isShowGlobalError
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some Error" }))
  }
}
