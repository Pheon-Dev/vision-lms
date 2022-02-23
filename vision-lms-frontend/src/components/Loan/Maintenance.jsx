import React, { useEffect, useState } from "react";

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { products, memberDetailMoreMemberQuery, memberDetailQuery, feedQuery, searchQuery } from '../../utils/data';
import { Spinner, Layout } from '../Components';

export default function Maintenance() {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
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
            {/* <div className="flex-shrink-0 h-10 w-10"> */}
            {/*   <img className="h-10 w-10 rounded-full" src={(urlFor(image).width(250).url())} alt="member-profile" /> */}
            {/* </div> */}
            <div className="ml-0">
              <div className="text-sm font-medium text-gray-900">{personalDetails?.surName} {personalDetails?.otherNames}</div>
              <div className="text-sm text-gray-500">{personalDetails?.emailAddress}</div>
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
    <div className="flex flex-col mt-5">
      <div className="font-bold flex justify-center w-full text-xl">
        Select one for maintenance
      </div>
      <br />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th> */}
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  {/* <th scope="col" className="relative px-6 py-3"> */}
                  {/*   <span className="sr-only">Edit</span> */}
                  {/* </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members?.map((member) => (
                  <tr
                    onMouseEnter={() => setPostHovered(true)}
                    onMouseLeave={() => setPostHovered(false)}
                    onClick={() => navigate(`/loan/maintenance/${member._id}`)}
                    key={member._id}
                    className="hover:bg-gray-300 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0 h-10 w-10"> */}
                        {/*   <img className="h-10 w-10 rounded-full" src={(urlFor(image).width(250).url())} alt="member-profile" /> */}
                        {/* </div> */}
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">{member.personalDetails?.surName} {member.personalDetails?.otherNames}</div>
                          <div className="text-sm text-gray-500">{member.personalDetails?.emailAddress}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.memberNumber}</div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                    {/*   <div className="text-sm text-gray-900">{member.product}</div> */}
                    {/* </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap"> */}

                    {/*   <span className={(member.personalDetails?.mpesaTransNumber ? isPaidStyle : isNotPaidStyle)} > */}
                    {/*     {member.personalDetails?.mpesaTransNumber} */}
                    {/*   </span> */}
                    {/* </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.personalDetails?.mobileNumber}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> */}
                    {/*   <a href="#" className="text-indigo-600 hover:text-indigo-900"> */}
                    {/*     Edit */}
                    {/*   </a> */}
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

