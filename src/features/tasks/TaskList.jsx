import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const TaskList = ({ taskList, index }) => {
    return (
        <Draggable draggableId={`${taskList.id}-drag`} index={index}>
            {(provided) => (
                <section
                    className="mx-2 flex h-full w-72 flex-col rounded-md border border-black"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div>
                    
                    </div>
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
