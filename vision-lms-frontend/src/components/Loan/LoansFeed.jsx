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
    // setLoading(true)
    const mquery = '*[_type == "maintenance"]';
    const dquery = '*[_type == "disburse"]';
    const aquery = '*[_type == "approve"]';

    client.fetch(mquery).then((data) => {
      setSubmittedList(data);
      // setLoading(false)
    });

    client.fetch(dquery).then((data) => {
      setDisbursedList(data);
      // setLoading(false)
    });

    client.fetch(aquery).then((data) => {
      setApprovedList(data);
      // setLoading(false)
    });

    return (() => console.log('unsubscribing'));

  }, []);

  // console.log(members)
  const deleteLoan = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    })
  }

  // const dis = 'Disbursed' || 'all';
  // const app = 'Approved' || 'all';
  // const sub = 'Submitted' || 'all';
  // if (loading) {
  //   return (
  //     <Spinner message={`Fetching ${sub}, ${app} and ${dis} data ...`} />
  //   );
  // }

  // if (submittedList?.length === 0) {
  //   return (
  //     <Spinner message={`Fetching ${sub} data ...`} />
  //   )
  // }

  // if (approvedList?.length === 0) {
  //   return (
  //     <Spinner message={`Fetching ${app} data ...`} />
  //   )
  // }

  // if (disbursedList?.length === 0) {
  //   return (
  //     <Spinner message={`Fetching ${dis} data ...`} />
  //   )
  // }
  // console.log(members)

  let isPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
  let isNotPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-800"


  function renderSubmittedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Maintained Loans</span>
          <span className="text-gray-500 ml-auto mr-auto">(pending approval)</span>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submittedList ? submittedList?.map((member) => (
                    member.maintained !== 'false' && member.approved === 'false' && member.disbursed === 'false' ?
                      <tr
                        onClick={() => {
                          navigate(`/loan/approvals/${member._id}`);
                        }}
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
                            Approve
                          </div>
                        </td>
                      </tr>
                      :
                      null
                  ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderAllApprovedLoans() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Approved Loans</span>
          <span className="text-gray-500 ml-auto mr-auto">(pending disbursal)</span>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {approvedList ? approvedList?.map((member) => (
                    member.maintained !== 'true' && member.approved !== 'false' && member.disbursed === 'false' ?
                      <tr
                        onClick={() => {
                          navigate(`/loan/disbursements/${member._id}`);
                        }}
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
                            Disburse
                          </div>
                        </td>
                      </tr>
                      :
                      null
                  ))
                    : null}
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
          <span className="text-gray-700 ml-auto mr-auto">Disbursed Loans</span>
          <span className="text-gray-500 ml-auto mr-auto">(All disbursed loans)</span>
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
                  {disbursedList ? disbursedList?.map((member) => (
                    member.maintained !== 'false' && member.approved === 'true' && member.disbursed !== 'false' ?
                      <tr
                        onClick={() => member.memberIdentity ? navigate(`/member/member-detail/${member.memberIdentity}`) : navigate(`/member/member-detail/${member.memberId}`)}
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
                          <div className="text-sm font-medium text-blue-600">
                            Active
                          </div>
                        </td>
                      </tr>
                      :
                      null
                  ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderEmpty(header, text) {
    return (
      <div className="font-bold flex flex-col mt-5 mb-8 pb-7 pt-7 justify-center w-full text-xl">
        <span className="text-gray-700 ml-auto mr-auto">{header} Loans</span>
        <span className="text-gray-500 ml-auto mr-auto">{text}</span>
      </div>
    )
  }
  return (
    <>
      {renderSubmittedLoans()}
      {renderAllApprovedLoans()}
      {renderDisbursedLoans()}
    </>
  )
}



