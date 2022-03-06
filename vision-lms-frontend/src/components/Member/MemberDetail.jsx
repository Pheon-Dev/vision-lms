import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, memberDetailQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components'

export default function MemberDetail() {
  const { memberId } = useParams();
  const [members, setMembers] = useState();
  const [memberDetail, setMemberDetail] = useState();
  const [groupInfo, setGroupInfo] = useState('');
  const [groupDetails, setGroupDetails] = useState('');
  const [groupId, setGroupId] = useState('');
  const [page, setPage] = useState();
  const [title, setTitle] = useState('info');
  const [loanStatus, setLoanStatus] = useState('');
  const [loanDetails, setLoanDetails] = useState('hide');
  const [addingComment, setAddingComment] = useState(false);

  const navigate = useNavigate();

  const fetchMemberDetails = () => {
    // let mquery = memberDetailQuery(memberId);
    let query = `*[_type == "member" && _id == '${memberId}']`;
    let mquery = `*[_type == "member" && group == '${groupId}']`;
    let gquery = `*[_type == "groups" && groupName == '${groupId}']`;
    let squery = `*[_type == "approve" && memberId == '${memberId}']`;

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

    client.fetch(mquery).then((data) => {
      setGroupInfo(data)
    });

    client.fetch(gquery).then((data) => {
      setGroupDetails(data)
    });

    client.fetch(squery).then((data) => {
      setLoanStatus(data)
    });
  };

  useEffect(() => {
    fetchMemberDetails();
    return (() => console.log('unsubscribing'));
  }, [memberId, groupId]);

  // console.log(loanStatus)

  const isActiveStyle = 'flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1 dark:border-indigo-400 dark:text-indigo-800 whitespace-nowrap focus:outline-none';
  const isNotActiveStyle = 'flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400';
  // const addComment = () => {
  //   if (comment) {
  //     setAddingComment(true);
  //     client
  //       .patch(memberId)
  //       .setIfMissing({ comments: [] })
  //       .insert('after', 'comments[-1', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
  //       .commit()
  //       .then(() => {
  //         fetchMemberDetails();
  //         setComment('');
  //         setAddingComment(false);
  //       });
  //   };
  // };

  if (!memberDetail) {
    return (
      <Spinner message="Loading Member Details ..." />
    );
  };


  function renderGroupInfo() {
    return (
      <>
        <div className="flex flex-wrap justify-center items-center ml-auto mr-auto w-full md:w-3/4 p-3">
          <span className="text-cyan-500">
            <svg className="h-7 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </span>
          <span className="text-xl p-2 font-bold">{groupInfo[0]?.group === 'false' || groupInfo[0]?.group === undefined ? 'Add to a Group' : 'Group Members'}</span>
        </div>
        <div className="flex flex-wrap p-3 justify-center ml-auto mr-auto w-full md:w-1/2">
          <div className={groupInfo.length === 3 ? groupInfo?.length === 2 ? "grid grid-cols-2 gap-8" : "grid grid-cols-3 gap-8" : "flex justify-center items-center mr-auto ml-auto"}>
            {groupInfo && groupInfo.map((member) => (
              <div key={member._id} className="text-center m-3">
                <img className="h-16 w-16 rounded-full mx-auto w-full" alt="group-member" src={(member?.image && urlFor(member?.image).url())} />
                <a href="#" className="text-main-color">{member?.personalDetails?.surName} {member?.personalDetails?.otherNames}</a>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
        <button
          onClick={() => {
            navigate("/group/create-group")
          }}
          className={groupInfo[0]?.group === 'false' || groupInfo[0]?.group === undefined ? "flex justify-center ml-auto mr-auto px-6 py-1 border-2 border-indigo-600 rounded-full text-gray-500 font-semibold" : "flex justify-center ml-auto mr-auto px-6 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold"}>{groupInfo[0]?.group === 'false' || groupInfo[0]?.group === undefined ? 'Create a Group' : `Lookup ${groupInfo[0]?.group}`}</button>
        <div className="mt-5">
          {groupInfo[0]?.group === 'false' || groupInfo[0]?.group === undefined ?
            <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
              <h1 className="font-bold text-xl text-gray-500">Not in any group</h1>
            </div>
            :
            <>
              <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
                <h1 className="font-bold text-xl text-gray-500">Group Inforamtion</h1>
              </div>
              <div className="ml-auto mr-auto mb-3">
                <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Group Name
                    </span>
                    <span className="ml-auto">{groupDetails[0]?.groupName}</span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Group Leader
                    </span>
                    <span className="ml-auto">{groupDetails[0]?.groupLeaderName}</span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Group Initiator
                    </span>
                    <span className="ml-auto">{groupDetails[0]?.groupInitiatorName}</span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Registered on
                    </span>
                    <span className="ml-auto">{groupDetails[0]?.date}</span>
                  </li>
                </ul>
              </div>
            </>
          }
        </div>
      </>
    )
  }

  function renderBriefInfo() {
    return (
      <>
        <div>
          {title === 'info' && (
            <div className="image overflow-hidden">
              <img className="h-64 w-64 p-3 mx-auto" src={(memberDetail?.image && urlFor(memberDetail?.image).url())} alt="member-profile-pic" />
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
            <h1 className="font-bold text-xl text-gray-500">{memberDetail?.personalDetails.surName} {memberDetail?.personalDetails.otherNames}</h1>
          </div>
          <div className="ml-auto mr-auto mb-3">
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span className="tracking-wide text-l text-gray-700 font-bold">
                  Member Code
                </span>
                <span className="ml-auto">DC-{memberDetail?.memberNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span className="tracking-wide text-l text-gray-700 font-bold">
                  Mobile No.
                </span>
                <span className="ml-auto">{memberDetail?.personalDetails?.mobileNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span className="tracking-wide text-l text-gray-700 font-bold">
                  Email
                </span>
                <span className="ml-auto">{memberDetail?.personalDetails?.emailAddress}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span className="tracking-wide text-l text-gray-700 font-bold">
                  ID Number
                </span>
                <span className="ml-auto">{memberDetail?.personalDetails?.idPass}</span>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  function renderMoreInfo() {
    return (
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {memberDetail && (
            <>
              {/* <div className="w-full md:w-3/12 md:mx-2"> */}
              {/* </div> */}
              <div className="w-full mx-2 h-64">
                <div className="flex justify-center p-3 items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-cyan-500">
                    <svg className="h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="tracking-wide text-xl p-2 font-bold">Personal Details</span>
                </div>
                <div className="bg-white p-3 shadow-sm rounded-lg">
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
                <div className="flex justify-center p-3 items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="text-cyan-500">
                    <svg className="h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="tracking-wide text-xl p-2 font-bold">Next of Kin information</span>
                </div>
                <div className="flex flex-wrap justify-center shadow-sm rounded-sm">
                  {/* <div className="w-full md:w-9/12 mx-2 h-64"> */}
                  <div className="bg-white w-full md:w-2/3 mb-8 p-3 rounded-lg">
                    <div>
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
                {/* <div className="w-full p-5 flex-1 xl:min-w-620"> */}
                {/*   <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"> */}
                {/*     <span className="tracking-wide">Registered By</span> */}
                {/*   </div> */}
                {/*   <Link to={`/user-profile/${memberDetail?.postedBy._id}`} className="flex gap-2 items-center bg-white rounded-lg"> */}
                {/*     <img */}
                {/*       src={memberDetail?.postedBy.image} */}
                {/*       className="w-10 h-10 rounded-full" */}
                {/*       alt="user-profile" */}
                {/*     /> */}
                {/*     <span>{memberDetail?.postedBy.userName}</span> */}
                {/*   </Link> */}
                {/*   <h2 className="mt-5 text-2xl">Member Review</h2> */}
                {/*   <div className="max-h-360 overflow-y-auto"> */}
                {/*     {memberDetail?.comments?.map((item) => ( */}
                {/*       <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}> */}
                {/*         <img */}
                {/*           src={item.postedBy?.image} */}
                {/*           className="w-10 h-10 rounded-full cursor-pointer" */}
                {/*           alt="user-profile" */}
                {/*         /> */}
                {/*         <div className="flex flex-col"> */}
                {/*           <p className="font-bold"> */}
                {/*             {item.postedBy?.userName} */}
                {/*           </p> */}
                {/*           <p>{item.comment}</p> */}
                {/*         </div> */}
                {/*       </div> */}
                {/*     ))} */}
                {/*   </div> */}
                {/*   <div className="flex flex-wrap mt-6 gap-3"> */}
                {/*     <Link to={`/user-profile/${user._id}`}> */}
                {/*       <img */}
                {/*         src={user.image} */}
                {/*         className="w-10 h-10 rounded-full cursor-pointer" */}
                {/*         alt="user-profile" */}
                {/*       /> */}
                {/*     </Link> */}
                {/*     <input */}
                {/*       className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300" */}
                {/*       type="text" */}
                {/*       placeholder="Leave a Review ..." */}
                {/*       value={comment} */}
                {/*       onChange={(e) => setComment(e.target.value)} */}
                {/*     /> */}
                {/*     <button */}
                {/*       type="button" */}
                {/*       className="bg-cyan-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none" */}
                {/*       onClick={addComment} */}
                {/*     > */}
                {/*       {addingComment ? 'Writing ...' : 'Post'} */}
                {/*     </button> */}
                {/*   </div> */}
                {/* </div> */}
              </div>
            </>
          )}
        </div>
      </div >
    )
  }

  function renderActions() {
    return (
      <>
        {renderStatusReport()}
        <div className="mb-8" />
        <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
          {loanStatus?.length === 0 ? null :
            <h1 className="font-bold text-xl text-gray-500">Loan Details</h1>
          } </div>
        {
          loanStatus?.map((loan) => (
            <div className="bg-gray-400 ml-auto mr-auto p-2 mb-7 rounded-lg">
              <div>
                <div className="ml-auto mr-auto mb-3">
                  <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                    <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                      <span className="tracking-wide text-l text-gray-700 font-bold">
                        Loan A/C Number
                      </span>
                      <span className="ml-auto">DC-{loan?.loanAccNumber}</span>
                    </li>
                    <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                      <span className="tracking-wide text-l text-gray-700 font-bold">
                        Approval Status
                      </span>
                      <span className="ml-auto">{loan?.approved === 'true' ? 'Approved' : 'Pending Approval'}</span>
                    </li>
                    <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                      <span className="tracking-wide text-l text-gray-700 font-bold">
                        Disbursal Status
                      </span>
                      <span className="ml-auto">{loan?.disbursed === 'true' ? 'Disbursed' : 'Pending Disbursal'}</span>
                    </li>
                    <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                      <span className="tracking-wide text-l text-gray-700 font-bold">
                        Principal
                      </span>
                      <span className="ml-auto">KSHs. {loan?.principalAmount}</span>
                    </li>
                    <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                      <span className="tracking-wide text-l text-gray-700 font-bold">
                        Product
                      </span>
                      <span className="ml-auto">{loan?.productType}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 p-2">
                  <div className="w-full md:w-1/2 mr-auto ml-auto">
                    <button
                      type="button"
                      // onClick={handleProductCreate}
                      // onMouseEnter={handleProductSave}
                      className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {loan?.approve === 'false' ? 'Approve' : 'Disburse'}
                    </button>
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="w-full md:w-1/2 mr-auto ml-auto">
                    <button
                      type="button"
                      onClick={() => { navigate(`/loan/preview/${loan?.loanId}`) }}
                      // onMouseEnter={handleProductSave}
                      className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      More Details ...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </>
    )
  }

  function renderStatusReport() {
    return (
      <>
        <div className=" flex  flex-col  md:flex-row justify-center  flex-wrap gap-3 mt-10  ">
          <div className="">
            <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer" >
              <div className="bg-indigo-500  flex h-20  items-center">
                <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">{loanStatus?.length}</h1>
                <p className="ml-4 text-white uppercase">Loans</p>
              </div>
              <p className="py-6 px-6 text-lg tracking-wide text-center">
                → {loanStatus?.length === 0 ?
                  'No Active Loan.'
                  :
                  loanStatus?.length + ' active loans.'
                }
              </p>
              {loanStatus?.length === 0 ?
                <div className="flex justify-center px-5 mb-2 text-sm ">
                  <button
                    onClick={() => {
                      setLoanDetails('show')
                    }}
                    type="button"
                    className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                  >
                    Maintain
                  </button>
                </div> : null}
            </div>
          </div>
          {/* <div className=""> */}
          {/*   <div className="bg-white max-w-xs mx-auto rounded-2xl  border-b-4 border-green-500 overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer"> */}
          {/*     <div className="h-20 bg-green-500 flex items-center "> */}
          {/*       <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">2</h1> */}
          {/*       <p className=" text-white text-base ml-4 uppercase"> */}
          {/*         Update */}
          {/*       </p> */}
          {/*     </div> */}
          {/*     <p className="py-6 px-6 text-lg tracking-wide text-center">Description Goes Here</p> */}
          {/*     <div className="flex justify-center px-5 mb-2 text-sm "> */}
          {/*       <button type="button" */}
          {/*         className="border border-green-500 text-green-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-green-600 focus:outline-none focus:shadow-outline"> */}
          {/*         Update */}
          {/*       </button> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
          {/* <div className=""> */}
          {/*   <div className="bg-white max-w-xs mx-auto rounded-2xl  border-b-4 border-red-500 overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer"> */}
          {/*     <div className="h-20 bg-red-500 flex items-center "> */}
          {/*       <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">3</h1> */}
          {/*       <p className=" text-white text-base ml-4 uppercase"> */}
          {/*         Delete */}
          {/*       </p> */}
          {/*     </div> */}
          {/*     <p className="py-6  px-6 text-lg tracking-wide text-center">Description Goes Here</p> */}
          {/*     <div className="flex justify-center px-5 mb-2 text-sm "> */}
          {/*       <button type="button" className="border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-red-600 focus:outline-none focus:shadow-outline"> */}
          {/*         Delete */}
          {/*       </button> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center mt-5 p-5 rounded-lg">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onMouseEnter={() => {
              setGroupId(memberDetail.group)
            }}
            onClick={() => {
              setPage(renderMoreInfo());
              setGroupId(memberDetail.group)
              setTitle('info')
            }}
            className={title === 'info' ? isActiveStyle : isNotActiveStyle}
          // className="flex items-center h-10 px-2 py-2 -mb-px text-center text-indigo-600 bg-transparent border-b-2 border-indigo-500 sm:px-4 -px-1 dark:border-indigo-400 dark:text-indigo-300 whitespace-nowrap focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>

            <span className="mx-1 text-sm sm:text-base"> Profile </span>
          </button>

          <button
            onMouseEnter={() => {
              setGroupId(memberDetail.group)
            }}
            onClick={() => {
              setPage(renderGroupInfo());
              setGroupId(memberDetail.group)
              setTitle('group')
            }}
            className={title === 'group' ? isActiveStyle : isNotActiveStyle}
          >
            <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            <span className="mx-1 text-sm sm:text-base"> Group </span>
          </button>

          <button
            onMouseEnter={() => {
              setGroupId(memberDetail.group)
            }}
            onClick={() => {
              setPage(renderActions());
              setGroupId(memberDetail.group)
              setTitle('action')
            }}
            className={title === 'action' ? isActiveStyle : isNotActiveStyle}
          // className="flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>

            <span className="mx-1 text-sm sm:text-base"> Actions </span>
          </button>
        </div>
      </div>
      {renderBriefInfo()}
      {page}
    </>
  )
}
