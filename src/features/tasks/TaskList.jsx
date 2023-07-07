import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import CrossButton from "../../components/CrossButton";
import EditableText from "../../components/EditableText";
import { useDispatch } from "react-redux";
import { editTaskListDesc } from "./tasksSlice";
import { generateFontColor } from "../../utils/colorUtils";

const TaskList = ({ taskList, index }) => {
    const dispatch = useDispatch();

    return (
        <Draggable draggableId={`${taskList.id}-drag`} index={index}>
            {(provided) => (
                <section
                    className="mx-2 flex h-full w-80 flex-col rounded-2xl border-8"
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
                        <CrossButton size={40} />
                    </div>
                    <div className="w-fill relative h-16">
                        <CrossButton
                            plus={true}
                            color="#00cc00"
                            size={40}
                            className="right-1/2 translate-x-1/2 bg-yellow-200"
                        />
                    </div>
                    <Droppable droppableId={`${taskList.id}-drop`} type="task">
                        {(provided) => (
                            <div
                                className="flex h-full w-full flex-col overflow-y-auto overflow-x-clip rounded-md px-2 pb-4"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >

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
