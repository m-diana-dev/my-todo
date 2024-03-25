import { RESULT_CODE, todolistAPI, TodolistType } from "api/todolist-api"
import { AnyAction, Dispatch } from "redux"
import { appActions, RequestStatusType } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ThunkDispatch } from "redux-thunk"
import { AppStateType } from "reducers/store"
import { tasksThunks } from "reducers/tasks-reducer"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    deleteTodoList: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodoList: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", status: "idle" })
    },
    changeTodoListTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodoListFilter: (state, action: PayloadAction<{ id: string; filter: FilterType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodoListStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].status = action.payload.status
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      action.payload.todolists.forEach((el) => {
        state.push({ ...el, filter: "all", status: "idle" })
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(appActions.clearData, () => {
      return []
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
export const SetTodolistsTC = () => (dispatch: ThunkDispatch<AppStateType, any, AnyAction>) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .getTodolists()
    .then((res) => {
      dispatch(todoListsActions.setTodolists({ todolists: res.data }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todos) => {
      todos.forEach((todo) => {
        dispatch(tasksThunks.setTasks(todo.id))
      })
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
export const CreateTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todoListsActions.addTodoList({ todolist: res.data.data.item }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
export const DeleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  dispatch(todoListsActions.changeTodoListStatus({ id: todolistID, status: "loading" }))
  todolistAPI
    .deleteTodolist(todolistID)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todoListsActions.deleteTodoList({ id: todolistID }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(todoListsActions.changeTodoListStatus({ id: todolistID, status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}
export const UpdateTodolistTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistAPI
    .updateTodolist(todolistID, title)
    .then((res) => {
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(todoListsActions.changeTodoListTitle({ id: todolistID, title }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
    })
}

export const todoListsReducer = slice.reducer
export const todoListsActions = slice.actions
