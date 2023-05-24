import React from 'react'
import styles from '../../../styles';
import { userIcon, keyIcon } from '../../../assets';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthProvider";
import axios from "../../../api/axios";
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/api/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('clear');

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('clear');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const userId = response?.data?.userId;
            const nickname = response?.data?.nickname;
            setAuth({ userId: userId, nickname: nickname, accessToken: accessToken });
            setUser('');
            setPwd('');
            localStorage.setItem('auth', JSON.stringify({ userId: userId, nickname: nickname, accessToken: accessToken, }));
            // const response = await axios.post(/api/users/designThinkingActivities)
            const responseDesignThinkingActivity = await axios.get(`/api/users/${userId}/designThinkingActivities`);
            console.log(responseDesignThinkingActivity.data[0].id);
            // <Navigate to={`/kanban/${responseDesignThinkingActivity.data[0].id}`} />
            navigate(`/kanban/${responseDesignThinkingActivity.data[0].id}`)
        } catch (err) {
            if (!(err?.response)) {
                setErrMsg(err?.message);
            } else {
                setErrMsg(err?.response?.data?.message);
            }
            errRef.current.focus();
        }
    }

    return (
        <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}  ${styles.flexCenter} ${styles.marginY} `}>
            <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 px-6`}>
                <form className='max-w-[400px] w-full mx-auto rounded-lg px-14 pb-14 pt-10 border-2 border-gray-300 border-solid'
                    onSubmit={handleSubmit}>
                    <h2 className='text-4xl text-black font-bold text-center mb-10'>登入</h2>
                    <div className='flex flex-row text-gray-400 py-2 mt-10'>
                        <img src={userIcon} alt="user" className='w-[17px] mr-2 object-contain' draggable='false' />
                        <input className='w-full border-b-2 border-gray-200 focus:outline-none mt-2 p-1 text-black'
                            type="text" placeholder='帳號' ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
                    </div>
                    <div className='flex flex-row text-gray-400 mb-16'>
                        <img src={keyIcon} alt="user" className='w-[17px] mr-2 object-contain' draggable='false' />
                        <input className='w-full border-b-2 border-gray-200 focus:outline-none mt-2 p-1 text-black'
                            type="password" placeholder='密碼' onChange={(e) => setPwd(e.target.value)} value={pwd} required autoComplete='false' />
                    </div>

                    <p ref={errRef} className={errMsg !== 'clear' ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px]'
                        : 'invisible inline-block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px]'} aria-live="assertive">{errMsg}</p>

                    {/* <div className='flex justify-between text-gray-400 py-2'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                        <p>Forgot Password</p>
                    </div> */}
                    <button className='w-full my-5 mt-10 py-2 bg-myGreenNormal  hover:bg-myGreenDark text-white rounded-lg'>登入</button>

                </form>
            </div>
        </section>
    );
}

export default Login