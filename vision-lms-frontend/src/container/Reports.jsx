import { GeneralReport } from '../components/Report';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { Feed, Navbar, Search } from '../components/Components';

export default function Loans({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      <div className="h-full">
        <Routes>
          <Route path="/general-report" element={<GeneralReport searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}


