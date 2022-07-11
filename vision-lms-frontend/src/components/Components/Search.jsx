import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../client";
import { ListLayout, Spinner, Status, TableData } from "../Components";

export default function Search({ searchTerm }) {
  const [members, setMembers] = useState();
  const [allMembers, setAllMembers] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState();
  const navigate = useNavigate();
  const [currentListPage, setCurrentListPage] = useState(1);
  const [currentMemPage, setCurrentMemPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchPayments = async (searchTerm) => {
    let subscription = true;
    const a_query = `*[_type == "maintenance"] | order(_updatedAt desc)`;
    const m_query = `*[_type == "member"] | order(_updatedAt desc)`;
    const f_query = `*[_type == "payments"] | order(_updatedAt desc)`;

    if (subscription) {
      if (searchTerm !== "") {
        setLoading(true);
        searchTerm = searchTerm.toLowerCase();
        const p_query = `*[_type == "maintenance" && memberNames match '${searchTerm}*' || referenceNumber match '${searchTerm}*' || repaymentCycle match '${searchTerm}*' || memberPhoneNumber match '${searchTerm}*' || productType match '${searchTerm}*' || principalAmount match '${searchTerm}*' || interestAmount match '${searchTerm}*' || memberIdNumber match '${searchTerm}*' || memberEmail match '${searchTerm}*' || loanAccNumber match '${searchTerm}*'] | order(_updatedAt desc)`;
        const m_query = `*[_type == "member" && memberNumber match '${searchTerm}*' || surName match '${searchTerm}*' || otherNames match '${searchTerm}*' || date match '${searchTerm}*' || mobileNumber match '${searchTerm}*' || idPass match '${searchTerm}*'] | order(_updatedAt desc)`;
        await client.fetch(p_query).then((data) => {
          setList(data);
          setCurrentMemPage(1);
          setCurrentListPage(1);
          setLoading(false);
        });
        await client.fetch(m_query).then((data) => {
          setMembers(data);
          setCurrentMemPage(1);
          setCurrentListPage(1);
          setLoading(false);
        });
      } else {
        await client.fetch(f_query).then((data) => {
          setMembers(data);
          setCurrentMemPage(1);
          setCurrentListPage(1);
          setLoading(false);
        });
        await client.fetch(a_query).then((data) => {
          setList(data);
          setCurrentMemPage(1);
          setCurrentListPage(1);
          setLoading(false);
        });
      }
      await client.fetch(m_query).then((data) => {
        setAllMembers(data);
        setCurrentMemPage(1);
        setCurrentListPage(1);
      });
    }

    return () => (subscription = false);
  };

  useEffect(() => {
    fetchPayments(searchTerm);
  }, [searchTerm]);

  const headers = [
    "Reg. No.",
    "Name",
    "Phone",
    "ID No.",
    "Reg. Date",
    "Status",
  ];

  const indexOfLastListItem = currentListPage * itemsPerPage;
  const indexOfLastMemItem = currentMemPage * itemsPerPage;
  const indexOfFirstListItem = indexOfLastListItem - itemsPerPage;
  const indexOfFirstMemItem = indexOfLastMemItem - itemsPerPage;
  const currentListItems = list?.slice(
    indexOfFirstListItem,
    indexOfLastListItem
  );
  const currentMemItems = !searchTerm
    ? allMembers?.slice(indexOfFirstMemItem, indexOfLastMemItem)
    : members?.slice(indexOfFirstMemItem, indexOfLastMemItem);

  // Change page
  const paginateListFront = () => setCurrentListPage(currentListPage + 1);
  const paginateMemFront = () => setCurrentMemPage(currentMemPage + 1);
  const paginateListBack = () => setCurrentListPage(currentListPage - 1);
  const paginateMemBack = () => setCurrentMemPage(currentMemPage - 1);

  const paginateList = (pageNumber) => setCurrentListPage(pageNumber);
  const paginateMem = (pageNumber) => setCurrentMemPage(pageNumber);

  const m_headers = ["Reg. No.", "Name", "Principal", "Product", "Status"];

  function renderLoans() {
    return (
      <div className="m-5">
        <ListLayout
          title={`Search Results For ${searchTerm.toUpperCase()}`}
          headers={m_headers}
          itemsPerPage={itemsPerPage}
          totalItems={list?.length}
          paginate={paginateList}
          currentPage={currentListPage}
          paginateBack={paginateListBack}
          paginateFront={paginateListFront}
        >
          <tbody className="bg-white divide-y divide-gray-200">
            {currentListItems?.length > 0
              ? currentListItems?.map((member) => (
                  <tr
                    onClick={() => {
                      navigate(`/loan/payments/${member._id}`);
                    }}
                    key={member._id}
                    className={
                      member.outstandingPenalty === "false"
                        ? "hover:bg-green-200 bg-green-50 cursor-pointer transition-all duration-300"
                        : member.outstandingPenalty === "0"
                        ? Number(
                            member.recentPayments[
                              member.recentPayments?.length - 1
                            ]?.faceOutstandingBalance
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
                          DC-{member.referenceNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member?.disbursed === "false" ? (
                            member.memberIdNumber
                          ) : (
                            <>
                              {member.disbursementDate?.split("-")[0]}
                              {Number(member.disbursementDate?.split("-")[1]) >
                              9
                                ? "-" +
                                  (Number(
                                    member.disbursementDate?.split("-")[1]
                                  ) +
                                    1)
                                : "-0" +
                                  (Number(
                                    member.disbursementDate?.split("-")[1]
                                  ) +
                                    1)}
                              {Number(member.disbursementDate?.split("-")[2]) >
                              9
                                ? "-" +
                                  (Number(
                                    member.disbursementDate?.split("-")[2]
                                  ) +
                                    0)
                                : "-0" +
                                  (Number(
                                    member.disbursementDate?.split("-")[2]
                                  ) +
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
                    {member?.outstandingPenalty === "false" ? (
                      <TableData>
                        {member?.outstandingPenalty === "false" ? (
                        <Status range="700" level="500" colour="green" state="New Loan" />
                        ) : member?.recentPayments[
                            member?.recentpayment?.length - 1
                          ]?.arrears === "0" ? (
                          Number(
                            member?.recentPayments[
                              member?.recentpayment?.length - 1
                            ]?.faceOutstandingBalance
                          ) ===
                          0 ? (
                          <Status level="500" colour="purple" range="700" state={`${
                                member?.recentPayments[
                                  member?.recentpayment?.length - 1
                                ]?.mpesaReferenceCode
                              }`} />
                          ) : (
                      <Status level="500" colour="blue" range="700" state={`${
                                member?.recentPayments[
                                  member?.recentpayment?.length - 1
                                ]?.mpesaReferenceCode
                              }`} />
                          )
                        ) : (
                        <>
                        {member?.defaulted === "true" ?
                      <Status level="400" range="500" colour="gray" state={`${
                                member?.recentPayments[
                                  member?.recentpayment?.length - 1
                                ]?.mpesaReferenceCode
                              }`} />
                        :
                      <Status level="500" range="700" colour="red" state={`${
                                member?.recentPayments[
                                  member?.recentpayment?.length - 1
                                ]?.mpesaReferenceCode
                              }`} />
                        }
                        </>
                        )}
                      </TableData>
                    ) : (
                      <TableData>
                {member.disbursed === "true" ? (
                  <>
                    {member.outstandingPenalty === "false" ? (
                        <Status range="700" level="500" colour="green" state="New Loan" />
                    ) : member.outstandingPenalty === "0" ? (
                      Number(
                        member.recentPayments[member.recentPayments?.length - 1]
                          ?.faceOutstandingBalance
                      )  <=
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
                    )}
                  </tr>
                ))
              : null}
          </tbody>
        </ListLayout>
      </div>
    );
  }

  function renderFeed(mem) {
    return (
      <div className="m-5">
        <ListLayout
          title="Loan Payments List"
          headers={headers}
          itemsPerPage={itemsPerPage}
          totalItems={mem?.length}
          paginate={paginateMem}
          currentPage={currentMemPage}
          paginateBack={paginateMemBack}
          paginateFront={paginateMemFront}
        >
          <tbody className="bg-white divide-y divide-gray-200">
            {currentMemItems
              ? currentMemItems?.map((member) => (
                  <tr
                    onClick={() => {
                      navigate(`/member/member-detail/${member?._id}`);
                    }}
                    key={member?._id}
                    className={
                      member?.maintained === "false" ?
                         "hover:bg-green-200 bg-green-50 cursor-pointer transition-all duration-300"
                          : "hover:bg-purple-200 bg-purple-50 cursor-pointer transition-all duration-300"
                    }
                  >
                    <TableData>{member?.memberNumber}</TableData>
                    <TableData>
                      {member?.surName + " " + member?.otherNames}
                    </TableData>
                    <TableData>{member?.mobileNumber}</TableData>
                    <TableData>{member?.idPass}</TableData>
                    <TableData>{member?.date}</TableData>
                    <TableData>
                      {member?.maintained === "true" ? (
                    <Status level="500" range="700" colour="indigo" state="Maintained" />
                      ) : (
                    <Status level="500" range="700" colour="green" state="Maintain" />
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
      {loading && <Spinner message="Searching ..." />}
      {searchTerm?.length > 0
        ? list?.length > 0
          ? renderLoans()
          : null
        : null}
      {searchTerm ? renderFeed(members) : renderFeed(allMembers)}
      {members?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No results found!</div>
      )}
      {/* <pre>{JSON.stringify(members, undefined, 2)}</pre> */}
      <pre>{JSON.stringify(list, undefined, 2)}</pre>
    </div>
  );
}
