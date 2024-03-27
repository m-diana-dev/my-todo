import { tasksReducer } from "features/TodoLists/TodoList/Task/tasks-reducer"
import { TodolistDomainType, todoListsReducer, todoListThunks } from "features/TodoLists/TodoList/todolists-reducer"
import { TodolistType } from "features/TodoLists/api/todolistApi"
import { TasksType } from "features/TodoLists/TodoLists"

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

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
