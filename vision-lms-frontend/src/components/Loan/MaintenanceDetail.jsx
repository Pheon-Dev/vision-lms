import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, memberDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'


export default function MaintenanceDetail({ user }) {
  const { memberId } = useParams();
  const [members, setMembers] = useState();
  const [memberDetail, setMemberDetail] = useState();
  const [comment, setComment] = useState('');
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [period, setPeriod] = useState("");

  const fetchMemberDetails = () => {
    let query = memberDetailQuery(memberId);

    if (query) {
      client.fetch(query).then((data) => {
        setMemberDetail(data[0]);
        // console.log(data);
        if (data[0]) {
          query = memberDetailMoreMemberQuery(data[0]);
          client.fetch(query).then((res) => {
            setMembers(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(memberId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchMemberDetails();
          setComment('');
          setAddingComment(false);
        });
    };
  };

  if (!memberDetail) {
    return (
      <Spinner message="Loading Member Details ..." />
    );
  };

  function productOne(principal, rate, time) {
    return (principal * (1 + ((rate / 100) * (time / 365))));
  }
  function productTwo(principal, rate, time) {
    return (principal * (1 + ((rate / 100) * (time / 52))));
  }
  function productThree(principal, rate, time) {
    return (principal * (1 + ((rate / 100) * (time / 12))));
  }

  return (
    <div>
      {memberDetail && (
        <>

          <div className="w-full md:w-full md:mx-2">
            <div className="bg-white p-3">
              {/* <div className="bg-white p-3 border-t-4 border-cyan-400"> */}
              <div className="image overflow-hidden">
                <img className="h-auto w-1/4 mx-auto" src={(memberDetail?.image && urlFor(memberDetail?.image).url())} alt="member-profile-pic" />
              </div>
              <div className="text-gray-900 font-bold text-xl leading-8 my-1">{memberDetail?.personalDetails.surName} {memberDetail?.personalDetails.otherNames}</div>
              {/* <div className="text-gray-700 font-lg text-semibold leading-6">{memberDetail?.memberNumber}</div> */}
              {/* <div className="text-sm text-gray-500 hover:text-gray-700 leading-6">{memberDetail?.branchName}</div> */}
              {/* <div className="text-gray-900 font-bold text-xl leading-8 my-1 mt-5">Personal Details</div> */}
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>
                    Member ID
                  </span>
                  <span className="ml-auto">{memberDetail?._id}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>
                    Date
                  </span>
                  <span className="ml-auto">{memberDetail?.date}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>
                    Phone Number
                  </span>
                  <span className="ml-auto">{memberDetail?.personalDetails.mobileNumber}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>
                    Member Number
                  </span>
                  <span className="ml-auto">{memberDetail?.memberNumber}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Fee Payment</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">{memberDetail?.personalDetails.mpesaTransNumber}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="my-4"></div>
            <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-cyan-500">
                  <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <span>Group Members</span>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-center my-2">
                  <img className="h-16 w-16 rounded-full mx-auto" alt="group-member" src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg" />
                  <a href="#" className="text-main-color">Sam Smith</a>
                </div>
                <div className="text-center my-2">
                  <img className="h-16 w-16 rounded-full mx-auto" alt="group-member" src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg" />
                  <a href="#" className="text-main-color">Rose Mayor</a>
                </div>
                <div className="text-center my-2">
                  <img className="h-16 w-16 rounded-full mx-auto" alt="group-member" src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png" />
                  <a href="#" className="text-main-color">Ben Foster</a>
                </div>
              </div>
            </div>
            {/* Loan */}

            <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold mt-5 p-2">Loan Maintenance</div>
            <div className="flex flex-wrap mt-8 -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  Amount (KShs)
                  <span className="text-red-500 italic">*</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="principalAmount"
                  type="number"
                  placeholder="Principal Amount ..."
                  value={principalAmount}
                  onChange={(e) => setPrincipalAmount(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label className="block tracking-wide text-xs mb-2">
                  <span className="uppercase text-gray-700 font-bold text-md">Interest Rate (%)</span>
                  {/* <span className="text-red-500 italic">*</span> */}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="interestRate"
                  type="number"
                  placeholder="Interest Rate ..."
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <label className="block tracking-wide text-xs mb-2">
                  <span className="uppercase text-gray-700 font-bold text-md">Loan Tenure </span>
                  {/* <span className="text-red-500 italic">*</span> */}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="loanTenure"
                  type="number"
                  placeholder="Loan Tenure ..."
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-l mb-2 text-gray-700 font-bold text-md">
                  Product One
                </label>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-l font-bold mb-2">
                  in {loanTenure} {loanTenure == 1 ? "Day" : "Days"}
                </label>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-l mb-2 text-gray-700 font-bold text-md">
                  KShs. {productOne((principalAmount), (interestRate), (loanTenure)).toFixed(2)}
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-l mb-2 text-gray-700 font-bold text-md">
                  Product Two
                </label>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-l font-bold mb-2">
                  in {loanTenure} {loanTenure == 1 ? "Week" : "Weeks"}
                </label>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-l mb-2 text-gray-700 font-bold text-md">
                  KShs. {productTwo((principalAmount), (interestRate), (loanTenure)).toFixed(2)}
                </label>
              </div>
            </div>
            <div className="flex">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-l mb-2 text-gray-700 font-bold text-md">
                  Product Three
                </label>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-l font-bold mb-2">
                  in {loanTenure} {loanTenure == 1 ? "Month" : "Months"}
                </label>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-l mb-2 text-gray-700 font-bold text-md">
                  KShs. {productThree((principalAmount), (interestRate), (loanTenure)).toFixed(2)}
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <pre>{JSON.stringify(members, undefined, 2)}</pre> */}
    </div>
  )
}



