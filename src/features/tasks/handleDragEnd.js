export const handleDragEnd = (state, action) => {
    const { destination, source, type, draggableId } = action.payload;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;

    if (type === "taskList") {
        const draggedTaskList = state.splice(source.index, 1);
        state.splice(destination.index, 0, draggedTaskList[0]);
    } else {
        if (destination.droppableId === source.droppableId) {
            const taskListId = getTaskListIdDroppable(destination.droppableId);
            const taskList = getTaskList(state, taskListId);
            const taskIndex = getTaskIndex(taskList, draggableId);
            const draggedTask = taskList.tasks.splice(taskIndex, 1);
            taskList.tasks.splice(destination.index, 0, draggedTask[0]);
        } else {
            const sourceTaskListId = getTaskListIdDroppable(source.droppableId);
            const destinationTaskListId = getTaskListIdDroppable(destination.droppableId);

            const sourceTaskList = getTaskList(state, sourceTaskListId);
            const destinationTaskList = getTaskList(state, destinationTaskListId);

            const taskIndex = getTaskIndex(sourceTaskList, draggableId);
            const draggedTask = sourceTaskList.tasks.splice(taskIndex, 1);
            destinationTaskList.tasks.splice(destination.index, 0, draggedTask[0]);
        }
    }
};

const getTaskListIdDroppable = (droppableId) => {
    return droppableId.substring(0, droppableId.lastIndexOf("-"));
};

const getTaskList = (state, taskListId) => {
    for (let taskList of state) {
        if (taskList.id === taskListId) {
            return taskList;
        }
    }
};

const getTaskIndex = (taskList, taskId) => {
    for (let i = 0; i < taskList.tasks.length; i++) {
        if (taskList.tasks[i].id === taskId) {
            return i;
        }
    }
}; 