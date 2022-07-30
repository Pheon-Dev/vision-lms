import React, { useState, useEffect } from "react";
import { ListLayout, Spinner, Status } from "../Components";
import { client } from "../../client";

const Expenses = () => {
  const [recentExpenditures, setRecentExpenditures] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const fetchExpenditureDetails = () => {
    const query = `*[_type == "expenditures"]`;
    let subscription = true;
    if (subscription) {
      client.fetch(query).then((data) => {
        setRecentExpenditures(data);
      });
    }
    return () => (subscription = false);
  };

  useEffect(() => {
    fetchExpenditureDetails();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recentExpenditures?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const TableData = ({ children }) => (
    <td className="px-6 py-2 whitespace-nowrap">
      <div className="text-sm font-semibold text-gray-900">{children}</div>
    </td>
  );
  function renderExpendituresTable() {
    return (
      <ListLayout
        // title="Recent Expenditures List"
        headers={headers}
        itemsPerPage={itemsPerPage}
        totalItems={recentExpenditures?.length}
        paginate={paginate}
        currentPage={currentPage}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
      >
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.length > 0 && currentItems?.map((expenditure) => (
            <tr
              onClick={() => {
                // navigate("/loan/disbursements");
                console.log(expenditure.expenditureAmount);
              }}
              key={expenditure._id}
              className={
                expenditure.expenditureType === "EXPENDITURE"
                  ? "hover:bg-green-200 -py-2 bg-green-50 cursor-pointer transition-all duration-300"
                  : "hover:bg-blue-200 bg-blue-50 cursor-pointer transition-all duration-300"
              }
            >
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {expenditure.expenditureDate}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {expenditure.expenditureDescription}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  <div className="text-sm text-gray-900">
                    {expenditure.expenditureType}
                  </div>
                </div>
              </TableData>
              <TableData>
                <div className="ml-0">
                  {expenditure.expenditureType === "EXPENDITURE" ? (
                    <div className="text-sm font-semibold text-blue-900">
                      {expenditure.expenditureAmount}
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-green-900">
                      {expenditure.expenditureAmount}
                    </div>
                  )}
                </div>
              </TableData>
            </tr>
          ))}
        </tbody>
      </ListLayout>
    );
  }

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = ["Date", "Description", "Type", "Amount"];

  return (
    <div
    onClick={fetchExpenditureDetails}
    onMouseEnter={fetchExpenditureDetails}
    >
            {renderExpendituresTable()}
    </div>
  );
};

export default Expenses;
