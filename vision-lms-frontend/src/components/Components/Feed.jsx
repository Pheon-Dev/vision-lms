import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ListLayout, Spinner } from "../Components";

import { client } from "../../client";

export default function Feed() {
  const [members, setMembers] = useState();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    let subscription = true;
    const query = '*[_type == "member"] | order(_updatedAt desc)';

    if (subscription) {
      client.fetch(query).then((data) => {
        setMembers(data);
      });
    }

    return () => (subscription = false);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    "Reg. No.",
    "Name",
    "Phone No.",
    "ID No.",
    "Reg. Date",
    "Status",
  ];

  const TableData = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-semibold text-gray-900">{children}</div>
    </td>
  );

  const Status = ({ colour, state }) => (
    <>
      <span className={`bg-${colour}-500 text-white px-2 rounded-lg`} />
      <span className={`text-${colour}-700 pl-2`}>{state}</span>
    </>
  );

  function renderFeed() {
    return (
      <div className="m-5">
      <ListLayout
        title="All Members List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={members?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems
              ? currentItems?.map((member) => (
                  <tr
                    onClick={() => {
                      navigate(`/member/member-detail/${member._id}`);
                    }}
                    key={member?._id}
                className={
                  member.maintained === "true"
                    ? "hover:bg-indigo-300 bg-indigo-100 cursor-pointer transition-all duration-500"
                    : "hover:bg-green-300 bg-green-100 cursor-pointer transition-all duration-500"
                }
                  >
                    <TableData>{member.memberNumber}</TableData>
                    <TableData>{member.surName + " " + member.otherNames}</TableData>
                    <TableData>{member.mobileNumber}</TableData>
                    <TableData>{member?.idPass}</TableData>
                    <TableData>{member?.date}</TableData>
                    <TableData>
                      {member?.maintained === "true" ? (
                    <Status colour="indigo" state="Maintained" />
                      ) : (
                    <Status colour="green" state="Maintain" />
                      )}
                    </TableData>
                  </tr>
                ))
              : null}
          </tbody>
        </ListLayout>
      </div>
    );
  }


  return (
    <div>
      {members ? renderFeed() : <Spinner message="Laoding All Members" /> }
    </div>
  )
}
