import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { CreateMember, MemberDetail } from '../components/Member';
import { Feed } from '../components/Components';

export default function Members({ user }) {
  return (
    <div className="px-2 md:px-5">
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route
            path="/member-detail/:memberId"
            element={<MemberDetail user={user && user} />}
          />
          <Route
            path="/create-member"
            element={<CreateMember user={user && user} />}
          />
        </Routes>
      </div>
    </div>
  );
}
