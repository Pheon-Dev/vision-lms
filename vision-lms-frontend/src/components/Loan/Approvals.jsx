import React, { useEffect, useState } from "react";
import { ListLayout, Spinner, Status, TableData } from "../Components";

import { useNavigate } from "react-router-dom";

import { client } from "../../client";

export default function Approvals() {
  const [list, setList] = useState();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const fetchPayments = async () => {
    let subscription = true;
    const query = '*[_type == "maintenance"] | order(_createdAt desc)';

    if (subscription) {
      await client.fetch(query).then((data) => {
        setList(data);
      });
    }

    return () => (subscription = false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = ["Reg. No.", "Name", "Principal", "Product", "Status"];

  function renderLoans() {
    return (
      <ListLayout
        title="Approvals List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={list?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((member) =>
            member?.maintained === "true" ? (
              <tr
                onClick={() => {
                  member?.approved === "false"
                    ? navigate(`/loan/approvals/${member._id}`)
                    : navigate("/loan/disbursements");
                }}
                key={member._id}
                    className={
                      member.approved === "true"
                        ? "hover:bg-indigo-200 bg-indigo-50 cursor-pointer transition-all duration-300"
                        : "hover:bg-green-200 bg-green-50 cursor-pointer transition-all duration-300"
                    }
              >
                <TableData>
                  <div className="ml-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {member.loanAccNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.memberIdNumber} [ID]
                    </div>
                  </div>
                </TableData>
                <TableData>
                  <div className="flex items-center">
                    <div className="ml-0">
                      <div className="text-sm font-semibold text-gray-900">
                        {member.memberNames}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.memberPhoneNumber}
                      </div>
                    </div>
                  </div>
                </TableData>
                <TableData>
                  <div className="ml-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {member.principalAmount}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.installmentAmount} [installment]
                    </div>
                  </div>
                </TableData>
                <TableData>
                  <div className="ml-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {member.productType}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member?.repaymentCycle === "days"
                        ? Number(member?.loanTenure) -
                          Number(member?.sundays) +
                          " "
                        : member?.loanTenure + " "}{" "}
                      {member?.repaymentCycle === "months"
                        ? member?.loanTenure === "1"
                          ? "month"
                          : member?.repaymentCycle
                        : member?.repaymentCycle === "weeks"
                        ? member?.loanTenure === "1"
                          ? "week"
                          : member?.repaymentCycle
                        : member?.repaymentCycle}
                      <span className="text-sm">
                        {member.repaymentCycle === "days"
                          ? " [daily]"
                          : member?.repaymentCycle === "weeks"
                          ? " [weekly]"
                          : " [monthly]"}
                      </span>
                    </div>
                  </div>
                </TableData>
                <TableData>
                  {member.approved === "true" ? (
                          <Status range="700" level="500" colour="indigo" state="Approved" />
                  ) : (
                          <Status range="700" level="500" colour="green" state="Approve" />
                  )}
                </TableData>
              </tr>
            ) : null
          )}
        </tbody>
      </ListLayout>
    );
  }

  return (
    <div
      onClick={() => {
        fetchPayments();
      }}
      onMouseEnter={() => {
        fetchPayments();
      }}
    >
      {list ? renderLoans() : <Spinner message="Loading Approvals List" />}
      {/* <pre>{JSON.stringify(list, undefined, 2)}</pre> */}
    </div>
  );
}
