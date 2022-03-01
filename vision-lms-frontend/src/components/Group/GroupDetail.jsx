import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { client } from "../../client";

export default function GroupDetail() {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  const fetchGroupDetails = () => {
    const query = `*[_type == "groups" && _id == '${groupId}']`;

    client.fetch(query).then((data) => {
      setGroupDetails(data);
    });

    return (() => console.log('unsubscribing'));
  }

  const fetchMembers = () => {
    const mquery = `*[_type == "member" && group == '${groupName}']`;
    // const mquery = `*[_type == "groups"]`;

    client.fetch(mquery).then((data) => {
      setGroupMembers(data);
    });
    return (() => console.log('unsubscribing'));
  }

  useEffect(() => {
    fetchMembers();
    // }, []);
    // useEffect(() => {
    //   fetchMembers();
  }, [groupName]);

  let isPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
  let isNotPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-800"

  useEffect(() => {
    fetchGroupDetails();
  }, [groupId]);

  function renderGroupMembers() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          Group Members
        </div>
        <br />
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8">
            <div className="shadow overflow-hidden mr-3 ml-3 border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 border-b-2 border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {groupMembers?.map((member) => (
                    <tr
                      onClick={() => navigate(`/member/member-detail/${member._id}`)}
                      key={member._id}
                      className="hover:bg-gray-300 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{member.personalDetails?.surName} {member.personalDetails?.otherNames}</div>
                            <div className="text-sm text-gray-500">{member.personalDetails?.emailAddress}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">DC-{member.memberNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">

                        <span className={(member?.maintained === 'true' ? isPaidStyle : isNotPaidStyle)} >
                          {member?.maintained === 'true' ? 'Maintained' : 'Not Maintained'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.personalDetails?.mobileNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <br />
      <div className="font-bold mt-5 flex justify-center w-full text-3xl">
        <span className="text-gray-700 mr-2">{groupDetails[0]?.groupName}</span>
        <span className="text-gray-500">Group Details</span>
      </div>
      <br />
      <div className="ml-auto mr-auto mb-3">
        <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
          <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
            <span>
              Group Leader
            </span>
            <span className="ml-auto">{groupDetails[0]?.groupLeaderName}</span>
          </li>
          <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
            <span>
              Group Initiator
            </span>
            <span className="ml-auto">{groupDetails[0]?.groupInitiatorName}</span>
          </li>
          <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
            <span>
              Date Registered
            </span>
            <span className="ml-auto">{groupDetails[0]?.date}</span>
          </li>
        </ul>
      </div>
      <br />
      {
        groupMembers.length !== 0 ?
          renderGroupMembers()
          :
          <div className="flex justify-center ml-auto mr-auto w-full mt-9">
            <button
              onClick={() => setGroupName(groupDetails[0]?.groupName)}
              type="button"
              className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Load Members
              {/* » Add Members ↓ */}
            </button>
          </div>
      }
    </div>
  )
}
