import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { products } from '../utils/data'

import { client, urlFor } from "../client";

export default function MemberTest({ member }) {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id, destination, date } = member;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const deleteMember = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  let alreadySaved = member?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const saveMember = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  console.log(products)
  console.log(member)

  let isPendingStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-orange-800"
  let isCompleteStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
  let isNotPendingStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-purple-800"
  function renderMembers() {
    return (
      <tr
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/member-detail/${_id}`)}
        key={member._id}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 rounded-lg" src={(urlFor(image).width(250).url())} alt="member-profile" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{postedBy?.userName}</div>
              <div className="text-sm text-gray-500">{postedBy?.email}email</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">***{_id.slice(-4)}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{member.product} product</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">

          <span className={(member.state == 'pending' ? isPendingStyle : member.state == 'complete' ? isCompleteStyle : isNotPendingStyle)} >
            {member.state} state
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+254 {member.phone}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </td>
      </tr>
    )
  }

  function renderMemberPin() {
    return (
      <div className="m-2">
        <div
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/member-detail/${_id}`)}
          className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        >
          <img className="rounded-lg w-full " src={(urlFor(image).width(250).url())} alt="user-post" />
          {postHovered && (
            <div
              className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
              style={{ height: '100%' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <a
                    href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                  ><MdDownloadForOffline />
                  </a>
                </div>
                {alreadySaved?.length !== 0 ? (
                  <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                    {member?.save?.length}  Saved
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      saveMember(_id);
                    }}
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  >
                    {member?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                  </button>
                )}
              </div>
              <div className=" flex justify-between items-center gap-2 w-full">
                {destination?.slice(8).length > 0 ? (
                  <a
                    href={destination}
                    target="_blank"
                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                    rel="noreferrer"
                  >
                    {' '}
                    <BsFillArrowUpRightCircleFill />
                    {destination?.slice(8, 17)}...
                  </a>
                ) : undefined}
                {
                  postedBy?._id === user?.googleId && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePin(_id);
                      }}
                      className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                    >
                      <AiTwotoneDelete />
                    </button>
                  )
                }
              </div>
            </div>
          )}
        </div>
        <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={postedBy?.image}
            alt="user-profile"
          />
          <p className="font-semibold capitalize">{postedBy?.userName}</p>
        </Link>
      </div>
    );
  }

  function renderMember() {
    return (
      <div className="flex flex-col">
        <div
          onClick={() => navigate(`/member-detail/${_id}`)}
          className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={postedBy?.image} alt="member-pic" />
                        </div>
                        <div className="ml-4">
                          {/* <div className="text-sm font-medium text-gray-900">name</div> */}
                          <div className="text-sm text-gray-500">{postedBy?.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          {products && (
                            <div className="text-sm font-medium text-gray-900">{products.name}</div>
                          )}
                          <div className="text-sm text-gray-500">Daily</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{postedBy?._id}</div>
                      <div className="text-sm text-gray-500">Department</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0723456789</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      {/* {renderMember()} */}
      {renderMembers()}
      {/* {renderMemberPin()} */}
    </>
  )
}
