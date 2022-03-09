import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function StatementReport() {
  const { statementId } = useParams();
  const navigate = useNavigate();

  console.log(statementId)
  return (
    <>
      <div className="font-bold flex justify-center w-full text-3xl">
        Customer Loan Statement
      </div>
      <br />
      <div className="font-bold flex justify-center w-full text-xl">
        Shows Specific Customer Loan Statement
      </div>
    </>
  )
}





