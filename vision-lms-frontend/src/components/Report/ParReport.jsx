import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../../client";
import { ListLayout, Spinner, Status, TableData } from "../Components";

export default function ParReport() {
  const navigate = useNavigate();
  const [members, setMembers] = useState("");
  const [list, setList] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortItem, setSortItem] = useState("_updatedAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const fetchLoanDetails = () => {
    const query = `*[_type == "maintenance"] | order(${sortItem} ${sortOrder})`;
    // const m_query = `*[_type == "maintenance" && ${item} match '${searchTerm}*' ]`;
    const m_query = `*[_type == "maintenance" && ${sortItem} match '${searchTerm}*' || recentPayments->${sortItem} match '${searchTerm}*'] | order(${sortItem} ${sortOrder})`;
    let subscription = true;

    if (subscription) {
      client.fetch(query).then((data) => {
        setMembers(data);
      });
      client.fetch(m_query).then((data) => {
        setList(data);
      });
    }

    return () => (subscription = false);
  };

  useEffect(() => {
    fetchLoanDetails();
  }, [sortItem, sortOrder, searchTerm]);

  let selection = searchTerm.length > 0 ? list : members;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selection?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    "Loan ID",
    "Customer Name",
    "Group Name",
    "Officer Name",
    "Loan Tenure",
    "Installment Amount",
    "Product",
    "Disbursed Amount",
    "Disbursement Date",
    "Outstanding Amount",
    "Arrears",
    "Days in Arrears",
    "Status",
  ];

  function renderDaysInArrears(d_two, d_one) {
    if (!d_one && !d_two) return 1;

    d_one = d_one.split('-')[2] + '-' + d_one.split('-')[1] + '-' + d_one.split('-')[0]
    let date_one = new Date(`${d_one}`);
    let date_two = new Date(`${d_two}`);

    let diff = date_two.getTime() - date_one.getTime();
    let days = Math.ceil(diff / (1000 * 3600 * 24));

    return days;
  }

  let date = new Date();
  let date_today =
    date.getFullYear() +
    (Number(date.getMonth()) + 1 > 9 ? "-" : "-0") +
    (Number(date.getMonth()) + 1) +
    (Number(date.getDate()) > 9 ? "-" : "-0") +
    date.getDate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toUpperCase());
  };

  let classInput =
    "appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  let classInputActive =
    "appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  function renderSortRow() {
    return (
      <tr>
        <TableData>
          <input
            type="text"
            placeholder="ID ..."
            value={sortItem === "referenceNumber" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("referenceNumber");
              setSearchTerm("");
            }}
            className={
              sortItem === "referenceNumber" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Names ..."
            value={sortItem === "memberNames" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("memberNames");
              setSearchTerm("");
            }}
            className={
              sortItem === "memberNames" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Group ..."
            value={sortItem === "group" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("group");
              setSearchTerm("");
            }}
            className={sortItem === "group" ? classInputActive : classInput}
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Officer ..."
            value={sortItem === "loanOfficerName" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("loanOfficerName");
              setSearchTerm("");
            }}
            className={
              sortItem === "loanOfficerName" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <>
            <input
              type="text"
              placeholder="Tenure ..."
              value={
                sortItem === "loanTenure"
                  ? searchTerm
                  : sortItem === "repaymentCycle"
                  ? searchTerm
                  : ""
              }
              onChange={(e) => {
                setSearchTerm(e.target.value.toUpperCase());
                {
                  searchTerm[0] === "D" ||
                  searchTerm[0] === "W" ||
                  searchTerm[0] === "M"
                    ? setSortItem("repaymentCycle")
                    : setSortItem("loanTenure");
                }
              }}
              onClick={() => {
                setSearchTerm("");
              }}
              className={
                sortItem === "repaymentCycle"
                  ? classInputActive
                  : sortItem === "loanTenure"
                  ? classInputActive
                  : classInput
              }
            />
          </>
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Installment ..."
            value={sortItem === "installmentAmount" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("installmentAmount");
              setSearchTerm("");
            }}
            className={
              sortItem === "installmentAmount" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Product ..."
            value={sortItem === "productType" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("productType");
              setSearchTerm("");
            }}
            className={
              sortItem === "productType" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Disb. Amnt ..."
            value={sortItem === "principalAmount" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("principalAmount");
              setSearchTerm("");
            }}
            className={
              sortItem === "principalAmount" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Disb. Date ..."
            value={sortItem === "disbursementDate" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("disbursementDate");
              setSearchTerm("");
            }}
            className={
              sortItem === "disbursementDate" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="OS Amount ..."
            value={sortItem === "faceOutstandingBalance" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("faceOutstandingBalance");
              setSearchTerm("");
            }}
            className={
              sortItem === "faceOutstandingBalance"
                ? classInputActive
                : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Arrears ..."
            value={sortItem === "outstandingPenalty" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("outstandingPenalty");
              setSearchTerm("");
            }}
            className={
              sortItem === "outstandingPenalty" ? classInputActive : classInput
            }
          />
        </TableData>
        <TableData>
          <input
            type="text"
            placeholder="Days In Arrears ..."
            value={sortItem === "arrears" ? searchTerm : ""}
            onChange={handleChange}
            onClick={() => {
              setSortItem("arrears");
              setSearchTerm("");
            }}
            className={sortItem === "arrears" ? classInputActive : classInput}
          />
        </TableData>
      <TableData>
        <span className={classInput}>
      {date_today}
      </span>
        </TableData>
      </tr>
    );
  }

  const items = [
    {
      id: 0,
      value: "Ascending",
    },
    {
      id: 1,
      value: "Descending",
    },
  ];

  console.log(currentItems)
  function renderPARTable() {
    return (
      <>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p
              tabIndex="0"
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              PAR Report
            </p>
            <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-300 hover:bg-gray-300 cursor-pointer rounded">
              <p>Sort in:</p>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value === "Ascending" ? "asc" : "desc")
                }
                aria-label="select"
                className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
              >
                <option className="text-gray-500">Select Order ...</option>
                {items
                  ? items?.map((item) => (
                      <option key={item.id}>{item.value}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
        </div>
        <ListLayout
          headers={headers}
          itemsPerPage={itemsPerPage}
          totalItems={members?.length}
          paginate={paginate}
          currentPage={currentPage}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
        >
          <tbody className="bg-white divide-y divide-gray-200">
            {renderSortRow()}
            {currentItems
              ? currentItems?.map((member) => (
                  <tr
                    key={member?._id}
                    onClick={() =>
                      navigate(`/report/par-report/${member?._id}`)
                    }
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
                {member?.disbursed === 'false' ?
                    <TableData>DC-{member?.loanAccNumber}</TableData>
                  :
                    <TableData>DC-{member?.referenceNumber}</TableData>
                }
                    <TableData>{member?.memberNames}</TableData>
                    <TableData>no group</TableData>
                    <TableData>{member?.loanOfficerName}</TableData>
                    <TableData>
                      {member?.loanTenure} {member?.repaymentCycle}
                    </TableData>
                    <TableData>{member?.installmentAmount}</TableData>
                    <TableData>{member?.productType}</TableData>
                    <TableData>{member?.principalAmount}</TableData>
                {member?.disbursed === 'false' ?
                  <>
                    <TableData>...</TableData>
                    <TableData>0</TableData>
                    <TableData>0</TableData>
                    <TableData>...</TableData>
                  </>
                :
                  <>
                    <TableData>
                      {member?.disbursementDate.split("-")[0] +
                        "-" +
                        (
                          Number(member?.disbursementDate.split("-")[1]) + 1
                        ).toString() +
                        "-" +
                        member?.disbursementDate.split("-")[2]}
                    </TableData>
                    <TableData>
                      {member?.arrears === "true"
                        ? (
                            Number(member?.principalAmount) +
                            Number(member?.interestAmount)
                          ).toString()
                        : member?.recentPayments[
                            member?.recentPayments?.length - 1
                          ]?.faceOutstandingBalance}
                    </TableData>
                    <TableData>
                      {member?.arrears === "true"
                        ? '0'
                        : member?.recentPayments[
                            member?.recentPayments?.length - 1
                          ]?.faceOutstandingArrears}
                    </TableData>
                    <TableData>
                      {member?.arrears === "false"
                        ? "0"
                        : member?.arrears === "true" ? '···' : renderDaysInArrears(date_today, member?.recentPayments[member?.recentPayments?.length - 1]?.faceInstallmentDate)}
                    </TableData>
                  </>
                }
                    <TableData>
                      {member.outstandingPenalty === "false" ? (
                        <Status
                          range="700"
                          level="500"
                          colour="green"
                          state="New Loan"
                        />
                      ) : member.outstandingPenalty === "0" ? (
                        Number(
                          member.recentPayments[
                            member.recentPayments?.length - 1
                          ]?.faceOutstandingBalance
                        ) <= 0 ? (
                          <Status
                            level="500"
                            colour="purple"
                            range="700"
                            state="Loan Cleared"
                          />
                        ) : (
                          <Status
                            level="500"
                            colour="blue"
                            range="700"
                            state="Loan Active"
                          />
                        )
                      ) : (
                        <>
                          {member?.defaulted === "true" ? (
                            <Status
                              level="400"
                              colour="gray"
                              range="500"
                              state="Loan Default"
                            />
                          ) : member?.disbursed === 'false' ?
                            <Status
                              level="500"
                              colour="cyan"
                              range="300"
                              state="Disburse"
                            />
                            :
                            (
                            <Status
                              level="500"
                              colour="red"
                              range="700"
                              state="In Arrears"
                            />
                          )}
                        </>
                      )}
                    </TableData>
                  </tr>
                ))
              : null}
          </tbody>
        </ListLayout>
      </>
    );
  }

  // console.log(members?.recentPayments[0]?.faceOutstandingBalance)
  return (
    <>
      <br />
      {renderPARTable()}
      <pre>{JSON.stringify(members, undefined, 2)}</pre>
    </>
  );
}
