import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';

import { Expenses, Income, Transactions, TransactionDetail  } from '../components/Apps';

export default function Apps({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
      {/* <div className="bg-gray-50"> */}
      {/*   <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} /> */}
      {/* </div> */}
      <div className="h-full">
        <Routes>
          <Route path="/expenses" element={<Expenses searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/expenses/income" element={<Income searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/expenses/transactions" element={<Transactions searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
          <Route path="/expenses/transactions/:transactionId" element={<TransactionDetail searchTerm={searchTerm} setSearchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  )
}


