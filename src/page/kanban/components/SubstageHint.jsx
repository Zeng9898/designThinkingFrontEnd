import React from 'react'
import styles from '../../../styles'

const SubstageHint = ({ subStageHint }) => {
    return (
        <div className='bg-gray-100 p-3 rounded-md shadow-lg flex flex-col overflow-auto max-w-[282px]  w-full  max-h-[15vh] flex-shrink-0 border-2 border-solid border-gray-300'>
            <h5 className='  font-semibold text-[16px] flex mb-2 justify-center text-xl text-gray-600'>
                1-1 任務說明
            </h5>
            <span className={` text-[14px] my-3 ${styles.paragraph2}`}>{subStageHint}</span>
        </div>
    )
}

export default SubstageHint