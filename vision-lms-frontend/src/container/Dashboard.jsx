import React, { useEffect, useRef, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Route, Routes } from 'react-router-dom';
import { Feed, Navbar, Search } from '../components/Components';
import { Admin } from '../components/Admin';

import { Sidebar, ChannelBar } from '../components/Components';
import Reports from './Reports';
import Members from './Members';
import Groups from './Groups';
import Loans from './Loans';

export default function Dashboard() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    let subscription = true;

    if (subscription) {
      scrollRef.current.scrollTo(0, 0);
    }

    return () => (subscription = false);
  });

  return (
    <div className="flex bg-gray-300 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
        <ChannelBar />
      </div>
      <div className="flex md:hidden flex-row bg-gray-800">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <div className="text-xl text-gray-500 flex justify-center ml-auto mr-auto font-bold">
            Vision LMS
          </div>
          {toggleSidebar !== true ? (
            <HiMenu
              fontSize={36}
              className="cursor-pointer text-gray-500"
              onClick={() => setToggleSidebar(true)}
            />
          ) : (
            <AiOutlineCloseCircle
              fontSize={36}
              className="cursor-pointer text-gray-500"
              onClick={() => setToggleSidebar(false)}
            />
          )}
        </div>
        {toggleSidebar && (
          <>
            <div className="fixed w-3/5 bg-white h-screen shadow-md z-10 animate-slide-in animate-slide-out">
              <Sidebar closeToggle={setToggleSidebar} />
              <ChannelBar closeToggle={setToggleSidebar} />
            </div>
          </>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <div className="bg-gray-50">
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/product/:productId" element={<Feed />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={searchTerm} />
            }
          />
          <Route path="/member/*" element={<Members />} />
          <Route path="/group/*" element={<Groups />} />
          <Route path="/loan/*" element={<Loans />} />
          <Route path="/report/*" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}
