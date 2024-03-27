import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { appActions } from "app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { authAPI, LoginParamsType } from "features/Login/api/authApi"
import { RESULT_CODE } from "common/enums"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

//TC
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    authAPI
      .login(data)
      .then((res) => {
        // debugger
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
          debugger
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(appActions.clearData())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const authActions = slice.actions
export const authReducer = slice.reducer
