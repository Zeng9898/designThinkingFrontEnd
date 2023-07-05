import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import styles from "../../../styles";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [toggle, setToggle] = useState(false)
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setAuth("");
    localStorage.removeItem('auth');
    console.log('log out');
    navigate("/")
  }

  return (
    <div className={`${styles.paddingX} flex ${styles.flexCenter} bg-white shadow-md border-b-2 border-gray-300 border-solid border-opacity-80`}>
      <nav className="w-full flex pt-3 pb-3 justify-between items-center navbar">
        <ul className="list-none flex justify-end items-center flex-1">
          <li className={`font-poppins font-medium hover:bg-stone-500	 rounded-md p-1 mt-1 cursor-pointer text-[14px] text-black mr-4`}>{auth.nickname}</li>
          <li onClick={logout} className={`font-poppins font-medium hover:bg-stone-500	 rounded-md p-1 mt-1 cursor-pointer text-[14px] text-black mr-4`}>登出</li>
        </ul>
      </nav>
    </div>
  )
}

export default TopBar