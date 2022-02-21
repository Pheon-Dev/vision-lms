import React, { useEffect, useState } from "react";

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { products, memberDetailMoreMemberQuery, memberDetailQuery, loanFeedQuery, searchQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components';


export default function LoansFeed() {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  // const { memberId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(false);
  const { loanId } = useParams();

  useEffect(() => {
    if (loanId) {
      setLoading(true);
      const query = searchQuery(loanId);
      client.fetch(query).then((data) => {
        setMembers(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(loanFeedQuery).then((data) => {
        setMembers(data);
        setLoading(false);
      });
    }
  }, [loanId]);
  // console.log(members)

  const ideaName = loanId || 'all';
  if (loading) {
    return (
      <Spinner message={`We are populating ${ideaName} loan data to your feed!`} />
    );
  }

  if (members?.length === 0) {
    return (
      <div className="text-xl font-bold text-center items-center">No data available yet for {ideaName} data.</div>
    )
  }

  let isPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
  let isNotPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-800"

  function renderMembers() {
    return (
      <tr
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/loan/maintenance/${member._id}`)}
        key={member._id}
        className="hover:bg-gray-300 cursor-pointer"
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 rounded-full" src={(urlFor(image).width(250).url())} alt="member-profile" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{member.endDate}</div>
              {/* <div className="text-sm text-gray-500">{personalDetails?.emailAddress}</div> */}
            </div>
            {/* <div className="ml-4"> */}
            {/*   <div className="text-sm font-medium text-gray-900">{postedBy?.userName}</div> */}
            {/*   <div className="text-sm text-gray-500">{personalDetails?.emailAddress}</div> */}
            {/* </div> */}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.memberNumber}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.product}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">

          <span className={(personalDetails?.mpesaTransNumber ? isPaidStyle : isNotPaidStyle)} >
            {personalDetails?.mpesaTransNumber}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.personalDetails?.mobileNumber}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </td>
      </tr>
    )
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">principal</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">start</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">end</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">tenure</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members?.map((member) => (
                  <tr
                    onMouseEnter={() => setPostHovered(true)}
                    onMouseLeave={() => setPostHovered(false)}
                    onClick={() => navigate(`/loan/preview/${member._id}`)}
                    key={member._id}
                    className="hover:bg-gray-300 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {/* <img className="h-10 w-10 rounded-full" src={(urlFor(image).width(250).url())} alt="member-profile" /> */}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.productType}</div>
                          <div className="text-sm font-medium text-gray-900">{member.memberId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.principalAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.startDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.endDate}</div>
                      {/* <span className={(member.personalDetails?.mpesaTransNumber ? isPaidStyle : isNotPaidStyle)} > */}
                      {/*   {member.personalDetails?.mpesaTransNumber} */}
                      {/* </span> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.loanTenure}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
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



