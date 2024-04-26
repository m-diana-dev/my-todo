import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "app/appSlice"
import { createAppAsyncThunk } from "common/utils"
import { authAPI, LoginParamsType } from "features/Login/api/authApi"
import { ResultCode } from "common/enums"

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
    builder.addMatcher(
      // isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
      isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
})

//TC

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, { rejectWithValue, dispatch }) => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCode.Succeeded) {
      return { isLoggedIn: true }
    } else if (res.data.resultCode === ResultCode.Captcha) {
      dispatch(getCaptcha())
      return rejectWithValue(res.data)
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.logout()
  if (res.data.resultCode === ResultCode.Succeeded) {
    dispatch(appActions.clearData())
    return { isLoggedIn: false }
  } else {
    return rejectWithValue(null)
  }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.me().finally(() => {
      dispatch(appActions.setAppInitialized({ initialized: true }))
    })
    if (res.data.resultCode === ResultCode.Succeeded) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const getCaptcha = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/getCaptcha`,
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.getCaptcha()
    dispatch(appActions.setCaptcha(res))
    return { isLoggedIn: false }
  },
)

export const authActions = slice.actions
export const authSlice = slice.reducer
export const authThunks = { login, logout, initializeApp }

export const { selectIsLoggedIn } = slice.selectors
