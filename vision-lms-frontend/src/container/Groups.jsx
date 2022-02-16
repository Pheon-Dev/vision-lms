import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { CreateMember, MemberDetail } from '../components/Member';
import { Feed, Navbar, Search } from '../components/Components';
import { Group, CreateGroup, GroupDetail } from '../components/Group';

export default function Groups({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      {/* <div className="bg-gray-50"> */}
      {/*   <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} /> */}
      {/* </div> */}
      <div className="h-full">
        <Routes>
          {/* <Route path="/" element={<Feed />} /> */}
          {/* <Route path="/product/:productId" element={<Feed />} /> */}
          {/* <Route path="/member-detail/:memberId" element={<MemberDetail user={user && user} />} /> */}
          {/* <Route path="/create-member" element={<CreateMember user={user && user} />} /> */}
          {/* <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={searchTerm} />} /> */}
          <Route path="/create-group" element={<CreateGroup searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/group" element={<Group searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/group-detail" element={<GroupDetail searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

