export const handleDragEnd = (state, action) => {
    const { destination, source, type } = action.payload;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;

    if (type === "taskList") {
        const draggedTaskList = state.splice(source.index, 1);
        state.splice(destination.index, 0, draggedTaskList[0]);
    } else {
        if (destination.droppableId === source.droppableId) {
            const taskListId = destination.droppableId.substring(
                0,
                destination.droppableId.lastIndexOf("-")
            );
            for (let taskList of state) {
                if (taskList.id === taskListId) {
                    const draggedTask = taskList.tasks.splice(source.index, 1);
                    taskList.tasks.splice(destination.index, 0, draggedTask[0]);
                    break;
                }
            }
        } else {
            const sourceTaskListId = source.droppableId.substring(
                0,
                source.droppableId.lastIndexOf("-")
            );
            const destinationTaskListId = destination.droppableId.substring(
                0,
                destination.droppableId.lastIndexOf("-")
            );

            let draggedTask = null;

            for (let taskList of state) {
                if (taskList.id === sourceTaskListId) {
                    draggedTask = taskList.tasks.splice(source.index, 1);
                    break;
                }
            }

            if (!draggedTask) return;
            for (let taskList of state) {
                if (taskList.id === destinationTaskListId) {
                    taskList.tasks.splice(destination.index, 0, draggedTask[0]);
                    break;
                }
            }
        }
    }
};
