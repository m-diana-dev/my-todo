import {v1} from "uuid";
import {FilterType, TasksType, TodoListsType} from "../App";
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListFilterAT, ChangeTodoListTitleAC,
    ChangeTodoListTitleAT,
    DeleteTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('correct todolist should be removed', () => {
    //данные
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //выполнения тестируемого кода
    // const endState = todoListsReducer(startState, {type: "DELETE-TODOLIST", idTodoList: todolistId1})
    const endState = todoListsReducer(startState, DeleteTodoListAC(todolistId1))

    //проверка результата на соответствие желаемому результату
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();


    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const endState =
    //     todoListsReducer(
    //         startState,
    //         {type: "ADD-TODOLIST", title: newTodolistTitle,
    //             idTodoList: v1()})

    const endState =
        todoListsReducer(
            startState,
            AddTodoListAC(newTodolistTitle))


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ChangeTodoListTitleAT = {type: "CHANGE-TODOLIST-TITLE",
    //     idTodoList: todolistId2, title: newTodolistTitle}

    const action: ChangeTodoListTitleAT = ChangeTodoListTitleAC(todolistId2, newTodolistTitle)
    const endState = todoListsReducer(startState, action);


    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterType = "completed";

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    // const action:ChangeTodoListFilterAT = {type: "CHANGE-TODOLIST-FILTER", idTodoList: todolistId2, filter: newFilter}
    const action:ChangeTodoListFilterAT = ChangeTodoListFilterAC(todolistId2, newFilter)

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


