import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer'
import {AddTodoListAC, DeleteTodoListAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../api/todolist-api";
import {TasksType} from "../components/TodoLists/TodoLists";


let startState: TasksType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }
})
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const newTask: TaskType = {
        id: '3', title: 'juice', status: TaskStatuses.New,
        todoListId: 'todolistId2',
        deadline: '',
        description: '',
        addedDate: '',
        startDate: '',
        order: 0,
        priority: TaskPriorities.Low
    }
    const action = addTaskAC(newTask)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {

    const action = updateTaskAC('3', {title: 'green tea'}, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][2].title).toBe('green tea')
    expect(startState['todolistId2'][2].title).toBe('tea')
    expect(endState['todolistId1'][2].title).toBe('React')
})


test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: 'todolistId1',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: 'todolistId2',
                deadline: '',
                description: '',
                addedDate: '',
                startDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }

    const newTodolist: TodolistType = {
        id: 'random-id',
        title: 'new todolist',
        addedDate: '',
        order: 0,
    }

    const action = AddTodoListAC(newTodolist)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {

    const action = DeleteTodoListAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
