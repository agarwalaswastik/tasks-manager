import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import { dragEndUpdate } from "./tasksSlice";

const TaskBoard = () => {
    const taskBoard = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        dispatch(dragEndUpdate(result));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="taskList">
                {(provided) => (
                    <article
                        className="flex h-full w-fit"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {taskBoard.map((taskList, index) => (
                            <TaskList key={taskList.id} taskList={taskList} index={index} />
                        ))}
                        {provided.placeholder}
                    </article>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TaskBoard;
