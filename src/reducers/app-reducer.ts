import { authAPI } from "api/todolist-api"
import { Dispatch } from "redux"
import { authActions } from "reducers/auth-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: "",
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
    setAppInitialized: (state, action: PayloadAction<{ initialized: boolean }>) => {
      state.isInitialized = action.payload.initialized
    },
  },
})

//TYPES
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppState = ReturnType<typeof slice.getInitialState>

//TC

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      } else {
      }
    })
    .then((res) => {
      dispatch(appActions.setAppInitialized({ initialized: true }))
    })
}

export const appReducer = slice.reducer
export const appActions = slice.actions
