import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { GrPrevious } from 'react-icons/gr';
import styles from '../../../styles';

const SideBar = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className={`absolute z-10 flex flex-row h-[calc(100vh+66px)] overflow-y-scroll inset-y-0 left-0 `}>
            <div className='py-3 flex flex-col justify-start items-center w-[55px] bg-borderBlue'>
                <div className="tooltip tooltip-right" data-tip="更多資訊">
                    <FaBars size={33} color='myBlue' className='cursor-pointer my-[15px] hover:bg-zinc-300 rounded-md p-1' onClick={() => setOpen(!open)} />
                </div>
                <div className="tooltip tooltip-right" data-tip="回到管理頁面">
                    <GrPrevious size={35} color='black' className='cursor-pointer my-[15px] hover:bg-zinc-300 rounded-md p-1' /*onClick={() => setOpen(!open)}*/ />
                </div>
            </div>
            <div className={`flex flex-col justify-start px-[20px] pt-[20px] max-w-[318px] bg-white border-r-2 border-zinc-300 ${open ? 'dissolve' : 'dissolveHidden'}  `}>
                <div className='flex flex-row'>
                    <h1 className='text-[18px] font-semibold '>
                        列出厲害關係人
                    </h1>
                    <div className="badge badge-primary self-center mx-[2px]">發散</div>
                    <div className="badge badge-primary self-center mx-[2px]">協作</div>
                </div>
                <div>
                    <h2 className='text-[16px] font-semibold mt-[15px]'>說明</h2>
                    <p className={`font-poppins font-normal text-[14px] leading-[20px] mt-[10px]`}>在此任務中需要同列出有哪些利害關係人</p>
                </div>
                <div>
                    <h2 className='text-[16px] font-semibold mt-[15px]'>建議</h2>
                    <p className={`font-poppins font-normal  text-[14px] leading-[20px] mt-[10px]`}>可以對白板雙擊「左鍵」來建立節點，或對已存在的節點點擊「右鍵」來延伸更多想法！</p>
                </div>
                <div>
                    <h2 className='text-[16px] font-semibold mt-[15px]'>指派對象</h2>
                    <p className={`font-poppins font-normal text-[14px] leading-[20px] mt-[10px] mb-[30px]`}></p>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default SideBar