import React from 'react'
import { NavbarWhite } from '../../components';
import styles from '../../styles';
import { BsPlusCircleFill } from 'react-icons/bs';
import Modal from '../../components/Modal';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { getAllActivityFromAUser } from '../../api/axios';
import { useQuery } from 'react-query';

const ACTIVITY_URL = '/api/designThinkingActivity';

const ActivityPage = () => {
  const [openCreateActivity, setOpenCreateActivity] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const { auth, setAuth } = useContext(AuthContext);

  const {
    isLoading,
    isError,
    error,
    data,
    refetch
  } = useQuery('activities', () => getAllActivityFromAUser(auth.userId));

  useEffect(() => {
    if (data) {
      console.log(data);
      // const designThinkingActivityName = data.dtActivityName;
      // const hint = data.stages[0].substages[0].subStageHint;
      // const thinkingRoutines = data.stages[0].substages[0].thinkingRoutines;
      // console.log(data);
      // setSubstageName(data.stages[0].substages[0].subStageName);
      // setdesignThinkingActivityName(designThinkingActivityName);
      // setSubStageHint(hint);
      // setToBeAssigned(thinkingRoutines.filter((routine) => routine.belongColumn === "待排程").sort((a, b) => a.price - b.price));
      // setInProgress(thinkingRoutines.filter((routine) => routine.belongColumn === "進行中").sort((a, b) => a.index - b.index));
      // setToBeChecked(thinkingRoutines.filter((routine) => routine.belongColumn === "待審核").sort((a, b) => a.price - b.price));
      // setCompleted(thinkingRoutines.filter((routine) => routine.belongColumn === "已完成").sort((a, b) => a.price - b.price));
    }
  }, [data]);

  function generateInvitationCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(ACTIVITY_URL,
        JSON.stringify({ designThinkingActivityName: activityName, designThinkingActivityDescription: activityDescription, leaderId: auth.userId }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setOpenCreateActivity(false);
      console.log(JSON.stringify(response?.data));

    } catch (err) {
      if (!(err?.response)) {
        console.log(err?.message);
      } else {
        console.log(err?.response?.data?.message);
      }
    }
  }


  return (
    <div className='w-full overflow-hiddle h-screen bg-activityPink'>
      <div className={`${styles.paddingX} ${styles.flexCenter}  bg-white shadow-md border-b-2 border-gray-300 border-solid`}>
        <div className={`w-full`}>
          <NavbarWhite />
        </div>
      </div>
      <div className={`${styles.paddingX} flex flex-row justify-between items-center pt-5`}>
        <div className='text-[14px] text-activityGreen font-semibold'> 加入小組或建立設計思考活動！</div>
        <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">輸入邀請碼</button>
      </div>
      <div onClick={() => setOpenCreateActivity(true)} className={`sm:pl-16 pl-6 inline-flex flex-row justify-start items-center py-5 cursor-pointer text-blue-500 hover:text-blue-600`}>
        <p className='text-[16px]  font-semibold mr-2'>建立設計思考活動</p>
        <BsPlusCircleFill className='text-[17px]' />
      </div>
      <div className={`${styles.paddingX} flex flex-row justify-start items-center`}>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-300  w-full">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <p className="inline-block cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">所有設計思考活動</p>
            </li>
            {/* <li class="mr-2">
            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Settings</a>
          </li>
          <li>
            <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
          </li> */}
          </ul>
        </div>
      </div>
      <div className={`${styles.paddingX} flex flex-row justify-start items-center m-5`}>
        <section className={` bg-activityGreen hover:bg-green-900 rounded-sm mb-[8px] min-h-[138px] min-w-[242px] mx-[10px] flex justify-start flex-col p-[20px] shadow-md shadow-gray-500`}>
          <div className={`flex justify-center items-center text-[14px] text-white font-semibold mb-[5px] cursor-pointer`}>
            改善水壺瓶蓋
          </div>
          <div className="flex justify-between p-[3px] pt-[5px]">
            <span className={` text-[12px] font-medium text-white`}>角色</span>
            <span className={` text-[12px] font-medium text-white`}>成員</span>
          </div>
          <div className="flex justify-between items-center p-[3px]">
            <span className={` text-[12px] font-medium text-white`}>活動成員</span>
            {/* <AvatarGroup
              avatars={routine.assignees.map(assignee => { return assignee.nickname })}
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
            /> */}
            {/* <span className={` text-[12px] font-medium`}>{routine.asignees.map((user) => <span key={uuidv4()}>{user}</span>)}</span> */}
          </div>
          <div className="flex justify-between p-[3px] mb-3">
            <span className={` text-[12px] font-medium text-white`}>邀請碼</span>
            <span className={` text-[12px] font-medium text-white`}>wulab</span>
          </div>
          <div className="flex justify-end p-[3px]">
            <button className="border-[1px] border-solid border-myGray text-white text-[12px] font-medium rounded-sm p-[3px] shadow-md hover:bg-gray-600">檢視</button>
          </div>
        </section>
      </div>
      <Modal open={openCreateActivity} onClose={() => setOpenCreateActivity(false)} opacity={false} position={"justify-center items-center"} >
        <form className='h-full'>
          <div className='flex flex-col p-3'>
            <h3 className='text-[24px] font-bold mb-6'>建立設計思考活動</h3>
            <p className=' text-[18px] font-bold mb-3'>設計思考活動名稱</p>
            <input className="rounded-sm outline-none ring-2 p-1 bg-myGray w-full mb-3"
              type="text"
              placeholder="標題"
              name='title'
              onChange={(e) => setActivityName(e.target.value)}
              required
            />
            <p className=' text-[18px] font-bold  mb-3'>設計思考活動描述</p>
            <textarea className=" rounded outline-none ring-2 bg-myGray w-full p-1 mb-3"
              rows={3}
              placeholder="設計思考活動描述"
              name='description'
              onChange={(e) => setActivityDescription(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-end m-2'>
            <button onClick={(e) => { e.preventDefault(); setOpenCreateActivity(false); }} className="  cursor-pointer shadow-sm mx-auto w-full h-7 mb-2 bg-myBlue3 hover:bg-myBlue4 rounded font-extrabold text-xs sm:text-sm text-black/60 mr-2" >
              取消
            </button>
            <button
              onClick={handleSubmit}
              className="z-51 cursor-pointer shadow-sm bg-myOrange hover:bg-orange-500 mx-auto w-full h-7 mb-2 bg-customgreen rounded font-extrabold text-xs sm:text-sm text-black/70">
              建立
            </button>

          </div>
        </form>
        {/* update Node*/}
      </Modal>
    </div>
  );
}

export default ActivityPage