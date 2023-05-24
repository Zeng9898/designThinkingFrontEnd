import { StrictModeDroppable as Droppable } from "../../../utils/StrictModeDroppable"
import Routine from "./Routine"
import { v4 as uuidv4 } from 'uuid';

const Column = ({ title, routines, id }) => {
    return (
        <Droppable droppableId={id}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ background: snapshot.isDraggingOver ? '#FFED7D' : '' }}
                    className={`w-[282px] h-[calc(100vh-350px)] rounded-sm  bg-white mr-4 overflow-y-scroll`}>
                    <header className={`z-10 text-[16px] font-semibold text-left p-3 sticky top-0 bg-white`}>{title}</header>
                    <ul className={`pt-2 rounded-md `}>
                        {routines.map((routine, index) => (
                            <Routine key={routine.id} routine={routine} index={index} />
                        ))}
                    </ul>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Column