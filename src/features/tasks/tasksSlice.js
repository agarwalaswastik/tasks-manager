import { createSlice } from "@reduxjs/toolkit";
import { generateUniqueId } from "../../utils/idUtils";
import { generateNextColor } from "../../utils/colorUtils";
import { handleDragEnd } from "./handleDragEnd";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        addTaskList: {
            prepare: (id, desc, color) => ({
                payload: { id, desc, color },
            }),
            reducer: (state, action) => {
                state.unshift({ ...action.payload, tasks: [] });
            },
        },
        deleteTaskList: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload) {
                    state.splice(i, 1);
                    return;
                }
            }
        },
        editTaskListDesc: {
            prepare: (taskListId, newDesc) => ({
                payload: { taskListId, newDesc },
            }),
            reducer: (state, action) => {
                for (let taskList of state) {
                    if (taskList.id === action.payload.taskListId) {
                        taskList.desc = action.payload.newDesc;
                        return;
                    }
                }
            },
        },
        addTask: {
            prepare: (taskListId, id, desc, color, filters) => ({
                payload: { taskListId, id, desc, color, filters },
            }),
            reducer: (state, action) => {
                for (let taskList of state) {
                    if (taskList.id === action.payload.taskListId) {
                        taskList.tasks.unshift({
                            id: action.payload.id,
                            desc: action.payload.desc,
                            color: action.payload.color,
                            filters: action.payload.filters ?? [],
                        });
                    }
                }
            },
        },
        deleteTask: (state, action) => {
            for (let taskList of state) {
                for (let i = 0; i < taskList.tasks.length; i++) {
                    if (taskList.tasks[i].id === action.payload) {
                        taskList.tasks.splice(i, 1);
                        return;
                    }
                }
            }
        },
        editTaskDesc: {
            prepare: (taskId, newDesc) => ({
                payload: { taskId, newDesc },
            }),
            reducer: (state, action) => {
                const task = getTask(state, action.payload.taskId);
                if (!task) return;
                task.desc = action.payload.newDesc;
            },
        },
        addFilterToTask: {
            prepare: (taskId, filterId) => ({
                payload: { taskId, filterId },
            }),
            reducer: (state, action) => {
                const task = getTask(state, action.payload.taskId);
                if (!task) return;
                task.filters.push(action.payload.filterId);
            },
        },
        removeFilterFromTask: {
            prepare: (taskId, filterId) => ({
                payload: { taskId, filterId },
            }),
            reducer: (state, action) => {
                const task = getTask(state, action.payload.taskId);
                if (!task) return;
                for (let i = 0; i < task.filters.length; i++) {
                    if (task.filters[i] === action.payload.filterId) {
                        task.filters.splice(i, 1);
                    }
                }
            },
        },
        dragEndUpdate: (state, action) => {
            handleDragEnd(state, action);
        },
    },
});

const getTask = (state, taskId) => {
    for (let taskList of state) {
        for (let i = 0; i < taskList.tasks.length; i++) {
            if (taskList.tasks[i].id === taskId) {
                return taskList.tasks[i];
            }
        }
    }
    return null;
};

export const addTaskList = (desc) =>
    tasksSlice.actions.addTaskList(generateUniqueId(), desc, generateNextColor());

export const addTask = (taskListId, desc, filters) =>
    tasksSlice.actions.addTask(taskListId, generateUniqueId(), desc, generateNextColor(), filters);

export const {
    deleteTaskList,
    editTaskListDesc,
    deleteTask,
    editTaskDesc,
    addFilterToTask,
    removeFilterFromTask,
    dragEndUpdate,
} = tasksSlice.actions;
export default tasksSlice.reducer;
