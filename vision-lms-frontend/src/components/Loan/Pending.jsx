import React, { useEffect, useState } from "react";

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { products, memberDetailMoreMemberQuery, memberDetailQuery, loanFeedQuery, searchQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components';

export default function Pending() {
  const [maintainedList, setMaintainedList] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const query = '*[_type == "maintenance"]';

    client.fetch(query).then((data) => {
      setMaintainedList(data);
    });

  }, []);
  // console.log(maintainedList)

  function renderMaintainedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Pending Loans</span>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenure</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintainedList?.map((member) => (
                    <tr
                      // onMouseEnter={() => {
                      //   setPostHovered(true);
                      //   setMemberIdentity(member.memberId);
                      // }}
                      // onMouseLeave={() => setPostHovered(false)}
                      // onClick={() => navigate(deleteLoan(member._id))}
                      onClick={() => navigate(`/loan/preview/${member._id}`)}
                      key={member._id}
                      // value={memberIdentity}
                      // onMouseUp={() => setMemberIdentity("Try")}
                      className="hover:bg-gray-300 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10"> */}
                          {/*   <img className="h-10 w-10 rounded-full" src={(urlFor(image).width(250).url())} alt="member-profile" /> */}
                          {/* </div> */}
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{member.memberNames}</div>
                            <div className="text-sm text-gray-500">{member.memberPhoneNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.principalAmount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.loanTenure}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{member.productType}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                      {/*   <div className="text-sm text-gray-900">{member.endDate}</div> */}
                      {/*   <span className={(member.personalDetails?.mpesaTransNumber ? isPaidStyle : isNotPaidStyle)} > */}
                      {/*     {member.personalDetails?.mpesaTransNumber} */}
                      {/*   </span> */}
                      {/* </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-green-500">
                          Submit
                        </a>
                      </td>
                    </tr>
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
      {renderMaintainedLoans()}
    </>
  )
}


