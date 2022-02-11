import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { products } from '../utils/data'

import { client, urlFor } from "../client";

export default function Member({ members }) {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();

  // const { postedBy, image, _id, destination } = members;

  // const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  // const deleteMember = (id) => {
  //   client.delete(id).then(() => {
  //     window.location.reload();
  //   });
  // };

  // let alreadySaved = members?.save?.filter((item) => item?.postedBy?._id === user?.googleId);

  // alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  // const saveMember = (id) => {
  //   if (alreadySaved?.length === 0) {
  //     setSavingPost(true);

  //     client
  //       .patch(id)
  //       .setIfMissing({ save: [] })
  //       .insert('after', 'save[-1]', [{
  //         _key: uuidv5(),
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

  const people = [
  {
    name: 'Diane Cooper',
    id: '5363',
    state: 'complete',
    product: 'Daily',
    phone: '0712 345 678',
    email: 'diane.cooper@example.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Doe',
    id: '3362',
    state: 'pending',
    product: 'Monthly',
    phone: '0712 345 678',
    email: 'jane.doe@example.com',
    image:
      'https://i.pinimg.com/236x/6c/3c/52/6c3c529e8dadc7cffc4fddedd4caabe1.jpg',
  },
  {
    name: 'John Smith',
    id: '4373',
    state: 'submitted',
    product: 'weekly',
    phone: '0712 345 678',
    email: 'sjohn@example.com',
    image:
      'https://i.pinimg.com/236x/1b/c8/30/1bc83077e363db1a394bf6a64b071e9f.jpg',
  },
  // More people...
]

let isPendingStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-orange-800"
let isCompleteStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
let isNotPendingStyle = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-purple-800"

  function renderMember() {
return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    ID
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
                {people.map((person) => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{person.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
               
                      <span className={( person.state == 'pending' ? isPendingStyle : person.state == 'complete' ? isCompleteStyle : isNotPendingStyle)} >
                        {person.state}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
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
    <>
      {renderMember()}
    </>
  )
}
