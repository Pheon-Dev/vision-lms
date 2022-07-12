import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RiBarChartGroupedLine, RiHome2Fill } from 'react-icons/ri';
import { IoIosArrowForward, IoIosLogOut, IoMdLogOut } from 'react-icons/io';
import { useAuth } from '../../contexts/AuthContext';

import logo from '../../assets/vision-black.png';
// import logo from '../assets/logo.svg';
import {
  BsFileArrowUp,
  BsFileBarGraph,
  BsFileBreak,
  BsFileCheck,
  BsFilePlus,
  BsGear,
  BsGearFill,
  BsHouse,
  BsPerson,
  BsPersonPlus,
  BsPlus,
  BsSearch,
} from 'react-icons/bs';
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';

const isNotActiveStyle =
  'flex hover:bg-gray-300 items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle =
  'flex items-center bg-gray-300 px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

export default function Sidebar({ closeToggle, user }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { currentUser, signout } = useAuth();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  async function handleSignOut() {
    setError('');

    try {
      await signout();
      navigate('/sign-in');
    } catch {
      setError('Failed to Log Out!');
    }
  }

  const SideBarIcon = ({ icon, text = 'tooltip' }) => (
    <div className="sidebar-icon group bg-gray-600">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );

  const Divider = () => <hr className="sidebar-hr" />;

  function renderSideBar() {
    return (
      // flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-110 hide-scrollbar
      <div className="fixed hide-scrollbar top-0 left-0 h-screen w-16 flex flex-col bg-gray-900 dark:bg-gray-900 shadow-lg justify-between">
        <div>
          <Link to="/">
            <SideBarIcon icon={<AiOutlineHome size="28" />} text="Home" />
          </Link>
          <Divider />
          <Link to="/loan/create-loan">
            <SideBarIcon icon={<BsPlus size="28" />} text="New Loan" />
          </Link>
          <Link to="/member/create-member">
            <SideBarIcon icon={<BsPersonPlus size="28" />} text="New Member" />
          </Link>
          <Link to="/group/create-group">
            <SideBarIcon
              icon={<AiOutlineUsergroupAdd size="28" />}
              text="New Group"
            />
          </Link>
          <Link to="/loan/new-product">
            <SideBarIcon icon={<BsFilePlus size="28" />} text="New Product" />
          </Link>
        </div>
        <div>
          <Divider />
          <Link to="/loan">
            <SideBarIcon icon={<BsFileCheck size="28" />} text="All Loans" />
          </Link>
          <Link to="/report/general-report">
            <SideBarIcon icon={<BsFileBarGraph size="28" />} text="Report" />
          </Link>
        </div>
        <div>
          <Divider />
          <Link to="/loan/disbursements">
            <SideBarIcon icon={<GiPayMoney size="28" />} text="Disbursements" />
          </Link>
          <Link to="/loan/payments">
            <SideBarIcon icon={<GiReceiveMoney size="28" />} text="Payments" />
          </Link>
        </div>
        <div>
          <Divider />
          {/* <Link to="/"> */}
          {/*   <SideBarIcon icon={<BsGear size="28" />} text="Settings" /> */}
          {/* </Link> */}
          {/* {user && ( */}

          {/*   <Link to={`user-profile/${user._id}`} onClick={handleCloseSidebar}> */}
          {/*     <SideBarIcon icon={<img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" /> */}
          {/*     } text={user.userName} /> */}
          {/*   </Link> */}
          {/* )} */}
          <Link to="/sign-in" className="mb-0 flex b-0" onClick={handleSignOut}>
            <SideBarIcon icon={<IoMdLogOut size="28" />} text="Sign Out" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {renderSideBar()}
      {/* {renderSideBarOne()} */}
    </>
  );
}
