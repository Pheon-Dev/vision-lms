import React, { useEffect, useState } from "react";

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { products, memberDetailMoreMemberQuery, memberDetailQuery, loanFeedQuery, searchQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components';

export default function Disbursement() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [approvedList, setApprovedList] = useState();
  const [disbursedList, setDisbursedList] = useState();

  useEffect(() => {
    // setLoading(true);
    const dquery = '*[_type == "disburse"]';
    const aquery = '*[_type == "approve"]';
    let subscription = true;

    if (subscription) {
      client.fetch(dquery).then((data) => {
        setDisbursedList(data);
        // setLoading(false);
      });

      client.fetch(aquery).then((data) => {
        setApprovedList(data);
        // setLoading(false);
      });

    }

    return () => subscription = false;

  }, []);

  const disbursals = 'Disbursal';
  const disbursed = 'Disbursed';

  // if (loading) {
  //   return (
  //     <Spinner message={`Fetching all data pending ${disbursals} and ${disbursed} data ...`} />
  //   );
  // }

  // if (approvedList?.length === 0) {
  //   return (
  //     <div className="text-xl font-bold text-center items-center">Fetching data pending {disbursals} ...</div>
  //   )
  // }

  // if (disbursedList?.length === 0) {
  //   return (
  //     <div className="text-xl font-bold text-center items-center">Loading {disbursed} data ...</div>
  //   )
  // }

  function renderApprovedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Loans Pending Disbursal</span>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedList?.map((member) => (
                    member.maintained !== 'false' && member.approved === 'true' && member.disbursed === 'false' ?
                      <tr
                        onClick={() => navigate(`/loan/disbursements/${member._id}`)}
                        key={member._id}
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
                          <div className="text-sm font-medium text-indigo-600">
                            Disburse
                          </div>
                        </td>
                      </tr>
                      :
                      null
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderDisbursedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Loans Disbursed Today</span>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disbursedList?.map((member) => (
                    member.maintained !== 'false' && member.approved === 'true' && member.disbursed !== 'false' ?
                      <tr
                        onClick={() => navigate("/loan")}
                        key={member._id}
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
                          <div className="text-sm font-medium text-green-600">
                            Disbursed
                          </div>
                        </td>
                      </tr>
                      :
                      null
                  ))
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
      {renderApprovedLoans()}
      {renderDisbursedLoans()}
    </>
  )
}

