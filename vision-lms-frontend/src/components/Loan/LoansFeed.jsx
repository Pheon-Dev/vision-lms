import React, { useEffect, useState } from "react";
import { ListLayout, Spinner, Status, TableData } from "../Components";

import { useNavigate } from "react-router-dom";

import { client } from "../../client";

export default function LoansFeed() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(true);
  const [members, setMembers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchPayments = async () => {
    const query = '*[_type == "maintenance"] | order(_updatedAt desc)';

    if (subscription) {
      await client.fetch(query).then((data) => {
        setMembers(data);
      });
    }
  };

  useEffect(() => {
    fetchPayments();
    return () => setSubscription(false);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = ["Reg. No.", "Name", "Principal", "Product", "Status"];

  function renderLoans() {
    return (
      <ListLayout
        title="All Loans List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={members?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((member) => (
            <tr
              onClick={() => {
                member?.disbursed === "true"
                  ? navigate(`/loan/payments/${member._id}`)
                  : member?.approved === "true"
                  ? navigate(`/loan/disbursements`)
                  : member?.maintained === "true"
                  ? navigate(`/loan/approvals/${member._id}`)
                  : navigate(`/loan/disbursements/${member._id}`);
              }}
              key={member._id}
              className={
                member.outstandingPenalty === "false"
                  ? "hover:bg-green-200 bg-green-50 cursor-pointer transition-all duration-300"
                  : member.outstandingPenalty === "0"
                  ? Number(
                      member.recentPayments[member.recentPayments?.length - 1]
                        ?.faceOutstandingBalance
                    ) <=
                    0
                    ? "hover:bg-purple-200 bg-purple-50 cursor-pointer transition-all duration-300"
                    : "hover:bg-blue-200 bg-blue-50 cursor-pointer transition-all duration-300"
                  : member?.disbursed === 'false' 
                  ? "hover:bg-cyan-200 bg-cyan-50 cursor-pointer transition-all duration-300"
                : "hover:bg-red-200 bg-red-50 cursor-pointer transition-all duration-300"
              }
            >
              <TableData>
                <div className="ml-0">
                  <div className="text-sm font-semibold text-gray-900">
                    {member.loanAccNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    {member?.disbursed === "false" ? (
                      member.memberIdNumber
                    ) : (
                      <>
                        {member.disbursementDate?.split("-")[0]}
                        {Number(member.disbursementDate?.split("-")[1]) > 9
                          ? "-" +
                            (Number(member.disbursementDate?.split("-")[1]) + 1)
                          : "-0" +
                            (Number(member.disbursementDate?.split("-")[1]) +
                              1)}
                        {Number(member.disbursementDate?.split("-")[2]) > 9
                          ? "-" +
                            (Number(member.disbursementDate?.split("-")[2]) + 0)
                          : "-0" +
                            (Number(member.disbursementDate?.split("-")[2]) +
                              0)}
                      </>
                    )}
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
                {member.disbursed === "true" ? (
                  <>
                    {member.outstandingPenalty === "false" ? (
                        <Status range="700" level="500" colour="green" state="New Loan" />
                    ) : member.outstandingPenalty === "0" ? (
                      Number(
                        member.recentPayments[member.recentPayments?.length - 1]
                          ?.faceOutstandingBalance
                      ) <=
                      0 ? (
                          <Status level="500" colour="purple" range="700" state="Loan Cleared" />
                      ) : (
                          <Status level="500" colour="blue" range="700" state="Loan Active" />
                      )
                    ) : (
                        <>
                        {member?.defaulted === "true" ?
                          <Status level="400" colour="gray" range="500" state="Loan Default" />
                        :
                          <Status level="500" colour="red" range="700" state="In Arrears" />
                        }
                        </>
                    )}
                  </>
                ) : member.approved === "true" ? (
                  <Status level="500" range="700" colour="cyan" state="Approved" />
                ) : (
                  <Status level="500" range="700" colour="lime" state="Maintained" />
                )}
              </TableData>
            </tr>
          ))}
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
      {members ? renderLoans() : <Spinner message="Loading Loans List" />}
      {/* <pre>{JSON.stringify(members, undefined, 2)}</pre> */}
    </div>
  );
}
