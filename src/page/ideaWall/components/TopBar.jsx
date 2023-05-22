import { useState } from "react";
import { designThinkingLogo } from "../../../assets";
import { navLinks } from "../../../constants";
import { Link, useLocation } from "react-router-dom";
import styles from "../../../styles";


const TopBar = () => {
  const [toggle, setToggle] = useState(false)
  const currentLocation = useLocation();

  return (
    <div className={`${styles.paddingX} flex ${styles.flexCenter} bg-white shadow-md border-b-2 border-gray-300 border-solid border-opacity-80`}>
    <nav className="w-full flex pt-3 pb-3 justify-between items-center navbar">
      <ul className="list-none flex justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-medium hover:bg-stone-500	 rounded-md p-1 mt-1 cursor-pointer text-[14px] text-black ${index === navLinks.length - 1 ? "mr-0" : "mr-4"}`}
          >
            <Link to="/login">{nav.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  )
}

export default TopBar