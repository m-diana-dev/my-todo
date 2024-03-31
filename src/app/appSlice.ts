import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: "",
    isInitialized: false,
  },
  selectors: {
    selectAppStatus: (sliceState) => sliceState.status,
    selectAppError: (sliceState) => sliceState.error,
    selectIsInitialized: (sliceState) => sliceState.isInitialized,
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith("/pending")
        },
        (state, action) => {
          state.status = "loading"
        },
      )
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith("/rejected")
        },
        (state, action) => {
          state.status = "failed"
        },
      )
      .addMatcher(
        (action: UnknownAction) => {
          return action.type.endsWith("/fulfilled")
        },
        (state, action) => {
          state.status = "succeeded"
        },
      )
  },
})

//TYPES
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppState = ReturnType<typeof slice.getInitialState>

export const appSlice = slice.reducer
export const appActions = slice.actions
export const { selectAppStatus, selectAppError, selectIsInitialized } = slice.selectors
