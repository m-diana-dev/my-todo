export type UpdateTodolistArgs = {
  todolistID: string
  title: string
}

export type DeleteTodolistArgs = {
  todolistID: string
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
