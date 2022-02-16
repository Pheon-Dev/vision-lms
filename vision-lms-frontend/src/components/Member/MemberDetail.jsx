import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, memberDetailQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components'

export default function MemberDetail({ user }) {
  const { memberId } = useParams();
  const [members, setMembers] = useState();
  const [memberDetail, setMemberDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  // const fetchMemberDetails = () => {
  //   const query = memberDetailQuery(memberId);

  //   if (query) {
  //     client.fetch(`${query}`).then((data) => {
  //       setMemberDetail(data[0]);
  //       console.log(data);
  //       if (data[0]) {
  //         const query1 = memberDetailMoreMemberQuery(data[0]);
  //         client.fetch(query1).then((res) => {
  //           setMembers(res);
  //         });
  //       }
  //     });
  //   }
  // };
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

  // console.log(memberDetail)

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2">
        {memberDetail && (
          <>
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white p-3">
                {/* <div className="bg-white p-3 border-t-4 border-cyan-400"> */}
                <div className="image overflow-hidden">
                  <img className="h-auto w-full mx-auto" src={(memberDetail?.image && urlFor(memberDetail?.image).url())} alt="member-profile-pic" />
                </div>
                <div className="text-gray-900 font-bold text-xl leading-8 my-1">{memberDetail?.personalDetails.surName} {memberDetail?.personalDetails.otherNames}</div>
                {/* <div className="text-gray-700 font-lg text-semibold leading-6">{memberDetail?.memberNumber}</div> */}
                {/* <div className="text-sm text-gray-500 hover:text-gray-700 leading-6">{memberDetail?.branchName}</div> */}
                {/* <div className="text-gray-900 font-bold text-xl leading-8 my-1 mt-5">Personal Details</div> */}
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>
                      Date
                    </span>
                    <span className="ml-auto">{memberDetail?.date}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>
                      Branch Name
                    </span>
                    <span className="ml-auto">{memberDetail?.branchName}</span>
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
                <div className="mt-5 ml-5">
                  <div className="flex items-center space-x-3 font-semibold text-gray-600 text-xl leading-8">
                    <span>Group Information</span>
                  </div>
                  <div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-gray-900 font-bold text-sm">Group Name</div>
                        <div className="text-teal-500 text-sm">{memberDetail?.groupInformation.groupName}</div>
                      </li>
                      <li>
                        <div className="text-gray-900 font-bold text-sm">Name of Group Leader</div>
                        <div className="text-teal-500 text-sm">{memberDetail?.groupInformation.groupLeaderName}</div>
                      </li>
                      <li>
                        <div className="text-gray-900 font-bold text-sm">ID No. of Leader</div>
                        <div className="text-teal-500 text-sm">{memberDetail?.groupInformation.leaderIdNumber}</div>
                      </li>
                      <li>
                        <div className="text-gray-900 font-bold text-sm">Mobile No. of Leader</div>
                        <div className="text-teal-500 text-sm">{memberDetail?.groupInformation.leaderNumber}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-cyan-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">Personal Details</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Surname</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.surName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Other Names</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.otherNames}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Date of Birth</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.dob}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">ID/Passsport No.</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.idPass}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">PIN No.</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.pinNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Mobile No.</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.mobileNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Age</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.age}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Religion</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.religion}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Marital Status</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.maritalStatus}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Name of Spouse</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.nameSpouse}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Spouse Tel. No.</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.spouseNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Postal Address</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.postalAddress}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Postal Code</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.postalCode}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">City/Town</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.cityTown}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Residential Address</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.residentialAddress}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email Address</div>
                      <div className="px-4 py-2">
                        <a href={`mailto:${memberDetail?.personalDetails.emailAddress}`} className="text-blue-800">{memberDetail?.personalDetails.emailAddress}</a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Rented</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.rented}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Owned</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.owned}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Landlord/Caretaker/Agent Name</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.landCareAgent}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Occupation/Employer</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.occupationEmployer}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Employer Contacts (Tel. No.)</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.employerNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Location of Business</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.businessLocation}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Age of Business</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.businessAge}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Name of Referee</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.refereeName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Group</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.group}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Position of Leadership in the Community</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.communityPosition}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Membership Fee M-PESA Transaction No.</div>
                      <div className="px-4 py-2">{memberDetail?.personalDetails.mpesaTransNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4"></div>
              <div className="bg-white p-3 shadow-sm rounded-sm">
                {/* <div className="w-full md:w-9/12 mx-2 h-64"> */}
                <div className="w-2/3 grid grid-cols-1">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span className="text-cyan-500">
                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <span className="tracking-wide">Next of Kin information</span>
                    </div>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>
                          Name
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.nameKin}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>
                          Relationship
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.relationship}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>
                          Residential Address
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.residentialAddressKin}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>
                          Postal Address
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.postalAddressKin}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>
                          Postal Code
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.postalCodeKin}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>
                          City/Town
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.cityTownKin}</span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>
                          Mobile/Tel No.
                        </span>
                        <span className="ml-auto">{memberDetail?.kinInformation.mobileNumberKin}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="tracking-wide">Registered By</span>
                </div>
                <Link to={`/user-profile/${memberDetail?.postedBy._id}`} className="flex gap-2 items-center bg-white rounded-lg">
                  <img
                    src={memberDetail?.postedBy.image}
                    className="w-10 h-10 rounded-full"
                    alt="user-profile"
                  />
                  <span>{memberDetail?.postedBy.userName}</span>
                </Link>
                <h2 className="mt-5 text-2xl">Member Review</h2>
                <div className="max-h-360 overflow-y-auto">
                  {memberDetail?.comments?.map((item) => (
                    <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                      <img
                        src={item.postedBy?.image}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="user-profile"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">
                          {item.postedBy?.userName}
                        </p>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap mt-6 gap-3">
                  <Link to={`/user-profile/${user._id}`}>
                    <img
                      src={user.image}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                  </Link>
                  <input
                    className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                    type="text"
                    placeholder="Leave a Review ..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-cyan-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                    onClick={addComment}
                  >
                    {addingComment ? 'Writing ...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  )
}
