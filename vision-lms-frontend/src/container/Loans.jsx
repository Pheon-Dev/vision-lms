import { Approvals, Pending, Disbursements, MaintenanceDetail, LoansFeed, Payments, Maintenance, CreateLoan, Products, Preview, NewProduct, Submissions } from '../components/Loan';
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { Feed, Navbar, Search } from '../components/Components';

export default function Loans({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      <div className="h-full">
        <Routes>
          <Route path="/new-product" element={<NewProduct searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/create-loan" element={<CreateLoan searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/approvals" element={<Approvals searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/products" element={<Products searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/preview/:loanId" element={<Preview searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/maintenance" element={<Maintenance searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/" element={<LoansFeed searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/maintenance/:memberId" element={<MaintenanceDetail user={user && user} />} />
          <Route path="/submissions" element={<Submissions searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/disbursements" element={<Disbursements searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/payments" element={<Payments searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/pending" element={<Pending searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

