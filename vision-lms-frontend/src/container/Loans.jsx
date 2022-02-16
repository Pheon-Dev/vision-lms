import { Approval, Disbursement, Maintenance, NewProduct, Submissions } from '../components/Loan';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { CreateMember, MemberDetail } from '../components/Member';
import { Feed, Navbar, Search } from '../components/Components';
import { Group, CreateGroup, GroupDetail } from '../components/Group';

export default function Loans({ user }) {
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
          {/* <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={searchTerm} />} /> */}
          <Route path="/new-product" element={<NewProduct searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/approval" element={<Approval searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/disbursement" element={<Disbursement searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

