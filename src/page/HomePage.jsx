import styles from '../styles';
import { Navbar, Slogan } from "../components";

const HomePage = () => {
  return (
    <div className='bg-gradient-to-r from-blue-400 to-blue-500 overflow-hidden h-screen'>
      <div className={`${styles.paddingX} flex ${styles.flexCenter}`}>
        <div className={`w-full`}>
          <Navbar />
        </div>
      </div>
      <div className={`${styles.flexCenter} `}>
        <div className={`${styles.boxWidth}`}>
          <Slogan />
        </div>
      </div>
    </div>
  )
}

export default HomePage