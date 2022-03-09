import { GeneralReport, ParReport, ScheduleReport, StatementReport } from '../components/Report';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { Feed, Navbar, Search } from '../components/Components';

export default function Loans({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      <div className="h-full">
        <Routes>
          <Route path="/" element={<GeneralReport searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/par-report" element={<ParReport searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/par-report/:statementId" element={<StatementReport searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/schedule-report" element={<ScheduleReport searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}


