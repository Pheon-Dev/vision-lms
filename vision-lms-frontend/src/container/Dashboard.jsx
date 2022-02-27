import React, { useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Feed, Navbar, Search } from '../components/Components';
import { PrivateRoute } from '../components/Auth';

import { Sidebar, UserProfile, ChannelBar, ContentContainer } from '../components/Components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Reports from './Reports';
import Members from './Members';
import Groups from './Groups';
import Loans from './Loans';
import logo from '../assets/logo.svg';
// import logo from '../assets/vision-black.png';

export default function Dashboard() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  // console.log(localStorage)
  // const userInfo =
  //   localStorage.getItem('user') !== 'undefined'
  //     ? JSON.parse(localStorage.getItem('user'))
  //     : localStorage.clear();

  // useEffect(() => {
  //   const query = userQuery(userInfo?.googleId);

  //   client.fetch(query).then((data) => {
  //     setUser(data[0]);
  //   });
  // }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
    return (() => console.log('unsubscribing'));
  });

  return (
    <div className="flex bg-gray-300 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        {/* <span user={user && user}> */}
        <Sidebar />
        <ChannelBar />
        {/* <ChannelBar closeToggle={setToggleSidebar} /> */}
        {/* <ContentContainer /> */}
      </div>
      <div className="flex md:hidden flex-row bg-gray-800">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <div className='text-xl text-gray-500 flex justify-center ml-auto mr-auto font-bold'>Vision LMS</div>
          {
            toggleSidebar !== true ?
              <HiMenu
                fontSize={36}
                className="cursor-pointer text-gray-500"
                onClick={() => setToggleSidebar(true)}
              />
              :

              <AiOutlineCloseCircle
                fontSize={36}
                className="cursor-pointer text-gray-500"
                onClick={() => setToggleSidebar(false)}
              />
          }
          {/* <Link to="/"> */}
          {/*   <img src={logo} alt="logo" className="w-1/5" /> */}
          {/* </Link> */}
          {/* <Link to={`user-profile/${user?._id}`}> */}
          {/*   <img */}
          {/*     src={user?.image} */}
          {/*     alt="user-pic" */}
          {/*     className="w-9 h-9 rounded-full" */}
          {/*   /> */}
          {/* </Link> */}
        </div>
        {toggleSidebar && (
          <>
            {/* <div className="absolute w-full flex justify-end items-center p-2"> */}
            {/*   <AiOutlineCloseCircle */}
            {/*     fontSize={24} */}
            {/*     className="cursor-pointer text-gray-400" */}
            {/*     onClick={() => setToggleSidebar(false)} */}
            {/*   /> */}
            {/* </div> */}
            <div className="fixed w-3/5 bg-white h-screen shadow-md z-10 animate-slide-in animate-slide-out">
              {/* <span closeToggle={setToggleSidebar}> */}
              {/* <Sidebar /> */}
              {/* <ChannelBar /> */}
              {/* </span> */}
              {/* <span closeToggle={setToggleSidebar} user={user && user}> */}
              {/*   <Sidebar /> */}
              {/*   <ChannelBar /> */}
              {/* </span> */}
              {/* <Sidebar closeToggle={setToggleSidebar} user={user && user} /> */}
              {/* <ChannelBar closeToggle={setToggleSidebar} user={user && user} /> */}
              <Sidebar closeToggle={setToggleSidebar} />
              <ChannelBar closeToggle={setToggleSidebar} />
            </div>
          </>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <div className="bg-gray-50">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} /> */}
        </div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/product/:productId" element={<Feed />} />
          {/* <Route path="/user-profile/:userId" element={<UserProfile />} /> */}
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          {/* <Route path="/member/*" element={<Members user={user && user} />} /> */}
          {/* <Route path="/group/*" element={<Groups user={user && user} />} /> */}
          {/* <Route path="/loan/*" element={<Loans user={user && user} />} /> */}
          {/* <Route path="/report/*" element={<Reports user={user && user} />} /> */}
          <Route path="/member/*" element={<Members />} />
          <Route path="/group/*" element={<Groups />} />
          <Route path="/loan/*" element={<Loans />} />
          <Route path="/report/*" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}
