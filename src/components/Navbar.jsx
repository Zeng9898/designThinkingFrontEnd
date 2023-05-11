import { useState } from "react";
import { close, designThinkingLogo, menu, logo } from '../assets';
import { navLinks } from '../constants';
import '../index.css'


const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="w-full flex pt-6 pb-3 justify-between items-center navbar">
      <img src={designThinkingLogo} alt="ncu design thinking" className="filter-white w-[150px]" />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-medium hover:bg-stone-500	 rounded-md p-1 cursor-pointer text-[14px] text-white ${index === navLinks.length - 1 ? "mr-0" : "mr-4"}`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(prevToggle => { return !prevToggle })}
        />
        <div
          className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium hover:bg-gray-100 cursor-pointer text-[14px] text-white ${index === navLinks.length - 1 ? "mr-0" : "mb-4"}`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar