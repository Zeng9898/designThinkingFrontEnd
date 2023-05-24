import AvatarGroup from 'react-avatar-group';

const NormalRoutine = ({ routine, index }) => {
    return (

        <section className={`bg-white rounded-sm mb-[8px] min-h-[138px] min-w-[242px] mx-[10px] flex justify-start flex-col p-[20px] pt-[5px] border-2 border-l-8 border-solid ${routine.belongColumn === '待審核' ? "border-myPink1" : "border-myPink2"}`}>
            <div className={`flex justify-center items-center text-[14px] font-semibold mb-[5px]`}>
                {routine.thinkingRoutineName}
            </div>
            <div className="flex justify-between p-[3px] pt-[5px]">
                <span className={` text-[12px] font-medium`}>種類</span>
                <span className={` text-[12px] font-medium`}>{routine.routineType}</span>
            </div>
            <div className="flex justify-between items-center p-[3px]">
                <span className={` text-[12px] font-medium`}>指派人</span>
                <AvatarGroup
                    avatars={routine.assignees.map(assignee => { return assignee.username })}
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
                <button className="text-[12px] border-[1px] border-solid border-myGray text-gray-500 font-medium rounded-sm p-[3px] mr-[3px] shadow-md hover:bg-gray-200">進入</button>
                <button className="text-[12px] border-[1px] border-solid border-myGray text-gray-500 font-medium rounded-sm p-[3px] shadow-md hover:bg-gray-200">檢視</button>
            </div>
        </section>
    )
}

export default NormalRoutine