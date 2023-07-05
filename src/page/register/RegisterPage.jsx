import React from 'react'
import styles from '../../styles';

import { NavbarWhite } from '../../components';
import Register from './components/Register';

const RegisterPage = () => {
  return (
    <div className='w-full overflow-hiddle h-screen'>
      <div className={`${styles.paddingX} ${styles.flexCenter}  shadow-md border-b-2 border-gray-300 border-solid`}>
        <div className={`w-full`}>
          <NavbarWhite />
        </div>
      </div>
      <div className={`${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
          < Register />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage