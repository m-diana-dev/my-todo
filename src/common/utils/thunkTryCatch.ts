import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, AppStateType } from "app/store"
import { BaseResponseType } from "common/types"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
}
