import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { feedQuery } from '../../utils/data'

import { client, urlFor } from "../../client";

export default function MemberTest({ member }) {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id, personalDetails } = member;

  // const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deleteMember = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  // let alreadySaved = member?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  // alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  // console.log(personalDetails)

  // const saveMember = (id) => {
  //   if (alreadySaved?.length === 0) {
  //     setSavingPost(true);

  //     client
  //       .patch(id)
  //       .setIfMissing({ save: [] })
  //       .insert('after', 'save[-1]', [{
  //         _key: uuidv4(),
  //         userId: user?.googleId,
  //         postedBy: {
  //           _type: 'postedBy',
  //           _ref: user?.googleId,
  //         },
  //       }])
  //       .commit()
  //       .then(() => {
  //         window.location.reload();
  //         setSavingPost(false);
  //       });
  //   }
  // };

  let isPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
  let isNotPaidStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-red-800"

  function renderMembers() {
    return (
      <tr
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/member/member-detail/${_id}`)}
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
          <div className="text-sm text-gray-900">DC-{member.memberNumber}</div>
        </td>
        {/* <td className="px-6 py-4 whitespace-nowrap"> */}
        {/*   <div className="text-sm text-gray-900">{member.product}</div> */}
        {/* </td> */}
        <td className="px-6 py-4 whitespace-nowrap">

          <span className={(member?.maintained === 'true' ? isPaidStyle : isNotPaidStyle)} >
            {member?.maintained === 'true' ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.personalDetails?.mobileNumber}</td>
        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> */}
        {/*   <a href="#" className="text-indigo-600 hover:text-indigo-900"> */}
        {/*     Edit */}
        {/*   </a> */}
        {/* </td> */}
      </tr>
    )
  }

  return (
    <>
      {renderMembers()}
    </>
  )
}
