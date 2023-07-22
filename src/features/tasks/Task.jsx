import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import CrossButton from "../../components/CrossButton";
import { generateFontColor } from "../../utils/colorUtils";
import EditableText from "../../components/EditableText";
import { useDispatch } from "react-redux";
import { addFilterToTask, deleteTask, editTaskDesc, removeFilterFromTask } from "./tasksSlice";
import FilterListEditor from "../filters/FilterListEditor";

const Task = ({ task, index }) => {
    const dispatch = useDispatch();

    const handleEditDesc = (newDesc) => {
        dispatch(editTaskDesc(task.id, newDesc));
    };

    const handleAddFilter = (filterId) => {
        dispatch(addFilterToTask(task.id, filterId));
    };

    const handleCrossFilter = (filterId) => {
        dispatch(removeFilterFromTask(task.id, filterId));
    };

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id));
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <article
                    className="mb-3 flex h-fit w-full flex-col rounded-2xl border-8"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={{
                        borderColor: task.color,
                        ...provided.draggableProps.style,
                    }}
                >
                    <div
                        className="relative h-6 w-full"
                        style={{
                            backgroundColor: task.color,
                            color: generateFontColor(task.color),
                        }}
                        {...provided.dragHandleProps}
                    >
                        <CrossButton size={30} className="top-2" onClick={handleDeleteTask} />
                    </div>
                    <div className="min-h-[6rem] flex-1 rounded-md p-2">
                        <EditableText
                            text={task.desc}
                            setText={handleEditDesc}
                            renderText={(text) => <p className="inline">{text}</p>}
                            className="break-words"
                        />
                        <div className="h-2"></div>
                        <FilterListEditor
                            filterIds={task.filters}
                            wrap={true}
                            onAdd={handleAddFilter}
                            onCross={handleCrossFilter}
                            filtersClassName="max-w-[10rem]"
                        />
                    </div>
                </article>
            )}
        </Draggable>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default Task;
