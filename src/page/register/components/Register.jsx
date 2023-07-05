import React from 'react'
import styles from '../../../styles';
import { useRef, useState, useEffect } from 'react';
import axios from "../../../api/axios";
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { MdKey } from 'react-icons/md';
import { FaSignature, FaTimesCircle } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const REGISTER_URL = '/api/register';
const NICKNAME_REGEX = /^.{2,24}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const nicknameRef = useRef();
    const errRef = useRef();

    const [nickname, setNickname] = useState('');
    const [validNickname, setValidNickname] = useState(false);
    const [nicknameFocus, setNicknameFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('clear');

    const navigate = useNavigate();

    useEffect(() => {
        nicknameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidNickname(NICKNAME_REGEX.test(nickname));
    }, [nickname])

    useEffect(() => {
        setValidUser(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('clear');
    }, [nickname, user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ nickname: nickname, username: user, password: pwd, passwordConfirmation: matchPwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
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
        <section id="home" className={`flex flex-row ${styles.paddingY}  ${styles.flexCenter} ${styles.marginY} `}>
            <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 px-6`}>
                <form className='max-w-[400px] w-full mx-auto rounded-lg px-14 pb-14 pt-10 border-2 border-gray-300 border-solid'
                    onSubmit={handleSubmit}>
                    <h2 className='text-4xl text-black font-bold text-center mb-10'>註冊</h2>
                    <div className='flex flex-row text-gray-400 py-2 mt-10 relative'>
                        <BsFillCheckCircleFill className={validNickname ? "text-[17px]  text-myGreenNormal self-center absolute left-[-25px]" : "hidden"} />
                        <div className="tooltip tooltip-top self-center absolute left-[-25px]" data-tip="須包含 2 到 24 個字元">
                            <FaTimesCircle className={validNickname || !nickname ? "hidden" : "text-[17px]  text-red-700"} />
                        </div>
                        <FaSignature className={nicknameFocus ? 'text-[17px] self-center mr-2 text-gray-700' : 'text-[17px] self-center mr-2'} />
                        {/* <img src={userIcon} alt="user" className='w-[17px] mr-2 object-contain' draggable='false' /> */}
                        <input className={nicknameFocus ? 'w-full border-b-2 border-gray-700 focus:outline-none mt-2 p-1 text-black' : 'w-full border-b-2 border-gray-200 focus:outline-none mt-2 p-1 text-black'}
                            type="text" placeholder='暱稱'
                            ref={nicknameRef}
                            autoComplete='false'
                            aria-invalid={validNickname ? "false" : "true"}
                            aria-describedby="nicknameNote"
                            onChange={(e) => setNickname(e.target.value)}
                            value={nickname}
                            onFocus={() => setNicknameFocus(true)}
                            onBlur={() => setNicknameFocus(false)}
                            required />
                    </div>
                    <p id="nicknameNote" className={nicknameFocus && nickname && !validNickname ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px] my-2' : 'hidden'}>
                        須包含 2 到 24 個字元<br />
                    </p>
                    <div className='flex flex-row text-gray-400 pb-2 relative'>
                        <BsFillCheckCircleFill className={validUser ? " text-[17px]  text-myGreenNormal self-center absolute left-[-25px]" : "hidden"} />
                        <div className="tooltip tooltip-top self-center absolute left-[-25px]" data-tip="須包含 4 到 24 個字元，由英文字母開頭，後續可以使用英文字母、數字、_ 和 -">
                            <FaTimesCircle className={validUser || !user ? "hidden" : " text-[17px]  text-red-700  "} />
                        </div>
                        <FaUser className={userFocus ? 'text-[17px] self-center mr-2 text-gray-500' : 'text-[17px] self-center mr-2'} />
                        {/* <img src={keyIcon} alt="user" className='w-[17px] mr-2 object-contain' draggable='false' /> */}
                        <input className={userFocus ? 'w-full border-b-2 border-gray-500 focus:outline-none mt-2 p-1 text-black' : 'w-full border-b-2 border-gray-200 focus:outline-none mt-2 p-1 text-black'}
                            type="text" placeholder='帳號'
                            autoComplete='false'
                            aria-invalid={validUser ? "false" : "true"}
                            aria-describedby="userNote"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required />
                    </div>
                    <p id="userNote" className={userFocus && user && !validUser ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px] my-2' : 'hidden'}>
                        須包含 4 到 24 個字元<br />
                        由英文字母開頭，後續可以使用英文字母、數字、_ 和 -<br />
                    </p>
                    <div className='flex flex-row text-gray-400 pb-2 relative'>
                        <BsFillCheckCircleFill className={validPwd ? " text-[17px] text-myGreenNormal self-center absolute left-[-25px]" : "hidden"} />
                        <div className="tooltip tooltip-top self-center absolute left-[-25px]" data-tip="須包含 8 到 24 個字元，
                        包含一個大寫英文字母、小寫英文字母、一個數字和一個特殊符號（!@#$%）">
                            <FaTimesCircle className={validPwd || !pwd ? "hidden" : " text-[17px]  text-red-700  "} />
                        </div>
                        <MdKey className={pwdFocus ? 'text-[17px] self-center mr-2 text-gray-500' : 'text-[17px] self-center mr-2'} />
                        {/* <img src={keyIcon} alt="user" className='w-[17px] mr-2 object-contain' draggable='false' /> */}
                        <input className={pwdFocus ? 'w-full border-b-2 border-gray-500 focus:outline-none mt-2 p-1 text-black' : 'w-full border-b-2 border-gray-200 focus:outline-none mt-2 p-1 text-black'}
                            type="password" placeholder='密碼'
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdNote"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            required />
                    </div>
                    <p id="pwdNote" className={pwdFocus && !validPwd ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px] my-2' : 'hidden'}>
                        須包含 8 到 24 個字元<br />
                        包含至少一個大寫字母、小寫字母、數字和特殊符號<br />
                        允許的特殊符號: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                    <div className='flex flex-row text-gray-400 pb-2 relative'>
                        <BsFillCheckCircleFill className={validMatch && matchPwd ? " text-[17px] text-myGreenNormal self-center absolute left-[-25px]" : "hidden"} />
                        <div className="tooltip tooltip-top self-center absolute left-[-25px]" data-tip="「密碼」與「確認密碼」不一致">
                            <FaTimesCircle className={validMatch || !matchPwd ? "hidden" : " text-[17px]  text-red-700  "} />
                        </div>
                        <MdKey className={matchFocus ? 'text-[17px] self-center mr-2 text-gray-500' : 'text-[17px] self-center mr-2'} />
                        {/* <img src={keyIcon} alt="user" className='w-[17px] mr-2 object-contain' draggable='false' /> */}
                        <input className={matchFocus ? 'w-full border-b-2 border-gray-500 focus:outline-none mt-2 p-1 text-black' : 'w-full border-b-2 border-gray-200 focus:outline-none mt-2 p-1 text-black'}
                            type="password"
                            placeholder='確認密碼'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="matchNote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                    </div>
                    <p id="matchNote" className={matchFocus && !validMatch ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px] my-2' : 'hidden'}>
                        「密碼」與「確認密碼」不一致
                    </p>
                    <p ref={errRef} className={errMsg !== 'clear' ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px]'
                        : 'invisible inline-block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-[14px]'} aria-live="assertive">{errMsg}</p>

                    {/* <div className='flex justify-between text-gray-400 py-2'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                        <p>Forgot Password</p>
                    </div> */}
                    <button className='w-full my-5 mt-10 py-2 bg-myGreenNormal  hover:bg-myGreenDark text-white rounded-lg' disabled={!validNickname || !validPwd || !validMatch || !validUser ? true : false}>登入</button>

                </form>
            </div >
        </section >
    );
}

export default Register