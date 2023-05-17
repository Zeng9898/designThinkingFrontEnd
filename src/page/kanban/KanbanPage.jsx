import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useEffect } from 'react';
import Column from './components/column';
import { NavbarWhite } from '../../components';
import SubstageHint from './components/SubstageHint';
import styles from '../../styles';
import { theme } from '../../assets';
import { thinkingRoutines } from '../../constants';

const KanbanPage = () => {
    const [toBeAssigned, setToBeAssigned] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [toBeChecked, setToBeChecked] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        setToBeAssigned(thinkingRoutines.filter((routine) => routine.stackId === "待排程"));
        setInProgress(thinkingRoutines.filter((routine) => routine.stackId === "進行中"));
        setToBeChecked(thinkingRoutines.filter((routine) => routine.stackId === "待審核"));
        setCompleted(thinkingRoutines.filter((routine) => routine.stackId === "已完成"));
        console.log(completed);
        console.log();
    }, []);

    useEffect(() => {
        console.log(toBeAssigned);
        console.log(inProgress);
        console.log(toBeChecked);
        console.log(completed);
    }, [toBeAssigned, inProgress, toBeChecked, completed])

    // const handleDragEnd = (result) => {
    //     const { destination, source, draggableId } = result;

    //     if (source.droppableId == destination.droppableId) return;

    //     //REMOVE FROM SOURCE ARRAY

    //     if (source.droppableId == 2) {
    //         setCompleted(removeItemById(draggableId, completed));
    //     } else {
    //         setIncomplete(removeItemById(draggableId, incomplete));
    //     }

    //     // GET ITEM

    //     const task = findItemById(draggableId, [...incomplete, ...completed]);

    //     //ADD ITEM
    //     if (destination.droppableId == 2) {
    //         setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    //     } else {
    //         setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    //     }
    // };

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div className='w-full bg-myGray overflow-scroll h-screen'>
            <div className={`${styles.paddingX} flex ${styles.flexCenter} bg-white shadow-md border-b-2 border-gray-300 border-solid border-opacity-80`}>
                <div className={`w-full`}>
                    <NavbarWhite />
                </div>
            </div>
            <div className={`${styles.paddingX} flex flex-row justify-start items-center py-5`}>
                <img src={theme} alt="Theme" className='w-[17px] mr-2' />
                <div className='text-[14px]'> 主題 - 改善水壺材質 </div>
            </div>
            <div className={`flex flex-row justify-start `}>
                <div className={`sm:px-16 px-6 flex justify-start flex-row`}>
                    <SubstageHint />
                </div>
            </div>
            {/* <div className={`${styles.paddingX} flex ${styles.flexCenter} bg-white shadow-md border-b-2 border-gray-300 border-solid border-opacity-80`}>
            </div> */}
            <div className={`flex justify-start items-start overflow-x-scroll`}>
                <div className={`flex flex-row py-10 justify-start items-start sm:px-16 px-6 flex-shrink-0`}>
                    <DragDropContext /*onDragEnd={handleDragEnd}*/>
                        {/* <Column title={"定義利害關係人模板"} tasks={incomplete} id={"1"} /> */}
                        <Column title={"待排程"} routines={toBeAssigned} id={"2"} />
                        <Column title={"進行中"} routines={inProgress} id={"3"} />
                        <Column title={"待審核"} routines={toBeChecked} id={"4"} />
                        <Column title={"已完成"} routines={completed} id={"5"} />
                        {/* <Column title={"已完成"} tasks={[]} id={"3"} /> */}
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default KanbanPage