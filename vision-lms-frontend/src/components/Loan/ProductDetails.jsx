import React, { useState, useEffect } from "react";

import { useParams, useNavigate, Link } from 'react-router-dom';

import { client } from "../../client";
export default function ProductDetails() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState("");
  const navigate = useNavigate();

  const fetchProductDetails = () => {
    const query = `*[_type == "newProduct" && _id == '${productId}']`;

    client.fetch(query).then((data) => {
      setProductDetails(data);
    });

    return (() => console.log('unsubscribing'));
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  function renderProductDetails() {
    return (
      <>
        {productDetails && productDetails?.map((product, index) => (
          <div key={index} className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-3">
                <Link to={`/loan/products/${product._id}`} className="font-bold text-xl mr-2 hover:text-blue-500">
                  {product.productName}
                </Link>
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
              {/* {product?.repaymentCycle === 'daily' && ( */}
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
              {/* )} */}
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

  function renderActions() {
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-1/3 p-2">
            <div className="w-full md:w-1/2 mr-auto ml-auto">
              <button
                type="button"
                // onClick={handleProductCreate}
                // onMouseEnter={handleProductSave}
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Approve
              </button>
            </div>
          </div>
          <div className="w-1/3 p-2">
            <div className="w-full md:w-1/2 mr-auto ml-auto">
              <button
                type="button"
                // onClick={handleProductCreate}
                // onMouseEnter={handleProductSave}
                className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </div>
          <div className="w-1/3 p-2">
            <div className="w-full md:w-1/2 mr-auto ml-auto">
              <button
                type="button"
                // onClick={handleProductCreate}
                // onMouseEnter={handleProductSave}
                className="bg-red-500 w-full hover:bg-red-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {renderProductDetails()}
      {renderActions()}
    </>
  )
}


