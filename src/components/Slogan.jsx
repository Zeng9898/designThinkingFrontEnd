import styles from "../styles";
import { idea, robot } from "../assets";
import GetStarted from "./GetStarted";

const Slogan = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}  ${styles.flexCenter}`}>
      <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-20 px-6`}>
        <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          Make {" "} <span className="bg-gradient-to-r from-red-300 to-orange-300 text-transparent bg-clip-text">Idea</span>{" "}Come True.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-center text-white text-[20px]`}>
          學習應該是一趟說走就走的旅程<br />
          透過{" "}<span className="bg-gradient-to-r from-red-300 to-orange-300 text-transparent bg-clip-text font-extrabold text-[21px]">設計思考</span>{" "}發現新的可能
        </p>
        <div className="ss:flex hidden my-5">
          <GetStarted />
        </div>
        {/* gradient start */}
        {/* <div className="absolute z-[0] w-[100%] h-[30%] right-20 bottom-20 blue__gradient" /> */}
        {/* gradient end */}
      </div>
      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Slogan;