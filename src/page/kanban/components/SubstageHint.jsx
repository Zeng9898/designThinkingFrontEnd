import React from 'react'

const SubstageHint = () => {
    return (
        <div className='bg-gray-100 p-3 rounded-md shadow-lg flex flex-col overflow-auto max-w-[282px]  w-full  max-h-[15vh] flex-shrink-0 border-2 border-solid border-gray-300'>
            <h5 className='  font-semibold text-[16px] flex mb-2 justify-center text-xl text-gray-600'>
                1-1 任務說明           
             </h5>
            <span className=' text-[14px] my-3 text-base leading-5 '>在此階段中參與者需要定義出與主題有關的利害關係人，通常會先讓組別中的每個人獨自提出想法，再綜合組別裡的每個人的想法。</span>
        </div>
    )
}

export default SubstageHint