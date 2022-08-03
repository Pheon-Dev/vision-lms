import React, { useState, useEffect } from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { ListLayout, Spinner, Status } from "../Components";
import { client } from "../../client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Expenses = () => {
  const [recentExpenditures, setRecentExpenditures] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  let [count, setCount] = useState(1000);
  let [period, setPeriod] = useState("year");

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

  const data = [];

  recentExpenditures.length > 0 &&
    recentExpenditures?.map((e) => {
      const date = new Date(recentExpenditures[0]?.expenditureDate);
      let month = date.getMonth()
      let week = date.getDay()
      let year = date.getFullYear()
      console.log(month, week, year)

      let duration = period === "week" ? "06" : period === "month" ? "07" : "08"

      e.expenditureDate.split("-")[1] === duration
        ? null
        : data.push({
            amount: e.expenditureAmount,
            date: e.expenditureDate,
          });
    });

  const renderBarChart = (
    <div>
      <div className="flex justify-end p-2 gap-3">
        <FiPlusSquare
          className="cursor-pointer"
          size={32}
          color="black"
          onClick={() => setCount((count += 1000))}
        />
        <FiMinusSquare
          className="cursor-pointer"
          size={32}
          color="black"
          onClick={() =>
            count < 1000 ? setCount((count -= 100)) : setCount((count -= 1000))
          }
        />
        <div
          className="border-black p-1 border font-bold cursor-pointer"
          onClick={() => {
            setPeriod("week");
          }}
        >
          W
        </div>
        <div
          className="border-black p-1 border font-bold cursor-pointer"
          onClick={() => {
            setPeriod("month");
          }}
        >
          M
        </div>
        <div
          className="border-black p-1 border font-bold cursor-pointer"
          onClick={() => {
            setPeriod("year");
          }}
        >
          Y
        </div>
      </div>
      <BarChart width={1000} height={500} data={data}>
        <XAxis dataKey="date" stroke="#8884d8" />
        <YAxis
          // dataKey="expenditureAmount"
          // stroke="gray"
          // type="number"
          domain={[0, count < 0 ? 100 : count]}
        />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="amount" fill="#8884d8" barSize={60} />
      </BarChart>
    </div>
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
          {currentItems.length > 0 &&
            currentItems?.map((expenditure) => (
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
      <div className="mb-5">{renderExpendituresTable()}</div>
      <div className="mt-5">{renderBarChart}</div>
    </div>
  );
};

export default Expenses;
