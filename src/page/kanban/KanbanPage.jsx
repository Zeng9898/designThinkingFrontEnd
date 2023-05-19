import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useEffect } from 'react';
import Column from './components/column';
import NormalColumn from './components/NormalColumn';
import { NavbarWhite } from '../../components';
import SubstageHint from './components/SubstageHint';
import styles from '../../styles';
import { theme } from '../../assets';
import { thinkingRoutines } from '../../constants';

import { io } from 'socket.io-client';

const KanbanPage = () => {
    const [socket, setSocket] = useState(null);

    const [toBeAssigned, setToBeAssigned] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [toBeChecked, setToBeChecked] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.on('connect', () => {
            console.log('Socket connected', socket.id);
        });
        socket.on('updateBoard', (cards) => {
            setToBeAssigned(cards.toBeAssigned);
            setInProgress(cards.inProgress);
            setToBeChecked(cards.toBeChecked);
            setCompleted(cards.completed);
        })
        // socket.on('test event', count => {
        //   console.log(count)
        // })
        setSocket(socket);
        // Clean up the connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setToBeAssigned(thinkingRoutines.filter((routine) => routine.stackId === "待排程"));
        setInProgress(thinkingRoutines.filter((routine) => routine.stackId === "進行中"));
        setToBeChecked(thinkingRoutines.filter((routine) => routine.stackId === "待審核"));
        setCompleted(thinkingRoutines.filter((routine) => routine.stackId === "已完成"));
    }, []);
    // 拖曳、刪除、新增、修改（把修改後的推給後端）
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

    // function findItemById(id, array) {
    //     return array.find((item) => item.id == id);
    // }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    function handleDragEnd(result) {
        if (!result?.destination) return
        const { destination, source, draggableId } = result;
        if (source.droppableId == destination.droppableId && source.index == destination.index) return;
        console.log("起點 droppableId 和 index", source.droppableId, " ", source.index)
        console.log("終點 droppableId 和 index", destination.droppableId, " ", destination.index)

        const toBeAssignedCopy = [...toBeAssigned];
        const inProgressCopy = [...inProgress];

        let item;
        // remove item
        if (source.droppableId === "2") {
            item = inProgressCopy.splice(result.source.index, 1)[0]
        } else if (source.droppableId == "1") {
            item = toBeAssignedCopy.splice(result.source.index, 1)[0]
        }
        // add item
        if (destination.droppableId === "2") {
            inProgressCopy.splice(result.destination.index, 0, item);
        } else if (destination.droppableId == "1") {
            toBeAssignedCopy.splice(result.destination.index, 0, item);
        }
        setInProgress(inProgressCopy);
        setToBeAssigned(toBeAssignedCopy);

        if (socket != null) {
            socket.emit('updateBoard', { toBeAssigned: toBeAssignedCopy, inProgress: inProgressCopy, toBeChecked: toBeChecked, completed: completed });
        }
    }

    return (
        <div className='w-full bg-myGray  h-full'>
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
            <div className={`flex justify-start items-start `}>
                <div className={`flex flex-row py-10 justify-between items-start sm:px-16 px-6 flex-wrap`}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {/* <Column title={"定義利害關係人模板"} tasks={incomplete} id={"1"} /> */}
                        <Column title={"待排程"} routines={toBeAssigned} id={"1"} />
                        <Column title={"進行中"} routines={inProgress} id={"2"} />
                        {/* <Column title={"已完成"} tasks={[]} id={"3"} /> */}
                    </DragDropContext>
                    <NormalColumn title={"待審核"} routines={toBeChecked} id={"3"} />
                    <NormalColumn title={"已完成"} routines={completed} id={"4"} />
                </div>
            </div>
        </div>
    )
}

export default KanbanPage