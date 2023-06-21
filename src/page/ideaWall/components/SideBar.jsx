import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { GrPrevious } from 'react-icons/gr';
import styles from '../../../styles';
import AvatarGroup from 'react-avatar-group';
import { useParams, useNavigate } from 'react-router-dom';


const SideBar = ({ thinkingRoutineName, routineType, hint, assignees }) => {
    const [open, setOpen] = useState(true);
    let { kanbanId } = useParams();
    const navigate = useNavigate();

    return (
        <div className={`absolute z-10 flex flex-row h-[calc(100vh+0px)] overflow-y-auto inset-y-0 left-0 `}>
            <div className='py-3 flex flex-col justify-start items-center w-[55px] bg-borderBlue'>
                <div className="tooltip tooltip-right" data-tip="更多資訊">
                    <FaBars size={33} color='myBlue' className='cursor-pointer my-[15px] hover:bg-zinc-300 rounded-md p-1' onClick={() => setOpen(!open)} />
                </div>
                <div className="tooltip tooltip-right" data-tip="回到管理頁面">
                    <GrPrevious size={35} color='black' className='cursor-pointer my-[15px] hover:bg-zinc-300 rounded-md p-1' onClick={() => {navigate(`/kanban/${kanbanId}`); console.log('click go back')}} />
                </div>
            </div>
            <div className={`flex flex-col justify-start px-[20px] pt-[20px] max-w-[318px] bg-white border-r-2 border-zinc-300 ${open ? 'dissolve' : 'dissolveHidden'}  `}>
                <div className='flex flex-row'>
                    <h1 className='text-[18px] font-semibold '>
                        {thinkingRoutineName}
                    </h1>
                    <div className="badge badge-primary self-center mx-[2px]">{routineType}</div>
                </div>
                <div>
                    <h2 className='text-[16px] font-semibold mt-[15px]'>說明</h2>
                    <p className={`font-poppins font-normal text-[14px] leading-[20px] mt-[10px]`}>{hint}</p>
                </div>
                <div>
                    <h2 className='text-[16px] font-semibold mt-[15px]'>建議</h2>
                    <p className={`font-poppins font-normal  text-[14px] leading-[20px] mt-[10px]`}>可以對白板點擊「右鍵」來建立節點，或對已存在的節點點擊「右鍵」來延伸更多想法！</p>
                </div>
                <div className='mb-[15px]'>
                    <h2 className='text-[16px] font-semibold mb-[10px]'>指派對象</h2>
                    <AvatarGroup
                            avatars={assignees.map(assignee => { return assignee.nickname })}
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
                </div>
                <hr />
            </div>
        </div>
    )
}

export default SideBar