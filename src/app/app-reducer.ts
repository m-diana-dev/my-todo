import { Dispatch } from "redux"
import { authActions } from "features/Login/model/auth-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "features/Login/api/authApi"
import { createAppAsyncThunk } from "common/utils"

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
    clearData: (state) => {
      state.error = ""
    },
  },
})

//TYPES
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppState = ReturnType<typeof slice.getInitialState>

export const appReducer = slice.reducer
export const appActions = slice.actions
