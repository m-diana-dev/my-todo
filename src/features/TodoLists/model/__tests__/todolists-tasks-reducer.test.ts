import { tasksSlice } from "features/TodoLists/model/tasksSlice"
import { TodolistDomainType, todolistsSlice, todoListThunks } from "features/TodoLists/model/todolistsSlice"
import { TasksType } from "features/TodoLists/ui/TodoLists"
import { TodolistType } from "features/TodoLists/api/todolosts/todolistApi.types"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const newTodolist: TodolistType = {
    id: "random-id",
    title: "new todolist",
    addedDate: "",
    order: 0,
  }

  // const action = todoListsActions.addTodoList({ todolist: newTodolist })
  const action = todoListThunks.createTodolist.fulfilled({ todolist: newTodolist }, "requestId", newTodolist)

  const endTasksState = tasksSlice(startTasksState, action)
  const endTodolistsState = todolistsSlice(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
