import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppStateType } from "app/store"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType
  dispatch: ThunkDispatch<AppStateType, any, AnyAction>
  rejectValue: null
}>()
