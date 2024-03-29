import { createSlice } from "@reduxjs/toolkit"
import { appActions } from "app/app-reducer"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { authAPI, LoginParamsType } from "features/Login/api/authApi"
import { RESULT_CODE } from "common/enums"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

//TC

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { isLoggedIn: true }
      } else {
        const isShowAppError = !res.data.fieldsErrors.length
        handleServerAppError(res.data, dispatch, isShowAppError)
        return rejectWithValue(res.data)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      dispatch(appActions.clearData())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: true }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await authAPI.me()
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true }
      } else {
        // handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setAppInitialized({ initialized: true }))
    }
  },
)

export const authActions = slice.actions
export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
