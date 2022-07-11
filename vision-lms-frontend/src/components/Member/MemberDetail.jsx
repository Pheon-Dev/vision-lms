import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { client, urlFor } from "../../client";
import { List, Label, Spinner, ListLayout } from "../Components";

export default function MemberDetail() {
  const { memberId } = useParams();
  const [memberDetail, setMemberDetail] = useState();
  const [groupInfo, setGroupInfo] = useState("");
  const [groupDetails, setGroupDetails] = useState("");
  const [groupId, setGroupId] = useState("");
  const [page, setPage] = useState();
  const [title, setTitle] = useState("info");
  const [loanStatus, setLoanStatus] = useState("");

  const navigate = useNavigate();

  const fetchMemberDetails = () => {
    let subscription = true;
    let query = `*[_type == "member" && _id == '${memberId}']`;
    let mquery = `*[_type == "member" && group == '${groupId}']`;
    let gquery = `*[_type == "groups" && groupName == '${groupId}']`;
    let squery = `*[_type == "approve" && memberId == '${memberId}']`;

    if (subscription) {
      client.fetch(query).then((data) => {
        setMemberDetail(data[0]);
      });

      client.fetch(mquery).then((data) => {
        setGroupInfo(data);
      });

      client.fetch(gquery).then((data) => {
        setGroupDetails(data);
      });

      client.fetch(squery).then((data) => {
        setLoanStatus(data);
      });
    }
    return () => (subscription = false);
  };

  useEffect(() => {
    fetchMemberDetails();
  }, [memberId, groupId]);

  if (!memberDetail) {
    return <Spinner message="Loading Member Details ..." />;
  }

  function renderGroupInfo() {
    return (
      <>
        <div className="flex flex-wrap justify-center items-center ml-auto mr-auto w-full md:w-3/4 p-3">
          <span className="text-cyan-500">
            <svg
              className="h-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
          <span className="text-xl p-2 font-bold">
            {groupInfo[0]?.group === "false" ||
            groupInfo[0]?.group === undefined
              ? "Add to a Group"
              : "Group Members"}
          </span>
        </div>
        <div className="flex flex-wrap p-3 justify-center ml-auto mr-auto w-full md:w-1/2">
          <div
            className={
              groupInfo.length === 3
                ? groupInfo?.length === 2
                  ? "grid grid-cols-2 gap-8"
                  : "grid grid-cols-3 gap-8"
                : "flex justify-center items-center mr-auto ml-auto"
            }
          >
            {groupInfo &&
              groupInfo.map((member) => (
                <div key={member._id} className="text-center m-3">
                  <img
                    className="h-16 w-16 rounded-full mx-auto w-full"
                    alt="group-member"
                    src={member?.image && urlFor(member?.image).url()}
                  />
                  <a href="#" className="text-main-color">
                    {member?.surName} {member?.otherNames}
                  </a>
                </div>
              ))}
          </div>
          {/* </div> */}
        </div>
        <button
          onClick={() => {
            navigate("/group/create-group");
          }}
          className={
            groupInfo[0]?.group === "false" || groupInfo[0]?.group === undefined
              ? "flex justify-center ml-auto mr-auto px-6 py-1 border-2 border-indigo-600 rounded-full text-gray-500 font-semibold"
              : "flex justify-center ml-auto mr-auto px-6 py-1 border-2 border-indigo-600 bg-indigo-600 rounded-full text-gray-50 font-semibold"
          }
        >
          {groupInfo[0]?.group === "false" || groupInfo[0]?.group === undefined
            ? "Create a Group"
            : `Lookup ${groupInfo[0]?.group}`}
        </button>
        <div className="mt-5">
          {groupInfo[0]?.group === "false" ||
          groupInfo[0]?.group === undefined ? (
            <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
              <h1 className="font-bold text-xl text-gray-500">
                Not in any group
              </h1>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
                <h1 className="font-bold text-xl text-gray-500">
                  Group Inforamtion
                </h1>
              </div>
              <div className="ml-auto mr-auto mb-3">
                <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Group Name
                    </span>
                    <span className="ml-auto">
                      {groupDetails[0]?.groupName}
                    </span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Group Leader
                    </span>
                    <span className="ml-auto">
                      {groupDetails[0]?.groupLeaderName}
                    </span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Group Initiator
                    </span>
                    <span className="ml-auto">
                      {groupDetails[0]?.groupInitiatorName}
                    </span>
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
          )}
        </div>
      </>
    );
  }

  function renderProfileInfo() {
    return (
      <>
        <div>
          {title === "info" && (
            <div className="image overflow-hidden">
              <img
                className="h-64 w-64 p-3 mx-auto"
                src={memberDetail?.image && urlFor(memberDetail?.image).url()}
                alt="member-profile-pic"
              />
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
            <h1 className="font-bold text-xl text-gray-500">
              {memberDetail?.surName} {memberDetail?.otherNames}
            </h1>
          </div>
          <div className="ml-auto mr-auto mb-3">
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <List
                title="Member Code"
                note=""
                content={`${memberDetail?.memberNumber}`}
              />
              <List
                title="Member Phone"
                note=""
                content={`${memberDetail?.mobileNumber}`}
              />
              <List
                title="Member Email"
                note=""
                content={`${memberDetail?.emailAddress}`}
              />
              <List
                title="Member ID"
                note=""
                content={`${memberDetail?.idPass}`}
              />
            </ul>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <List
                title="Member Code"
                note=""
                content={`${memberDetail?.memberNumber}`}
              />
              <List
                title="Member Phone"
                note=""
                content={`${memberDetail?.mobileNumber}`}
              />
              <List
                title="Member Email"
                note=""
                content={`${memberDetail?.emailAddress}`}
              />
              <List
                title="Member ID"
                note=""
                content={`${memberDetail?.idPass}`}
              />
            </ul>
          </div>
        </div>
      </>
    );
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
                    <svg
                      className="h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide text-xl p-2 font-bold">
                    Personal Details
                  </span>
                </div>
                <div className="bg-white p-3 shadow-sm rounded-lg">
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Surname</div>
                        <div className="px-4 py-2">{memberDetail?.surName}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Other Names
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.otherNames}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Date of Birth
                        </div>
                        <div className="px-4 py-2">{memberDetail?.dob}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          ID/Passsport No.
                        </div>
                        <div className="px-4 py-2">{memberDetail?.idPass}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">PIN No.</div>
                        <div className="px-4 py-2">
                          {memberDetail?.pinNumber}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Mobile No.
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.mobileNumber}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">{memberDetail?.gender}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Age</div>
                        <div className="px-4 py-2">{memberDetail?.age}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Religion</div>
                        <div className="px-4 py-2">
                          {memberDetail?.religion}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Marital Status
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.maritalStatus}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Name of Spouse
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.nameSpouse}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Spouse Tel. No.
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.spouseNumber}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Postal Address
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.postalAddress}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Postal Code
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.postalCode}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">City/Town</div>
                        <div className="px-4 py-2">
                          {memberDetail?.cityTown}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Residential Address
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.residentialAddress}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Email Address
                        </div>
                        <div className="px-4 py-2">
                          <a
                            href={`mailto:${memberDetail?.emailAddress}`}
                            className="text-blue-800"
                          >
                            {memberDetail?.emailAddress}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Rented</div>
                        <div className="px-4 py-2">{memberDetail?.rented}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Owned</div>
                        <div className="px-4 py-2">{memberDetail?.owned}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Landlord/Caretaker/Agent Name
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.landCareAgent}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Occupation/Employer
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.occupationEmployer}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Employer Contacts (Tel. No.)
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.employerNumber}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Location of Business
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.businessLocation}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Age of Business
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.businessAge}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Name of Referee
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.refereeName}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Group</div>
                        <div className="px-4 py-2">{memberDetail?.group}</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Position of Leadership in the Community
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.communityPosition}
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Membership Fee M-PESA Transaction No.
                        </div>
                        <div className="px-4 py-2">
                          {memberDetail?.mpesaTransNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4"></div>
                <div className="flex justify-center p-3 items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span className="text-cyan-500">
                    <svg
                      className="h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide text-xl p-2 font-bold">
                    Next of Kin information
                  </span>
                </div>
                <div className="flex flex-wrap justify-center shadow-sm rounded-sm">
                  {/* <div className="w-full md:w-9/12 mx-2 h-64"> */}
                  <div className="bg-white w-full md:w-2/3 mb-8 p-3 rounded-lg">
                    <div>
                      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                          <span>Name</span>
                          <span className="ml-auto">
                            {memberDetail?.nameKin}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Relationship</span>
                          <span className="ml-auto">
                            {memberDetail?.relationship}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Residential Address</span>
                          <span className="ml-auto">
                            {memberDetail?.residentialAddressKin}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Postal Address</span>
                          <span className="ml-auto">
                            {memberDetail?.postalAddressKin}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Postal Code</span>
                          <span className="ml-auto">
                            {memberDetail?.postalCodeKin}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>City/Town</span>
                          <span className="ml-auto">
                            {memberDetail?.cityTownKin}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Mobile/Tel No.</span>
                          <span className="ml-auto">
                            {memberDetail?.mobileNumberKin}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  function renderActions() {
    return (
      <>
        {renderStatusReport()}
        <div className="mb-8" />
        <div className="flex flex-wrap justify-center items-center mr-auto ml-auto mb-4">
          {loanStatus?.length === 0 ? null : (
            <h1 className="font-bold text-xl text-gray-500">Loan Details</h1>
          )}{" "}
        </div>
        {loanStatus?.map((loan) => (
          <div
            key={loan?.loanId}
            className="bg-gray-400 ml-auto mr-auto p-2 mb-7 rounded-lg"
          >
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
                    <span className="ml-auto">
                      {loan?.approved === "true"
                        ? "Approved"
                        : "Pending Approval"}
                    </span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Disbursal Status
                    </span>
                    <span className="ml-auto">
                      {loan?.disbursed === "true"
                        ? "Disbursed"
                        : "Pending Disbursal"}
                    </span>
                  </li>
                  <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                    <span className="tracking-wide text-l text-gray-700 font-bold">
                      Principal
                    </span>
                    <span className="ml-auto">
                      KSHs. {loan?.principalAmount}
                    </span>
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
              {loan?.approve === "true" ? (
                <div className="w-1/2 p-2">
                  <div className="w-full md:w-1/2 mr-auto ml-auto">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(
                          loan?.disburse === "false"
                            ? `/loan/approvals/${loan?.memberId}`
                            : `/loan/disbursements/${loan?.memberId}`
                        );
                      }}
                      className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {loan?.disburse === "false" ? "Approve" : "Disburse"}
                    </button>
                  </div>
                </div>
              ) : null}
              <div className="w-1/2 p-2">
                <div className="w-full md:w-1/2 mr-auto ml-auto">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/loan/preview/${loan?.loanId}`);
                    }}
                    // onMouseEnter={handleProductSave}
                    className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    More Details ...
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  function renderStatusReport() {
    return (
      <>
        <div className=" flex  flex-col  md:flex-row justify-center  flex-wrap gap-3 mt-10  ">
          <div className="">
            <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
              <div className="bg-indigo-500  flex h-20  items-center">
                <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
                  {loanStatus?.length}
                </h1>
                <p className="ml-4 text-white uppercase">Loans</p>
              </div>
              <p className="py-6 px-6 text-lg tracking-wide text-center">
                →{" "}
                {loanStatus?.length === 0
                  ? "No Active Loan."
                  : loanStatus?.length + " active loans."}
              </p>
              {loanStatus?.length === 0 ? (
                <div className="flex justify-center px-5 mb-2 text-sm ">
                  <button
                    onClick={() => {
                      navigate("/loan/create-loan");
                    }}
                    type="button"
                    className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                  >
                    Maintain
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }

  const Nav = ({ nav_page, nav_title, nav_header }) => {
    const isActiveStyle =
      "flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 mb-2 bg-indigo-500 border-b-2 rounded-lg border-indigo-100 sm:px-4 -px-1 dark:border-indigo-100 dark:text-indigo-100 whitespace-nowrap focus:outline-none";
    const isNotActiveStyle =
      "flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400";
    return (
      <button
        onClick={nav_page}
        className={title === nav_title ? isActiveStyle : isNotActiveStyle}
      >
        <span className="mx-1 text-sm font-semibold sm:text-base">
          {" "}
          {nav_header}{" "}
        </span>
      </button>
    );
  };

  function renderNav() {
    return (
      <div className="flex justify-center items-center mt-5 p-5 rounded-lg">
        <Nav
          nav_page={() => {
            setPage(renderProfileInfo());
            setGroupId(memberDetail.group);
            setTitle("info");
          }}
          nav_title="info"
          nav_header="Profile Info"
        />
        <Nav
          nav_page={() => {
            setPage(renderGroupInfo());
            setGroupId(memberDetail.group);
            setTitle("group");
          }}
          nav_title="group"
          nav_header="Group Info"
        />
        <Nav
          nav_page={() => {
            setPage(renderActions());
            setGroupId(memberDetail.group);
            setTitle("action");
          }}
          nav_title="action"
          nav_header="More Actions"
        />
      </div>
    );
  }

  return (
    <>
      {renderNav()}
      {/* {renderProfileInfo()} */}
      {/* {renderMoreInfo()} */}
      {page}
      <pre>{JSON.stringify(memberDetail, undefined, 2)}</pre>
    </>
  );
}
