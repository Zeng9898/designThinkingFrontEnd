import React, { useState, useEffect, useRef } from 'react';
import Modal from '../../components/Modal';
// import IdeaWallSideBar from './components/IdeaWallSideBar';
import TopBar from './components/TopBar';
import { Network } from 'vis-network';
import { visNetworkOptions as option } from '../../utils/visNetworkOptions';
import svgConvertUrl from '../../utils/svgConvertUrl';
import SideBar from './components/SideBar';
// import { useQuery } from 'react-query';
// import { getIdeaWall, addIdeaWall, updateIdeaWall, deleteIdeaWall } from '../../api/ideaWall';
// import { socket } from '../../utils/Socket';
import { fakeNodes } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

export default function IdeaWall() {
    const container = useRef(null);
    // const url = svgConvertUrl("node");
    // console.log(url);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [nodeData, setNodeData] = useState({ title: "", content: "" });
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        let url;
        const edgeForVis = []
        const nodesForVis = []
        fakeNodes.map(node => {
            url = svgConvertUrl(node.title);
            nodesForVis.push({
                id: node.id,
                image: url,
                shape: "image",
                x: 0,
                y: 0,
            })
            if (node.to !== null) {
                edgeForVis.push({
                    from: node.id,
                    to: node.to
                })
            }
        })
        setEdges(edgeForVis);
        setNodes(nodesForVis);
    }, [fakeNodes]);

    const [openCreateOption, setOpenCreateOption] = useState(false);
    const [openBuildOption, setOpenBuildOption] = useState(false);
    const [openCreateNode, setOpenCreateNode] = useState(false);
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
            console.log('right click');
            const { pointer } = properties;
            const x_coordinate = pointer.DOM.x;
            const y_coordinate = pointer.DOM.y;
            console.log('x:', x_coordinate, "y:", y_coordinate);
            setOpenCreateOption(true);
            setCanvasPosition({ x: x_coordinate, y: y_coordinate })
        })

        network?.on("click", (properties) => {
            console.log('click', properties);
            setOpenCreateOption(false);
            setOpenBuildOption(false);
        })

        network?.on("selectNode", (properties) => {
            console.log('select');
            setTimeout(() => {
                // console.log(properties);
                const { pointer } = properties;
                const x_coordinate = pointer.DOM.x;
                const y_coordinate = pointer.DOM.y;
                console.log('x:', x_coordinate, "y:", y_coordinate);
                setCanvasPosition({ x: x_coordinate, y: y_coordinate })
                setOpenBuildOption(true);
                setSelectedId(properties.nodes[0]);
            }, 100);
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setOpenCreateNode(false)
        const newNodeUrl = svgConvertUrl(title)
        const uniqueId = uuidv4();
        setNodes(prev => {
            return [...prev,
            { id: uniqueId, image: newNodeUrl, shape: "image"}
            ]
        })
        if (selectedId !== null) {
            setEdges(prev => {
                return [...prev,
                { from: uniqueId, to: selectedId }
                ]
            })
        }
        setTitle("");
        setContent("");
    }

    const viewNode = () => {
        console.log("viewing")
        console.log(selectedId);
        const node = nodes.find((node) => node.id === selectedId);
        console.log(node);
        setTitle(node.id);
        setContent(node.id);
        setOpenCreateNode(true)
        setOpenCreateOption(false);
        setOpenBuildOption(false);
    }

    return (

        <div>
            <TopBar />
            <SideBar />
            {
                //to do ? :
                <div ref={container} className=' h-screen' onContextMenu={(e) => e.preventDefault()} />
            }
            <Modal open={openCreateOption} onClose={() => setOpenCreateOption(false)} opacity={false} modalCoordinate={canvasPosition} custom={"w-30 h-15"}>
                <div>
                    <button onClick={() => {
                        setOpenCreateOption(false);
                        setOpenCreateNode(true);
                        setSelectedId(null);
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
                        setOpenCreateOption(false);
                        setOpenBuildOption(false);
                        setOpenCreateNode(true);
                    }} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        灌溉節點
                    </button>
                    <button onClick={viewNode} className='w-full h-full p-2 rounded-md bg-white hover:bg-slate-100'>
                        檢視節點
                    </button>
                </div>
            </Modal>
            <Modal open={openCreateNode} onClose={() => setOpenCreateNode(false)} opacity={false} position={"justify-center items-center"}>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col p-3'>
                        {/* <h3 className=' font-bold text-base mb-3'></h3> */}
                        <p className=' font-bold text-base mb-3'>標題</p>
                        <input className="rounded-sm outline-none ring-2 p-1 bg-myGray w-full mb-3"
                            type="text"
                            placeholder="標題"
                            name='title'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                        <p className=' font-bold text-base mb-3'>內容</p>
                        <textarea className=" rounded outline-none ring-2 bg-myGray w-full p-1"
                            rows={3}
                            placeholder="內容"
                            name='content'
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            required
                        />
                    </div>
                    <div className='flex justify-end m-2'>
                        <button onClick={() => setOpenCreateNode(false)} className=" cursor-pointer shadow-sm mx-auto w-full h-7 mb-2 bg-myBlue3 hover:bg-myBlue4 rounded font-bold text-xs sm:text-sm text-black/60 mr-2" >
                            取消
                        </button>
                        <button type='submit' className="z-51 cursor-pointer shadow-sm bg-myOrange hover:bg-orange-500 mx-auto w-full h-7 mb-2 bg-customgreen rounded font-bold text-xs sm:text-sm text-black/70">
                            儲存
                        </button>

                    </div>
                </form>
            </Modal>
        </div>
    )
}
