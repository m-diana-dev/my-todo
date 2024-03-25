import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppStateType } from "reducers/store"
import { Dispatch } from "redux"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppStateType
  dispatch: Dispatch
  rejectValue: null
}>()
