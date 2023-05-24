import { Draggable } from "react-beautiful-dnd"
import { v4 as uuidv4 } from 'uuid';
import AvatarGroup from 'react-avatar-group';

const Routine = ({ routine, index }) => {
    return (
        <Draggable draggableId={`${routine.id}`} key={`${routine.id}`} index={index}>
            {(provided, snapshot) => (
                <section className={`bg-white rounded-sm mb-[8px] min-h-[138px] min-w-[242px] mx-[10px] flex justify-start flex-col p-[20px] pt-[5px] border-2 border-l-8 border-solid border-borderBlue`}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                // isDragging={snapshot.isDragging}
                >
                    <div className={`flex justify-center items-center text-[14px] font-semibold mb-[5px] cursor-pointer hover:bg-borderBlue`}
                        {...provided.dragHandleProps}>
                        {routine.thinkingRoutineName}
                    </div>
                    <div className="flex justify-between p-[3px] pt-[5px]">
                        <span className={` text-[12px] font-medium`}>種類</span>
                        <span className={` text-[12px] font-medium`}>{routine.routineType}</span>
                    </div>
                    <div className="flex justify-between items-center p-[3px]">
                        <span className={` text-[12px] font-medium`}>指派人</span>
                        <AvatarGroup
                            avatars={routine.assignees.map(assignee => { return assignee.nickname })}
                            initialCharacters={1}
                            max={3}
                            size={25}
                            displayAllOnHover
                            shadow={2}
                            itemProps={{
                                style: {
                                    marginRight: `2px`,
                                },
                            }}
                        />
                        {/* <span className={` text-[12px] font-medium`}>{routine.asignees.map((user) => <span key={uuidv4()}>{user}</span>)}</span> */}
                    </div>
                    <div className="flex justify-between p-[3px]">
                        <span className={` text-[12px] font-medium`}>是否需要審核</span>
                        <span className={` text-[12px] font-medium`}>{routine.needChecked ? '是' : '否'}</span>
                    </div>
                    <div className="flex justify-end p-[3px]">
                        <button hidden={routine.belongColumn === '待排程'} className="border-[1px] border-solid border-myGray text-borderBlue text-[12px] font-medium rounded-sm p-[3px] mr-[3px] shadow-md hover:bg-myBlue1">進入</button>
                        <button className="border-[1px] border-solid border-myGray text-borderBlue text-[12px] font-medium rounded-sm p-[3px] shadow-md hover:bg-myBlue1">檢視</button>
                    </div>
                    {provided.placeholder}
                </section>
            )}
        </Draggable>
    )
}

export default Routine