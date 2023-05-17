import { StrictModeDroppable as Droppable } from "../../../utils/StrictModeDroppable"
import Routine from "./Routine"
import { v4 as uuidv4 } from 'uuid';

const Column = ({ title, routines, id }) => {
    return (
        <div className={`w-[282px] h-[calc(100vh-350px)] rounded-sm overflow-y-scroll  bg-white mr-4  `}>
            <header className={`text-[16px] font-semibold text-left p-3 sticky top-0 bg-white`}>{title}</header>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ background: snapshot.isDraggingOver ? '#FFED7D' : '' }}
                        className={`pt-2 h-full rounded-md`}
                    >
                        {routines.map((routine, index) => (
                            <Routine key={uuidv4()} routine={routine} index={index} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            
        </div>
    )
}

export default Column