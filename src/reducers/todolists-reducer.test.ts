import {v1} from "uuid";
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListFilterAT, ChangeTodoListTitleAC,
    ChangeTodoListTitleAT,
    DeleteTodoListAC, FilterType, TodolistDomainType,
    todoListsReducer
} from "./todolists-reducer";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;
beforeEach(() => {
    //данные
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})
test('correct todolist should be removed', () => {
    //выполнения тестируемого кода
    // const endState = todoListsReducer(startState, {type: "DELETE-TODOLIST", idTodoList: todolistId1})
    const endState = todoListsReducer(startState, DeleteTodoListAC(todolistId1))

    //проверка результата на соответствие желаемому результату
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState =
        todoListsReducer(
            startState,
            AddTodoListAC(newTodolistTitle))


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    // const action: ChangeTodoListTitleAT = {type: "CHANGE-TODOLIST-TITLE",
    //     idTodoList: todolistId2, title: newTodolistTitle}

    const action: ChangeTodoListTitleAT = ChangeTodoListTitleAC(todolistId2, newTodolistTitle)
    const endState = todoListsReducer(startState, action);


    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";

    const action: ChangeTodoListFilterAT = ChangeTodoListFilterAC(todolistId2, newFilter)

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


