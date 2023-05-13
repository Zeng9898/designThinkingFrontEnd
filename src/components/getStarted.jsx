import styles from "../styles";
import { Link } from "react-router-dom";

const GetStarted = () => (
    <Link to='/login' className={`${styles.flexCenter} flex-col  bg-orange-500  hover:bg-orange-600 w-[100%] h-[100%] rounded-lg cursor-pointer p-3`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-white">開始使用</span>
        </p>
        {/* <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" /> */}
      </div>
      {/* <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        
      </p> */}
    </Link>
);

export default GetStarted;