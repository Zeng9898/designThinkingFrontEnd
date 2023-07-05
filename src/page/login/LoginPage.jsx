import React from 'react';
import styles from '../../styles';
import { NavbarWhite } from "../../components";
import Login from './components/Login';


const LoginPage = () => {
    return (
        <div className='w-full overflow-hiddle h-screen'>
            <div className={`${styles.paddingX} ${styles.flexCenter}  shadow-md border-b-2 border-gray-300 border-solid`}>
                <div className={`w-full`}>
                    <NavbarWhite />
                </div>
            </div>
            <div className={`${styles.flexCenter} `}>
                <div className={`${styles.boxWidth}`}>
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default LoginPage