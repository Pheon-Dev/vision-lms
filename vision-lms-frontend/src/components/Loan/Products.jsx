import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md';
import { AiFillDelete } from "react-icons/ai"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../client';
import { memberDetailMoreMemberQuery, productDetailQuery, memberDetailQuery } from '../../utils/data';
import { Spinner } from '../Components'

export default function Products() {
  const [productList, setProductList] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    const query = '*[_type == "newProduct"]';

    client.fetch(query).then((data) => {
      setProductList(data);
      setLoading(false)
    });

    return (() => console.log('unsubscribing'));

  }, []);

  const prod = 'Products' || 'all';
  if (productList?.length === 0) {
    return (
      <Spinner message={`Loading all ${prod} ...`} />
    )
  }

  return (
    <>
      <div className="font-bold mt-5 flex justify-center w-full text-3xl">
        Loan Products
      </div>
      <br />
      {productList && productList?.map((product, index) => (
        <div key={index} className="ml-auto mr-auto mb-3">
          <div className="flex justify-center items-center px-4 py-4">
            <div className="mt-3">
              <span className="font-bold text-xl mr-2">
                {product.productName}
              </span>
            </div>
          </div>
          <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Product Code
              </span>
              <span className="ml-auto">DC-{product?.productCode}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Interest Rate
              </span>
              <span className="ml-auto">{product?.interestRate} %</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Interest Frequency
              </span>
              <span className="ml-auto">Per {product?.interestFrequency}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Processing Fee Percentage
              </span>
              <span className="ml-auto">{product?.processingFee} %</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Penalty
              </span>
              <span className="ml-auto">{product?.penaltyTypeChoice === 'amount' ? `KSHs. ${product?.penalty}` : `${product?.penalty} %`}</span>
            </li>
            {product?.repaymentCycle === 'daily' && (
              <>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Penalty Payment
                  </span>
                  <span className="ml-auto">{product?.penaltyPaymentChoice === 'perInstallment' ? 'Per Installment' : product?.penaltyPaymentChoice === 'lastInstallment' ? 'Last Installment' : 'Percentage of Principal'}</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Repayment Cycle
                  </span>
                  <span className="ml-auto">Paid {product?.repaymentCycle}</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Grace Period
                  </span>
                  <span className="ml-auto">{product?.gracePeriod} day</span>
                </li>
              </>
            )}
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Principal Range
              </span>
              <span className="ml-auto">KSHs. {product?.minimumRange} - KSHs. {product?.maximumRange}</span>
            </li>
            <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
              <span>
                Maximum Tenure
              </span>
              <span className="ml-auto">{product?.tenureMaximum} {product?.tenureMaximumChoice}</span>
            </li>
          </ul>
        </div>
      ))}
    </>
  )
}


