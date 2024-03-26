import {
  CreateTaskArgs,
  DeleteTaskArgs,
  RESULT_CODE,
  TaskType,
  todolistAPI,
  UpdateTaskArgs,
  UpdateTaskModelType,
} from "api/todolist-api"
import { TasksType } from "components/TodoLists/TodoLists"
import { appActions, RequestStatusType } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todoListsActions, todoListThunks } from "reducers/todolists-reducer"
import { createAppAsyncThunk } from "utils/createAppAsyncThunk"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistID: string; taskID: string; status: RequestStatusType }>,
    ) => {
      const index = state[action.payload.todolistID].findIndex((el) => el.id === action.payload.taskID)
      if (index !== -1)
        state[action.payload.todolistID][index] = {
          ...state[action.payload.todolistID][index],
          entityStatus: action.payload.status,
        }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTasks.fulfilled, (state, action) => {
        state[action.payload.todolistID] = action.payload.tasks.map((el: any) => ({ ...el, entityStatus: "idle" }))
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({ ...action.payload.task, entityStatus: "idle" })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistID].findIndex((el) => el.id === action.payload.taskID)
        if (index !== -1)
          state[action.payload.todolistID][index] = {
            ...state[action.payload.todolistID][index],
            ...action.payload.domainModel,
          }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistID].findIndex((el) => el.id === action.payload.taskID)
        if (index !== -1) state[action.payload.todolistID].splice(index, 1)
      })
      .addCase(todoListThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todoListThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistID]
      })
      .addCase(todoListThunks.setTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((el) => {
          state[el.id] = []
        })
      })
      .addCase(appActions.clearData, () => {
        return {}
      })
  },
})

//TC

const setTasks = createAppAsyncThunk<{ todolistID: string; tasks: TaskType[] }, string>(
  `${slice.name}/setTasks`,
  async (todolistID, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
      const res = await todolistAPI.getTasks(todolistID)
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistID, tasks: res.data.items }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

const createTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(
  `${slice.name}/createTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: "loading" }))
    try {
      const res = await todolistAPI.createTask(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteTask = createAppAsyncThunk<DeleteTaskArgs, DeleteTaskArgs>(
  `${slice.name}/deleteTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(tasksActions.changeTaskEntityStatus({ todolistID: arg.todolistID, taskID: arg.taskID, status: "loading" }))
    try {
      const res = await todolistAPI.deleteTask(arg)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(
          tasksActions.changeTaskEntityStatus({ todolistID: arg.todolistID, taskID: arg.taskID, status: "succeeded" }),
        )
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(tasksActions.changeTaskEntityStatus({ todolistID: arg.todolistID, taskID: arg.taskID, status: "loading" }))
    try {
      const task = getState().tasks[arg.todolistID].find((el) => el.id === arg.taskID)
      if (!task) {
        console.warn("task not found in the state")
        return rejectWithValue(null)
      }
      const modelAPI: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...arg.domainModel,
      }
      const res = await todolistAPI.updateTask(arg.todolistID, arg.taskID, modelAPI)
      if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        dispatch(
          tasksActions.changeTaskEntityStatus({
            todolistID: arg.todolistID,
            taskID: arg.taskID,
            status: "succeeded",
          }),
        )
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { setTasks, createTask, updateTask, deleteTask }
