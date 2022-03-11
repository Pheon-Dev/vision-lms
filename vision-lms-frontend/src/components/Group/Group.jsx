import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CreateGroup from './CreateGroup'

import { client } from '../../client';

export default function Group() {
  const { loanId } = useParams();
  const [groupsList, setGroupsList] = useState("");
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    let subscription = true;
    const gquery = '*[_type == "groups"]'

    if (subscription) {

      client.fetch(gquery).then((data) => {
        setGroupsList(data);
      })
    }

    return () => subscription = false;
  }, [])

  return (
    <>
      <div className="ml-auto mr-auto mb-3">
        <div className="flex justify-center items-center px-4 py-4">
          <div className="mt-3">
            <span className="font-bold text-3xl">
              All Groups
            </span>
          </div>
        </div>
        {groupsList && groupsList?.map((group) => (
          <div key={group._createdAt.toString()}>
            <div className="flex justify-center items-center mt-0 px-4 py-4">
              <div className="mt-3">
                <Link to={`/group/groups/${group._id}`}>
                  <span className="font-bold text-gray-500 hover:text-blue-500 text-2xl mr-2">
                    {group.groupName}
                  </span>
                </Link>
              </div>
            </div>
            <ul key={group._id} className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <Link to={`/group/groups/${group._id}`}>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Group Leader
                  </span>
                  <span className="ml-auto">{group.groupLeaderName}</span>
                </li>
              </Link>
              <Link to={`/group/groups/${group._id}`}>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Group Initiator
                  </span>
                  <span className="ml-auto">{group.groupInitiatorName}</span>
                </li>
              </Link>
              <Link to={`/group/groups/${group._id}`}>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span className="tracking-wide text-l text-gray-700 font-bold">
                    Created On
                  </span>
                  <span className="ml-auto">{group.date}</span>
                </li>
              </Link>
            </ul>
            <br />
            <br />
          </div>
        ))}
      </div>
      <br />
      {/* <pre className="font-bold flex justify-center w-full text-xl"> */}
      {/*   {JSON.stringify(groupsList, undefined, 2)} */}
      {/* </pre> */}
    </>
  );
}
