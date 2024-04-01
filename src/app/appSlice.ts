import { createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import { todoListThunks } from "features/TodoLists/model/todolistsSlice"

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
      .addMatcher(isPending, (state, action) => {
        state.status = "loading"
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed"
        if (action.payload) {
          if (action.type === todoListThunks.createTodolist.rejected.type) return
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Error"
        }
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = "succeeded"
      })
  },
})

//TYPES
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppState = ReturnType<typeof slice.getInitialState>

export const appSlice = slice.reducer
export const appActions = slice.actions
export const { selectAppStatus, selectAppError, selectIsInitialized } = slice.selectors
