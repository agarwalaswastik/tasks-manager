import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CrossButton from "../../components/CrossButton";
import EditableText from "../../components/EditableText";
import { useDispatch } from "react-redux";
import { addTask, deleteTaskList, editTaskListDesc } from "./tasksSlice";
import { generateFontColor } from "../../utils/colorUtils";
import Task from "./Task";
import { useSelector } from "react-redux";

const TaskList = ({ taskList, index }) => {
    const searchFilterIds = useSelector(state => state.search.searchFilterIds);
    const searchQuery = useSelector(state => state.search.searchQuery);
    const dispatch = useDispatch();

    const searchedTasks = taskList.tasks.filter((task) => {
        if (!task.desc.includes(searchQuery)) {
            return false;
        }
        for (let searchFilterId of searchFilterIds) {
            if (task.filters.indexOf(searchFilterId) === -1) {
                return false;
            }
        }
        return true;
    });

    const handleAddTask = () => {
        dispatch(addTask(taskList.id, searchQuery.length ? searchQuery : "New Task", searchFilterIds));
    };

    const handleDeleteTaskList = () => {
        dispatch(deleteTaskList(taskList.id));
    };

    return (
        <Draggable draggableId={`${taskList.id}-drag`} index={index}>
            {(provided) => (
                <section
                    className="mx-2 flex h-full w-72 flex-col rounded-2xl border-8"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={{
                        borderColor: taskList.color,
                        ...provided.draggableProps.style,
                    }}
                >
                    <div
                        className="relative h-20 w-full rounded-se-md rounded-ss-md pl-2"
                        {...provided.dragHandleProps}
                        style={{
                            backgroundColor: taskList.color,
                            color: generateFontColor(taskList.color),
                        }}
                    >
                        <EditableText
                            text={taskList.desc}
                            setText={(text) => dispatch(editTaskListDesc(taskList.id, text))}
                            renderText={(text) => text}
                            className="h-16 w-[85%] overflow-auto break-words text-xl font-semibold"
                        />
                        <CrossButton size={40} onClick={handleDeleteTaskList} />
                    </div>
                    <div className="w-fill relative h-20">
                        <CrossButton
                            plus={true}
                            color="#00cc00"
                            size={40}
                            className="right-1/2 translate-x-1/2 bg-yellow-200"
                            onClick={handleAddTask}
                        />
                    </div>
                    <Droppable droppableId={`${taskList.id}-drop`} type="task">
                        {(provided) => (
                            <div
                                className="flex h-full w-full flex-col overflow-y-auto overflow-x-clip rounded-md px-2"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {searchedTasks.map((task, index) => (
                                    <Task key={task.id} task={task} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </section>
            )}
        </Draggable>
    );
};

TaskList.propTypes = {
    taskList: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default TaskList;
