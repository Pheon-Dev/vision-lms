import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { BiGroup, BiReceipt } from "react-icons/bi";
import { GrAppsRounded } from "react-icons/gr";
import { RiPriceTag3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { client } from "../../../client";
import { LoansFeed } from "../../Loan";
import { List } from "../../Components";

import "./statuscard.css";
import "../../Loan/Payments/chart.scss";
import {
  AreaChart,
  LineChart,
  Line,
  Legend,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import * as XLSX from "xlsx";

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const navigate = useNavigate();
  const [members, setMembers] = useState();
  const [products, setProducts] = useState();
  const [active, setActive] = useState();
  const [groups, setGroups] = useState();

  useEffect(() => {
    let subscription = true;
    if (subscription) {
      const mquery = `*[_type == "member"]`;
      const aquery = `*[_type == "maintenance"] | order(disbursementDate asc)`;
      const pquery = `*[_type == "newProduct"]`;
      const gquery = `*[_type == "groups"]`;
      client.fetch(mquery).then((data) => {
        setMembers(data);
      });
      client.fetch(pquery).then((data) => {
        setProducts(data);
      });
      client.fetch(aquery).then((data) => {
        setActive(data);
      });
      client.fetch(gquery).then((data) => {
        setGroups(data);
      });
    }
    return () => (subscription = false);
  }, []);

  let date_today = new Date();
  let date_today_view = Number(
    date_today.getFullYear() +
    (Number(date_today.getMonth()) > 9 ? "" : "0") +
    date_today.getMonth() +
    (Number(date_today.getDate()) > 9 ? "" : "0") +
    date_today.getDate()
  );

  let [data, setData] = React.useState([]);
  let [dataChange, setDataChange] = React.useState([]);
  const [cols, setCols] = React.useState([]);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(data);
      setCols(make_cols(ws["!ref"]));
    };
    reader.readAsArrayBuffer(file);
  };

  const exportFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  };
  // console.log(files);
  function OutTable({ data, cols }) {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* list of supported file types */
  const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm",
  ]
    .map((x) => `.${x}`)
    .join(",");

  /* generate an array of column objects */
  const make_cols = (refstr) => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  function DragDropFile({ handleFile, children }) {
    const suppress = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };
    const handleDrop = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files && files[0]) handleFile(files[0]);
    };

    return (
      <div onDrop={handleDrop} onDragEnter={suppress} onDragOver={suppress}>
        {children}
      </div>
    );
  }

  function DataInput({ handleFile }) {
    const handleChange = (e) => {
      const files = e.target.files;
      if (files && files[0]) handleFile(files[0]);
    };

    return (
      <div className="col-12">
        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="bg-secondaryColor rounded-lg p-3 flex flex-0.7 w-full">
                  <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                    <label>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg">Click to Upload a File</p>
                        </div>

                        <p className="mt-32 text-gray-400">
                          Recommended: "xlsx", "xlsb", "xlsm", "xls", "xml",
                          "csv", "txt", "ods", "fods", "uos", "sylk", "dif",
                          "dbf", "prn", "qpw", "123", "wb*", "wq*", "html",
                          "htm",
                        </p>
                      </div>
                      <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept={SheetJSFT}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const DataList = ({ data, cols }) => {
    return (
      <div className="flex flex-col mt-5">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* <thead className="bg-gray-200 border-b-2 border-gray-300"> */}
                {/*   {data */}
                {/*     ? data[0]?.map((member) => ( */}
                {/*         <tr key={member?.toString()}> */}
                {/*           <input */}
                {/*             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" */}
                {/*             type="text" */}
                {/*             value={member} */}
                {/*             onChange={(e) => setDataChange(e.target.value)} */}
                {/*           /> */}
                {/*         </tr> */}
                {/*       )) */}
                {/*     : null} */}
                {/* </thead> */}
                <thead className="bg-gray-200 border-b-2 border-gray-300">
                  <tr>
                    {cols.map((c) => (
                      <th
                        key={c.key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-300 cursor-pointer">
                      {cols.map((c) => (
                        <td key={c.key} className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {r[c.key]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function renderButtons() {
    return (
      <div className="col-12">
        <div className="row m-3">
          <div
            onClick={() => navigate("/member/")}
            className="status-card cursor-pointer m-3"
          >
            <div className="status-card__icon">
              <BsPerson />
            </div>
            <div className="status-card__info">
              <h5>Members</h5>
              <span>{members?.length}</span>
            </div>
          </div>
          <div
            onClick={() => navigate("/group/groups/")}
            className="status-card cursor-pointer m-3"
          >
            <div className="status-card__icon">
              <BiGroup />
            </div>
            <div className="status-card__info">
              <h5>Groups</h5>
              <span>{groups?.length}</span>
            </div>
          </div>
          <div
            onClick={() => navigate("/loan/products/")}
            className="status-card cursor-pointer m-3"
          >
            <div className="status-card__icon">
              <RiPriceTag3Line />
            </div>
            <div className="status-card__info">
              <h5>Products</h5>
              <span>{products?.length}</span>
            </div>
          </div>
          <div
            onClick={() => navigate("/loan/payments/")}
            className="status-card cursor-pointer m-3"
          >
            <div className="status-card__icon">
              <BiReceipt />
            </div>
            <div className="status-card__info">
              <h5>Loans</h5>
              <span>{active?.length}</span>
            </div>
          </div>
          <div
            onClick={() => navigate("/apps")}
            className="status-card cursor-pointer m-3"
          >
            <div className="status-card__icon">
              <GrAppsRounded />
            </div>
            <div className="status-card__info">
              <h5>Apps</h5>
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDataUpload() {
    return (
      <>
        <DragDropFile handleFile={handleFile}>
          <div className="row">
            <div className="col-xs-12">
              <DataInput handleFile={handleFile} />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <button
                type="button"
                disabled={!data.length}
                className="bg-green-500 text-white font-bold p-2 m-3 rounded-lg w-36 outline-none"
                onClick={exportFile}
              >
                Download
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              {/* <OutTable data={data} cols={cols} /> */}
              {/* <DataList data={data} cols={cols} /> */}
              {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
            </div>
          </div>
        </DragDropFile>
      </>
    );
  }

  const chart_data = [
    { faceInstallmentDate: "", faceOutstandingPrincipal: "" },
  ];

  const AreaChartGraphRep = ({ title, aspect }) => {
    return (
      <div className="chart">
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={active}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="firstInstallmentDate" stroke="gray" />
            <YAxis
              dataKey="principalAmount"
              stroke="gray"
              type="number"
              domain={
                active[0]?.repaymentCycle === "daily" ? [0, 10000] : [0, 20000]
              }
            />
            {/* <CartesianGrid strokeDasharray="3 3" className="chartGrid" /> */}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="principalAmount"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const LineChartGraph = ({ title, aspect }) => {
    return (
      <div className="chart">
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis datakey={`${JSON.stringify(data, undefined, 2).split('\n')[2]}`} />
            <YAxis type="number" domain={[0, 25000]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={`${JSON.stringify(data, undefined, 2).split('\n')[2]}`}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={`${JSON.stringify(data, undefined, 2).split('\n')[4]}`}
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="m-3">
      {renderButtons()}
      {active ? (
        <>
          <div className="charts border border-gray-400 bg-gray-50 m-5 rounded-lg">
            <AreaChartGraphRep title="Amount Disbursed" aspect={2 / 1} />
          </div>
          <LoansFeed />
          <div className="charts border border-gray-400 bg-gray-50 m-5 rounded-lg">
            <LineChartGraph
              title="Installments & Interest Amounts"
              aspect={2 / 1}
            />
          </div>
        </>
      ) : null}
      {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
      <div className="row m-3">
        <div className="card__body"></div>
        {renderDataUpload()}
      </div>
    </div>
  );
};

export default Dashboard;
