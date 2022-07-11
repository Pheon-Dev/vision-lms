import { Approvals, Pending, Disbursements, PaymentDetail, Disburse, ProductDetails, MaintenanceDetail, Approve, LoansFeed, Payments, Maintenance, CreateLoan, Products, Preview, NewProduct, Submissions } from '../components/Loan';
import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';

export default function Loans({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      <div className="h-full">
        <Routes>
          <Route path="/new-product" element={<NewProduct searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/create-loan" element={<CreateLoan searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/approvals" element={<Approvals searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/approvals/:loanId" element={<Approve searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/products" element={<Products searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/products/:productId" element={<ProductDetails searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/preview/:loanId" element={<Preview searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/maintenance" element={<Maintenance searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/" element={<LoansFeed searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/maintenance/:memberId" element={<MaintenanceDetail user={user && user} />} />
          <Route path="/submissions" element={<Submissions searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/disbursements" element={<Disbursements searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/disbursements/:loanId" element={<Disburse searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/payments" element={<Payments searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/payments/:paymentId" element={<PaymentDetail searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/pending" element={<Pending searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}

