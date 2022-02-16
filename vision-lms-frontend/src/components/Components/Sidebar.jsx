import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RiBarChartGroupedLine, RiHome2Fill } from "react-icons/ri";
import { IoIosArrowForward, IoIosLogOut } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext"

import logo from "../../assets/vision-black.png";
// import logo from '../assets/logo.svg';
import { products } from "../../utils/data";
import { BsFilePlus, BsGearFill, BsHouse, BsPerson, BsPersonPlus, BsPlus } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

const isNotActiveStyle = 'flex hover:bg-gray-300 items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center bg-gray-300 px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

export default function Sidebar({ closeToggle, user }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, signout } = useAuth();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  async function handleSignOut() {
    setError("");

    try {
      await signout()
      navigate("/sign-in")
    } catch {
      setError("Failed to Log Out!")
    }
  }

  function renderSideBarOne() {
    return (
      <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-110 hide-scrollbar">
        <div className="flex flex-col">
          <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleCloseSidebar}>
            <img src={logo} alt="logo" className="w-1/2" />
          </Link>
          <div className="flex flex-col gap-5">
            <NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}>
              {/* <RiBarChartGroupedLine /> */}
              <img src="https://res.cloudinary.com/drf1wghco/image/upload/v1644167053/table_p78s8e.png" className="w-8 h-8 shadow-sm" />
              Dashboard
            </NavLink>
            <h3 className="mt-2 px-5 text-base 2xl:text-xl">Product Line</h3>
            {
              products.slice(0, products.length - 0).map((product) => (
                <NavLink
                  to={`/product/${product.name}`}
                  className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                  onClick={handleCloseSidebar}
                  key={product.name}
                >
                  <img src={product.image} className="w-8 h-8 shadow-sm" />
                  {product.name}
                </NavLink>
              ))
            }
          </div>
        </div>
        {user && (
          <div>
            <Link to={`user-profile/${user._id}`} className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={handleCloseSidebar}>
              <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p>{user.userName}</p>
              <IoIosArrowForward />
            </Link>
            {/* <Link to={"/login"} className="flex ml-9 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={handleCloseSidebar}> */}
            {/*   <p>Sign Out</p> */}
            {/*   <IoIosLogOut className="ml-9" /> */}
            {/* </Link> */}
            <div>
              <Link to="/update-profile" className="flex my-5 mb-0 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={handleCloseSidebar}>
                {/* <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" /> */}
                {/* <p>{currentUser.email}</p> */}
                {/* <IoIosArrowForward /> */}
              </Link>
              <Link to={"/sign-in"} className="flex ml-9 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3" onClick={handleSignOut}>
                <p>Sign Out</p>
                <IoIosLogOut className="ml-9" />
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }

  const SideBarIcon = ({ icon, text = 'tooltip' }) => (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  )

  const Divider = () => <hr className="sidebar-hr" />;

  function renderSideBar() {
    return (
      // flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-110 hide-scrollbar
      <div className="fixed hide-scrollbar top-0 left-0 h-screen w-16 flex flex-col bg-white dark:bg-gray-900 shadow-lg justify-between">
        <div>
          <Link to="/">
            <SideBarIcon icon={<AiFillHome size="28" />} text="Home" />
          </Link>
          <Divider />
          <Link to="/member/create-member">
            <SideBarIcon icon={<BsPlus size="28" />} text="Add Member" />
          </Link>
          <Link to="/group/create-group">
            <SideBarIcon icon={<BsPersonPlus size="28" />} text="New Group" />
          </Link>
          <Link to="/loan/new-product">
            <SideBarIcon icon={<BsFilePlus size="28" />} text="New Product" />
          </Link>
        </div>

        <div>
          <Divider />
          <Link to="/">
            <SideBarIcon icon={<BsGearFill size="28" />} text="Settings" />
          </Link>
          {user && (

            <Link to={`user-profile/${user._id}`} onClick={handleCloseSidebar}>
              <SideBarIcon icon={<img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              } text={user.userName} />
            </Link>
          )}
          <Link to="/sign-in" className="mb-0 flex b-0" onClick={handleSignOut}>
            <SideBarIcon icon={<IoIosLogOut size="28" />} text="Sign Out" />
          </Link>
        </div>
      </div>
    );
  }

  function renderSb() {
    return (
      <div className="w-60 h-full shadow-md bg-white px-1 absolute">
        <ul className="relative">
          <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 1</a>
          </li>
          <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
          </li>
          <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <>
      {renderSideBar()}
      {/* {renderSideBarOne()} */}
      {/* {renderSb()} */}
    </>
  )

}

