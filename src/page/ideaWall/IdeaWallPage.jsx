import React, { useState, useEffect, useRef, useContext } from 'react';
import Modal from '../../components/Modal';
// import IdeaWallSideBar from './components/IdeaWallSideBar';
import TopBar from './components/TopBar';
import { Network } from 'vis-network';
import { visNetworkOptions as option } from '../../utils/visNetworkOptions';
import svgConvertUrl from '../../utils/svgConvertUrl';
import SideBar from './components/SideBar';
// import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "react-query"
import AuthContext from '../../context/AuthProvider';
import { io } from 'socket.io-client';
import { getThinkingRoutine } from '../../api/thinkingRoutine';

export default function IdeaWall() {
    let { kanbanId, thinkingRoutineId } = useParams();
    const { auth } = useContext(AuthContext);
    // console.log(kanbanId, thinkingRoutineId);
    const queryClient = useQueryClient()
    const container = useRef(null);

    const {
        isLoading,
        isError,
        error,
        data,
        refetch
    } = useQuery('thinkingRoutine', () => getThinkingRoutine(thinkingRoutineId));

    // orgnize when fetch
    useEffect(() => {
        if(data){
            console.log(data);
            let url;
            const edgeForVis = []
            const nodesForVis = []
            data.ideas.map(idea => {
                url = svgConvertUrl(idea.title);
                nodesForVis.push({
                    id: idea.id,
                    image: url,
                    shape: "image",
                    x: 0,
                    y: 0,
                })
                if (idea.to !== null && idea.to !== undefined) {
                    edgeForVis.push({
                        from: idea.id,
                        to: idea.to[0]?.id
                    })
                }
            })
            setEdges(edgeForVis);
            setNodes(nodesForVis);
        }
    }, [data])
    // const url = svgConvertUrl("node");
    // console.log(url);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [nodeData, setNodeData] = useState({});
    const [buildOnNodeId, setBuildOnId] = useState(null)
    const [socket, setSocket] = useState(null);


    useEffect(() => {
        const socket = io('http://10.242.104.221:3000');
        socket.on('connect', () => {
            console.log('Socket connected', socket.id);
        });

        socket.emit('join-room', thinkingRoutineId);

        socket.on('errorEvent', (errorMessage) => {
            // Handle the error message
            console.log('Error:', errorMessage);
            // You can set the error message in your component state or trigger any other necessary actions
        });
        socket.on("nodeUpdated", (msg) => {
            console.log(msg);
            refetch();
        });
        setSocket(socket);
        // Clean up the connection when the component unmounts
        return () => {
            socket.emit('leave-room', thinkingRoutineId);
            socket.disconnect();
        };
    }, []);

    const [openCreateOption, setOpenCreateOption] = useState(false);
    const [openBuildOption, setOpenBuildOption] = useState(false);
    const [openCreateNode, setOpenCreateNode] = useState(false);
    const [updateNodeModalOpen, setUpdateNodeModalOpen] = useState(false);
    const [selectNodeInfo, setSelectNodeInfo] = useState({ id: "", title: "", content: "", owner: "", to: "" });
    const [canvasPosition, setCanvasPosition] = useState({});

    // const {
    //     isLoading,
    //     isError,
    //     error,
    //     data: ideaWallDatas
    // } = useQuery( 'ideaWallDatas', getIdeaWall, {onSuccess: (ideaWallDatas)=>{
    //     const { nodes, edges } = ideaWallDatas;
    //     setNodes(nodes);
    //     setEdges(edges);
    // }})

    // useEffect(() => {
    //     socket.connect();
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        const network =
            container.current &&
            new Network(container.current, { nodes, edges }, option);

        network?.on("oncontext", (properties) => {
            const { pointer, event } = properties;
            event.preventDefault();
            const x_coordinate = pointer.DOM.x;
            const y_coordinate = pointer.DOM.y;
            const oncontextSelectNode = network.getNodeAt({ x: x_coordinate, y: y_coordinate })
            if (oncontextSelectNode) {
                setOpenBuildOption(true);
                setBuildOnId(oncontextSelectNode)
            } else {
                setOpenCreateOption(true);
            }
            setCanvasPosition({ x: x_coordinate, y: y_coordinate })
        })

        network?.on("click", (properties) => {
            console.log('click');
            setOpenCreateOption(false);
            setOpenBuildOption(false);
        })

        network?.on("selectNode", ({ nodes: selectNodes }) => {
            // console.log('select');
            // setTimeout(() => {
            //     // console.log(properties);
            //     const { pointer } = properties;
            //     const x_coordinate = pointer.DOM.x;
            //     const y_coordinate = pointer.DOM.y;
            //     console.log('x:', x_coordinate, "y:", y_coordinate);
            //     setCanvasPosition({ x: x_coordinate, y: y_coordinate })
            //     setOpenBuildOption(true);
            //     setSelectedId(properties.nodes[0]);
            // }, 100);
            setUpdateNodeModalOpen(true);
            let nodeId = selectNodes[0];
            let nodeInfo = data?.ideas.filter(idea => idea.id === nodeId)

            setSelectNodeInfo(nodeInfo[0])
            console.log(nodeInfo);
        })

        return () => {
            network?.off("click", ({ event }) => {
                console.log(event);
            })
            network?.off("selectNode", ({ event }) => {
                console.log(event);
            })
            network?.off("oncontext", ({ event }) => {
                console.log(event);
            })
        }
    }, [container, nodes, edges]);


    const handleChange = (e) => {
        const { name, value } = e.target
        setNodeData(prevData => ({
            ...prevData,
            [name]: value,
            owner: auth.nickname,
            to: buildOnNodeId,
            thinkingRoutineId: thinkingRoutineId
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(nodeData);
        if (socket != null) {
            socket.emit('createNode', thinkingRoutineId, nodeData);
        }
        setOpenCreateNode(false);
        // e.preventDefault()
        // setOpenCreateNode(false)
        // const newNodeUrl = svgConvertUrl(title)
        // const uniqueId = uuidv4();
        // setNodes(prev => {
        //     return [...prev,
        //     { id: uniqueId, image: newNodeUrl, shape: "image" }
        //     ]
        // })
        // if (buildOnNodeId !== null) {
        //     setEdges(prev => {
        //         return [...prev,
        //         { from: uniqueId, to: buildOnNodeId }
        //         ]
        //     })
        // }
        // setBuildOnId(null);
    }

    const handleUpdataChange = (e) => {
        const { name, value } = e.target
        setSelectNodeInfo(prevData => ({
            ...prevData,
            [name]: value,
            ideaWallId: ideaWallInfo.id,
            owner: localStorage.getItem("username")
        }));
    }

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (isError){
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <TopBar />
            <SideBar thinkingRoutineName={data.thinkingRoutineName} routineType={data.routineType} hint={data.hint} assignees={data.assignees} />
            {
                //to do ? :
                <div ref={container} className='h-[calc(100vh-66px)]' onContextMenu={(e) => e.preventDefault()} />
            }
            <Modal open={openCreateOption} onClose={() => setOpenCreateOption(false)} opacity={false} modalCoordinate={canvasPosition} custom={"w-30 h-15"}>
                <div>
                    <button onClick={() => {
                        setOpenCreateOption(false);
                        setOpenCreateNode(true);
                        setBuildOnId(null);
                    }} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        建立節點
                    </button>
                    {/* <button onClick={() => setOpenCreateOption(false)} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        取消
                    </button> */}
                </div>
            </Modal>
            <Modal open={openBuildOption} onClose={() => setOpenBuildOption(false)} opacity={false} modalCoordinate={canvasPosition} custom={"w-30 h-15"}>
                <div>
                    <button onClick={() => {
                        setOpenBuildOption(false);
                        setOpenCreateNode(true);
                    }} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        灌溉節點
                    </button>
                    {/* <button onClick={viewNode} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        檢視節點
                    </button> */}
                </div>
            </Modal>
            <Modal open={openCreateNode} onClose={() => setOpenCreateNode(false)} opacity={false} position={"justify-center items-center"}>
                <form>
                    <div className='flex flex-col p-3'>
                        <h3 className=' font-bold text-base mb-3'>建立節點</h3>
                        <p className=' font-bold text-base mb-3'>標題</p>
                        <input className="rounded-sm outline-none ring-2 p-1 bg-myGray w-full mb-3"
                            type="text"
                            placeholder="標題"
                            name='title'
                            onChange={handleChange}
                            required
                        />
                        <p className=' font-bold text-base mb-3'>內容</p>
                        <textarea className=" rounded outline-none ring-2 bg-myGray w-full p-1"
                            rows={3}
                            placeholder="內容"
                            name='content'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex justify-end m-2'>
                        <button onClick={(e) => { e.preventDefault(); setOpenCreateNode(false); }} className="cursor-pointer shadow-sm mx-auto w-full h-7 mb-2 bg-myBlue3 hover:bg-myBlue4 rounded font-extrabold text-xs sm:text-sm text-black/60 mr-2" >
                            取消
                        </button>
                        <button onClick={handleSubmit} className="z-51 cursor-pointer shadow-sm bg-myOrange hover:bg-orange-500 mx-auto w-full h-7 mb-2 bg-customgreen rounded font-extrabold text-xs sm:text-sm text-black/70">
                            儲存
                        </button>

                    </div>
                </form>
                {/* update Node*/}
            </Modal>
            {
                selectNodeInfo &&
                <Modal open={updateNodeModalOpen} onClose={() => setUpdateNodeModalOpen(false)} opacity={false} position={"justify-center items-center"}>
                    <div className='flex flex-col p-3'>
                        <h3 className=' font-bold text-base mb-3'>檢視便利貼</h3>
                        <p className=' font-bold text-base mb-3'>標題</p>
                        <input className=" rounded outline-none ring-2 p-1 ring-customgreen w-full mb-3"
                            type="text"
                            placeholder="標題"
                            name='title'
                            value={selectNodeInfo.title}
                            readOnly
                        />
                        <p className=' font-bold text-base mb-3'>內容</p>
                        <textarea className=" rounded outline-none ring-2 ring-customgreen w-full p-1"
                            rows={3}
                            placeholder="內容"
                            name='content'
                            value={selectNodeInfo.content}
                            readOnly
                        />
                        <p className=' font-bold text-base mt-3'>建立者: {selectNodeInfo.owner.nickname}</p>
                    </div>
                    {
                        // localStorage.getItem("username") === selectNodeInfo.owner ?
                        //     (
                        //         <div className='flex flex-row justify-between m-2'>
                        //             <button onClick={handleDelete} className="w-16 h-7 bg-red-500 rounded font-bold text-xs sm:text-bas text-white mr-2" >
                        //                 刪除
                        //             </button>
                        //             <div className='flex'>
                        //                 <button onClick={() => setUpdateNodeModalOpen(false)} className="w-16 h-7  bg-customgray rounded font-bold text-xs sm:text-bas text-black/60 mr-2" >
                        //                     取消
                        //                 </button>
                        //                 <button onClick={handleUpdateSubmit} className="w-16 h-7 bg-customgreen rounded font-bold text-xs sm:text-bas text-white">
                        //                     儲存
                        //                 </button>
                        //             </div>
                        //         </div>
                        //     ) : 
                            (
                                <div className='flex justify-end m-2'>
                                    <button onClick={() => setUpdateNodeModalOpen(false)} className="mx-auto w-1/3 h-7 mb-2 bg-customgreen rounded font-bold text-xs sm:text-base text-black mr-2" >
                                        關閉
                                    </button>
                                </div>
                            )
                    }
                </Modal>
            }
        </div>
    )
}
