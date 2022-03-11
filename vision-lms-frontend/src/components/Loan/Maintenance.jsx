import React, { useEffect, useState } from "react";

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { loanDetailsQuery, memberDetailMoreMemberQuery, memberDetailQuery, feedQuery, searchQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components';

export default function Maintenance() {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(false);
  const [maintenanceId, setMaintenanceId] = useState();
  const [mainId, setMainId] = useState();
  const { productId } = useParams();

  const [maintainedList, setMaintainedList] = useState();

  useEffect(() => {
    let subscription = true;
    const query = '*[_type == "preview"]';

    if (subscription) {
      client.fetch(query).then((data) => {
        setMaintainedList(data);
      });
    }

    return () => subscription = false;

  }, [mainId]);

  useEffect(() => {
    let subscription = true;

    if (subscription) {
      if (productId) {
        setLoading(true);
        const query = searchQuery(productId);
        client.fetch(query).then((data) => {
          setMembers(data);
          setLoading(false);
        });
      } else {
        setLoading(true);

        client.fetch(feedQuery).then((data) => {
          setMembers(data);
          setLoading(false);
        });
      }
    }

    return () => subscription = false;
  }, [productId]);

  const ideaName = productId || 'all';
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


  return (
    <div className="flex flex-col mt-5">
      <div className="font-bold flex justify-center w-full text-xl">
        Select one
        {maintainedList &&
          maintainedList.map((maintained) => (
            <>
              {maintained.memberIdentity === maintenanceId ?
                <span key={maintained._id} className="text-green-500 ml-2">
                  to Preview
                </span>
                :
                null
              }
            </>
          ))
        }
      </div>
      <br />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members?.map((member) => (
                  <tr
                    // onMouseEnter={() => setPostHovered(true)}
                    onMouseEnter={() => { setMaintenanceId(member._id); setMainId(member._id); }} // == maintainedList.memberIdentity
                    onMouseLeave={() => setPostHovered(false)}
                    onClick={() =>
                      //{
                      maintainedList &&
                      maintainedList.map((maintained) => (
                        //   maintainedList[0]?.maintained === 'true' ?
                        maintained.memberIdentity === maintenanceId ?
                          navigate("/loan/pending")
                          // navigate(`/loan/preview/${maintained._id}`)
                          :
                          navigate(`/loan/maintenance/${member._id}`)
                        // }
                      ))
                    }
                    className=
                    {maintainedList &&
                      maintainedList.map((maintained) => (
                        maintained.memberIdentity === maintenanceId ?
                          "hover:bg-gray-300 cursor-pointer transition duration-500 hover:p-3 rounded-lg py-3"
                          :
                          "hover:bg-gray-300 cursor-pointer transition duration-500 hover:p-3 rounded-lg py-3"

                      ))
                    }
                    //       className={
                    //         maintainedList &&
                    //           maintainedList[0]?.maintained === 'true' ?
                    //           "hover:bg-green-200 cursor-pointer transition duration-500 hover:p-3 rounded-lg py-3"
                    //           :
                    //           "hover:bg-blue-200 cursor-pointer transition duration-500 hover:p-3 rounded-lg py-3"
                    //       }
                    key={member._id}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.personalDetails?.mobileNumber}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> */}
                    {/*   { */}
                    {/*     maintainedList && */}
                    {/*       maintainedList[0]?.maintained === 'true' ? */}
                    {/*       maintenanceId === member?._id ? */}
                    {/*         'preview' */}
                    {/*         : */}
                    {/*         '...' */}
                    {/*       : */}
                    {/*       maintainedList[0]?.maintained === 'true' ? */}
                    {/*         'maintain' */}
                    {/*         : '...' */}
                    {/*   } */}
                    {/* </td> */}
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

