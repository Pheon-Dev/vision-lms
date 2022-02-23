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
  const [memberDetail, setMemberDetail] = useState();
  // const [memberIdentity, setMemberIdentity] = useState();
  const [loading, setLoading] = useState(false);
  const { loanId } = useParams();

  const [submittedList, setSubmittedList] = useState();
  const [approvedList, setApprovedList] = useState();
  const [disbursedList, setDisbursedList] = useState();

  useEffect(() => {
    const query = '*[_type == "disburse"]';

    client.fetch(query).then((data) => {
      setDisbursedList(data);
    });

  }, []);
  useEffect(() => {
    const query = '*[_type == "approve"]';

    client.fetch(query).then((data) => {
      setApprovedList(data);
    });

  }, []);

  useEffect(() => {
    const query = '*[_type == "preview"]';

    client.fetch(query).then((data) => {
      setSubmittedList(data);
    });

  }, []);

  // console.log(members)
  const deleteLoan = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    })
  }

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

  const ideaName = loanId || 'all';
  if (loading) {
    return (
      <Spinner message={`We are populating ${ideaName} loan data to your feed!`} />
    );
  }

  if (members?.length === 0) {
    return (
      <div className="text-xl font-bold text-center items-center">No data available yet for {ideaName} loans previewal.</div>
    )
  }

  // console.log(members)

  let isPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
  let isNotPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-800"


  function renderDisbursedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Disbursed Loans</span>
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
                  {disbursedList?.map((member) => (
                    <tr
                      // onMouseEnter={() => {
                      //   setPostHovered(true);
                      //   setMemberIdentity(member.memberId);
                      // }}
                      onMouseLeave={() => setPostHovered(false)}
                      // onClick={() => navigate(deleteLoan(member._id))}
                      onClick={() => navigate(`/loan/disbursements/${member.loanId}`)}
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
                          Check
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

  function renderApprovedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Approved Loans</span>
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
                  {approvedList?.map((member) => (
                    <tr
                      // onMouseEnter={() => {
                      //   setPostHovered(true);
                      //   setMemberIdentity(member.memberId);
                      // }}
                      onMouseLeave={() => setPostHovered(false)}
                      // onClick={() => navigate(deleteLoan(member._id))}
                      onClick={() => navigate(`/loan/disbursements/${member.loanId}`)}
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
                          Disburse
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

  function renderSubmittedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Submitted Loans</span>
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
                  {submittedList?.map((member) => (
                    <tr
                      // onMouseEnter={() => {
                      //   setPostHovered(true);
                      //   setMemberIdentity(member.memberId);
                      // }}
                      onMouseLeave={() => setPostHovered(false)}
                      // onClick={() => navigate(deleteLoan(member._id))}
                      onClick={() => navigate(`/loan/approvals/${member.loanId}`)}
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
                          Approve
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

  function renderAllLoans() {
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
                  {members?.map((member) => (
                    <tr
                      // onMouseEnter={() => {
                      //   setPostHovered(true);
                      //   setMemberIdentity(member.memberId);
                      // }}
                      onMouseLeave={() => setPostHovered(false)}
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
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
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
      {renderAllLoans()}
      {renderSubmittedLoans()}
      {renderApprovedLoans()}
      {renderDisbursedLoans()}
    </>
  )
}



