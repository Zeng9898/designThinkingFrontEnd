import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useEffect } from 'react';
import Column from './components/column';
import NormalColumn from './components/NormalColumn';
import { NavbarWhite } from '../../components';
import SubstageHint from './components/SubstageHint';
import styles from '../../styles';
import { theme } from '../../assets';
import { thinkingRoutines } from '../../constants';
import axios from '../../api/axios';

import { io } from 'socket.io-client';

const KanbanPage = () => {
    const [socket, setSocket] = useState(null);

    const [designThinkingActivityName, setdesignThinkingActivityName] = useState("");
    const [subStageHint, setSubStageHint] = useState("");
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
        async function fetchDesignThinkingActivity() {
            await axios.get('/api/designThinkingActivity/5').then((response) => {
                console.log(response);
                const designThinkingActivityName = response.data.dtActivityName;
                const hint = response.data.stages[0].substages[0].subStageHint;
                const thinkingRoutines = response.data.stages[0].substages[0].thinkingRoutines;
                console.log(thinkingRoutines);
                setdesignThinkingActivityName(designThinkingActivityName);
                setSubStageHint(hint);
                setToBeAssigned(thinkingRoutines.filter((routine) => routine.belongColumn === "待排程").sort((a, b) => a.price - b.price));
                setInProgress(thinkingRoutines.filter((routine) => routine.belongColumn === "進行中").sort((a, b) => a.price - b.price));
                setToBeChecked(thinkingRoutines.filter((routine) => routine.belongColumn === "待審核").sort((a, b) => a.price - b.price));
                setCompleted(thinkingRoutines.filter((routine) => routine.belongColumn === "已完成").sort((a, b) => a.price - b.price));
            }).catch(err => {
                console.log(err);
            })
        }
        fetchDesignThinkingActivity();
    }, [])


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
        } else if (source.droppableId === "1") {
            item = toBeAssignedCopy.splice(result.source.index, 1)[0]
        }
        // add item
        if (destination.droppableId === "2") {
            inProgressCopy.splice(result.destination.index, 0, item);
        } else if (destination.droppableId === "1") {
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
                <div className='text-[14px]'> 主題 - {designThinkingActivityName} </div>
            </div>
            <div className={`flex flex-row justify-start `}>
                <div className={`sm:px-16 px-6 flex justify-start flex-row`}>
                    <SubstageHint subStageHint={subStageHint} />
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