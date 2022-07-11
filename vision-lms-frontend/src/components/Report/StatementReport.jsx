import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { client } from "../../client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";


export default function StatementReport() {
  const { statementId } = useParams();
  const [memberDetails, setMemberDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const navigate = useNavigate();

  const fetchMemberDetails = async () => {
    let subscription = true;
    const query = `*[_type == "maintenance" && _id == '${statementId}']`;
    const pquery = `*[_type == "newProduct" && productName == '${productType}']`;

    if (subscription) {
      await client.fetch(pquery).then((data) => {
        setProductDetails(data);
      });

      await client.fetch(query).then((data) => {
        setMemberDetails(data);
      });
    }

    return () => (subscription = false);
  };
  useEffect(() => {
    fetchMemberDetails();
  }, [statementId]);

  const chart_data = [
    { faceInstallmentDate: "", faceOutstandingPrincipal: "" },
  ];

  const Charts = ({ title, aspect }) => {
    return (
      <div className="chart">
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart
            width={730}
            height={250}
            data={
              memberDetails[0]?.outstandingPenalty === "false"
                ? chart_data
                : memberDetails[0]?.recentPayments
            }
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="faceInstallmentDate" stroke="gray" />
            <YAxis
              dataKey="amountPaid"
              stroke="gray"
              type="number"
              domain={
                productDetails[0]?.repaymentCycle === "daily"
                  ? [0, 10000]
                  : [0, 20000]
              }
            />
            {/* <CartesianGrid strokeDasharray="3 3" className="chartGrid" /> */}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amountPaid"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
        <div
          onClick={() => {
            setProductType(memberDetails[0]?.productType);
          }}
        >
      <div className="font-bold flex justify-center w-full text-3xl">
        Customer Loan Statement
      </div>
      <br />
            <div className="charts border border-gray-400 rounded-lg">
              <Charts title="Chart Title" aspect={2 / 1} />
            </div>
              <pre>{JSON.stringify(memberDetails, undefined, 2)}</pre>
    </div>
  )
}





