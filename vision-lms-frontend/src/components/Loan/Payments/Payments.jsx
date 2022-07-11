import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../../client";
import {useGetMpesaQuery} from "../../../services/MpesaApi";
import {fetchApi, baseUrl} from "../../../services/fetchApi";
import { ListLayout, Spinner, Status, TableData } from "../../Components";

export default function Payments() {
  // const {data} = useGetMpesaQuery();
  const [subscription, setSubscription] = useState(true);
  const [paymentsList, setPaymentsList] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // console.log(data)

  async function getStaticProps() {
    const data = await fetchApi(`${baseUrl}`);

    return data;
  }

  console.log(getStaticProps())

  const fetchPayments = async () => {
    const query = '*[_type == "maintenance"] | order(_updatedAt desc)';

      await client.fetch(query).then((data) => {
        setPaymentsList(data);
      });
  };

  useEffect(() => {
    if (subscription) {
    fetchPayments();
    }
    return () => setSubscription(false);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentsList?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let date_today = new Date();
  let date_today_view = Number(
    date_today.getFullYear() +
      (Number(date_today.getMonth()) > 9 ? "" : "0") +
      date_today.getMonth() +
      (Number(date_today.getDate()) > 9 ? "" : "0") +
      date_today.getDate()
  );

  const headers = [
    "Ref. No.",
    "Name",
    "Principal",
    "O/S Balance",
    "Tenure",
    "Status",
  ];

  function renderPaymentsList() {
    return (
      <ListLayout
        title="Loan Payments List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={paymentsList?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems
            ? currentItems?.map((member) =>
                member?.disbursed === "true" ? (
                  <tr
                    onClick={() => {
                      navigate(`/loan/payments/${member._id}`);
                    }}
                    key={member?._id}
                    className={
                      member.outstandingPenalty === "false"
                        ? "hover:bg-green-200 bg-green-50 cursor-pointer transition-all duration-300"
                        : member.outstandingPenalty === "0"
                        ? Number(
                            member.recentPayments[
                              member.recentPayments?.length - 1
                            ]?.faceOutstandingBalance
                          ) +
                            Number(
                              member.recentPayments[
                                member.recentPayments?.length - 1
                              ]?.faceOutstandingArrears
                            ) <=
                          0
                          ? "hover:bg-purple-200 bg-purple-50 cursor-pointer transition-all duration-300"
                          : "hover:bg-blue-200 bg-blue-50 cursor-pointer transition-all duration-300"
                        : "hover:bg-red-200 bg-red-50 cursor-pointer transition-all duration-300"
                    }
                  >
                    <TableData>
                      <div className="ml-0">
                        <div className="text-sm font-semibold text-gray-900">
                          DC-{member?.referenceNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.disbursementDate?.split("-")[0]}
                          {Number(member.disbursementDate?.split("-")[1]) > 9
                            ? "-" +
                              (Number(member.disbursementDate?.split("-")[1]) +
                                1)
                            : "-0" +
                              (Number(member.disbursementDate?.split("-")[1]) +
                                1)}
                          {Number(member.disbursementDate?.split("-")[2]) > 9
                            ? "-" +
                              (Number(member.disbursementDate?.split("-")[2]) +
                                0)
                            : "-0" +
                              (Number(member.disbursementDate?.split("-")[2]) +
                                0)}
                        </div>
                      </div>
                    </TableData>
                    <TableData>
                      <div className="ml-0">
                        <div className="text-sm font-semibold text-gray-900">
                          {member.memberNames}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.memberPhoneNumber}
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
                          {member.outstandingPenalty === "false"
                            ? member?.principalAmount
                            : member?.defaulted === "true" ? 
                            Number(
                                member.recentPayments[
                                  member.recentPayments?.length - 1
                                ]?.faceOutstandingBalance
                              )
                          :
                            Number(
                                member.recentPayments[
                                  member.recentPayments?.length - 1
                                ]?.faceOutstandingArrears
                              )}
                        </div>
                        {Number(member?.outstandingPenalty) > 0 ? (
                          <div className="text-sm text-red-600">
                            {member?.outstandingPenalty === "false"
                              ? null
                              : Number(member?.outstandingPenalty) +
                                " [o/s penalty]"}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            {member?.outstandingPenalty === "false"
                              ? null
                              : Number(member?.outstandingPenalty) +
                                " [o/s penalty]"}
                          </div>
                        )}
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
                      {member.outstandingPenalty === "false" ? (
                        <Status range="700" level="500" colour="green" state="New Loan" />
                      ) : member.outstandingPenalty === "0" ? (
                        Number(
                          member.recentPayments[
                            member.recentPayments?.length - 1
                          ]?.faceOutstandingBalance
                        ) <=
                        0 ? (
                          <Status level="500" colour="purple" range="700" state="Loan Cleared" />
                        ) : (
                          <Status level="500" colour="blue" range="700" state="Loan Active" />
                        )
                      ) :
                        <>
                        {member?.defaulted === "true" ?
                          <Status level="400" colour="gray" range="500" state="Loan Default" />
                        :
                          <Status level="500" colour="red" range="700" state="In Arrears" />
                        }
                        </>
                      }
                    </TableData>
                  </tr>
                ) : null
              )
            : null}
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
      {paymentsList ? (
        renderPaymentsList()
      ) : (
        <Spinner message="Loading Payments List ..." />
      )}
    </div>
  );
}
