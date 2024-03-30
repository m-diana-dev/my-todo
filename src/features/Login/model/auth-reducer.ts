import { createSlice } from "@reduxjs/toolkit"
import { appActions } from "app/app-reducer"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch } from "common/utils"
import { authAPI, LoginParamsType } from "features/Login/api/authApi"
import { RESULT_CODE } from "common/enums"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
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
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        return { isLoggedIn: true }
      } else {
        const isShowAppError = !res.data.fieldsErrors.length
        handleServerAppError(res.data, dispatch, isShowAppError)
        return rejectWithValue(res.data)
      }
    })
  },
)
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(appActions.clearData())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  })
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me()
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(null)
      }
    }).finally(() => {
      dispatch(appActions.setAppInitialized({ initialized: true }))
    })
  },
)

export const authActions = slice.actions
export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }

export const { selectIsLoggedIn } = slice.selectors
