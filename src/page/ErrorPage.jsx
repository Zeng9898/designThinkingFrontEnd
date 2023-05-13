import { useRouteError } from "react-router-dom";
import styles from '../styles';
import { beginner } from "../assets";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={`${styles.flexCenter} h-screen flex-col`}>
      <div className={`${styles.flexCenter} flex-col pb-10`}>
        <img src={beginner} alt="XD" className="w-[300px]" />
        <h1 className="font-poppins font-semibold ss:text-[72px] text-[52px]">Oops!</h1>
        <p className="font-poppins">Sorry, an unexpected error has occurred.</p>
        <p className="font-poppins">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}