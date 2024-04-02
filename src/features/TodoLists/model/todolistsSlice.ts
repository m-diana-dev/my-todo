import { appActions, RequestStatusType } from "app/appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { tasksThunks } from "features/TodoLists/model/tasksSlice"
import { createAppAsyncThunk } from "common/utils"
import { RESULT_CODE } from "common/enums"
import {
  DeleteTodolistArgs,
  TodolistType,
  UpdateTodolistArgs,
} from "features/TodoLists/api/todolosts/todolistApi.types"
import { todolistApi } from "features/TodoLists/api/todolosts/todolistApi"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  selectors: {
    selectTodolists: (sliceState) => sliceState,
  },
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<{ id: string; filter: FilterType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodoListStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].status = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appActions.clearData, () => {
        return []
      })
      .addCase(setTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state.push({ ...el, filter: "all", status: "idle" })
        })
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", status: "idle" })
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistID)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistID)
        if (index !== -1) state[index].title = action.payload.title
      })
  },
})

//TYPES
export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterType
  status: RequestStatusType
}

//TC

const setTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, undefined>(
  `${slice.name}/setTodolists`,
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const res = await todolistApi.getTodolists()
    res.data.forEach((todo) => {
      dispatch(tasksThunks.setTasks(todo.id))
    })
    return { todolists: res.data }
  },
)
const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, { title: string }>(
  `${slice.name}/createTodolist`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistApi.createTodolist(arg.title)
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const deleteTodolist = createAppAsyncThunk<DeleteTodolistArgs, DeleteTodolistArgs>(
  `${slice.name}/deleteTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(todoListsActions.changeTodoListStatus({ id: arg.todolistID, status: "loading" }))
    const res = await todolistApi.deleteTodolist(arg).finally(() => {
      dispatch(todoListsActions.changeTodoListStatus({ id: arg.todolistID, status: "idle" }))
    })
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return { todolistID: arg.todolistID }
    } else {
      return rejectWithValue(res.data)
    }
  },
)
const updateTodolist = createAppAsyncThunk<UpdateTodolistArgs, UpdateTodolistArgs>(
  `${slice.name}/updateTodolist`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(todoListsActions.changeTodoListStatus({ id: arg.todolistID, status: "loading" }))
    const res = await todolistApi.updateTodolist(arg).finally(() => {
      dispatch(todoListsActions.changeTodoListStatus({ id: arg.todolistID, status: "idle" }))
    })
    if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
      return arg
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const todolistsSlice = slice.reducer
export const todoListsActions = slice.actions
export const todoListThunks = { setTodolists, createTodolist, deleteTodolist, updateTodolist }
export const { selectTodolists } = slice.selectors
