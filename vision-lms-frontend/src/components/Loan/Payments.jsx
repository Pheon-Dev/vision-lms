import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { client } from '../../client';

export default function Payments() {
  const [paymentsList, setPaymentsList] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let subscription = true;
    const query = '*[_type == "payments"]';

    if (subscription) {
      client.fetch(query).then((data) => {
        setPaymentsList(data);
      });
    }

    return () => subscription = false;

  }, []);

  function renderPaymentsList() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Loan Payments List</span>
        </div>
        <br />
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 border-b-2 border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Officer</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentsList ? paymentsList?.map((member) => (
                    <tr
                      onClick={() => {
                        navigate(`/loan/payments/${member._id}`);
                      }}
                      key={member?._id}
                      className="hover:bg-gray-300 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{member.memberNames}</div>
                            <div className="text-sm text-gray-500">{member.memberPhoneNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">KSHs. {member.principalAmount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{member.productType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {member.loanOfficerName}
                        </div>
                      </td>
                    </tr>
                  ))
                    :
                    null
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderPaymentsList()}
    </>
  )
}


