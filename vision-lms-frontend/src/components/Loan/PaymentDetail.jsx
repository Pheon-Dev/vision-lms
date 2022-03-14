import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../../client';
import { productDetailQuery } from '../../utils/data';
import { v4 as uuidv4 } from 'uuid';

export default function PaymentDetail() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [loadLoan, setLoadLoan] = useState(false);
  const [addingPayment, setAddingPayment] = useState(false);
  const [review, setReview] = useState(false);

  const [amountPaid, setAmountPaid] = useState('');
  const [mpesaReferenceCode, setMpesaReferenceCode] = useState('');
  const [arrears, setArrears] = useState('');
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [outstandingPenalty, setOutstandingPenalty] = useState("");
  const [penaltyPaid, setPenaltyPaid] = useState("");
  const [penalty, setPenalty] = useState("");
  const [principalPaid, setPrincipalPaid] = useState("");
  const [interestPaid, setInterestPaid] = useState("");
  const [nextInstallmentDate, setNextInstallmentDate] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [currentInstallmentDate, setCurrentInstallmentDate] = useState("");
  const [penaltyCount, setPenaltyCount] = useState(0);

  const fetchCustomerDetails = () => {
    let subscription = true;
    const query = `*[_type == "payments" && _id == '${paymentId}']`;
    const pquery = `*[_type == "newProduct" && productName == '${productType}']`;

    if (subscription) {
      client.fetch(pquery).then((data) => {
        setProductDetails(data);
      });

      client.fetch(query).then((data) => {
        setCustomerDetails(data);
      });
    }

    return () => subscription = false;
  }

  useEffect(() => {
    fetchCustomerDetails();
  }, [paymentId, productType]);

  function renderArrears(installment, amount) {
    let result = (installment - amount);
    return result.toString();

  }

  function renderOutstandingBalance(principal, interest, tenure, amount) {
    let result = (principal + (interest / tenure) - amount);
    return result.toString();
  }

  function renderInterestPaid(interest, tenure) {
    let result = (interest / tenure);
    return result.toString();
  }

  function renderPrincipalPaid(tenure, interest, amount) {
    let result = amount - (interest / tenure);
    return result.toString();
  }

  function renderDailyNextInstallmentDate(installment_date) {
    let day = installment_date.split('-')[0];
    let month = installment_date.split('-')[1];
    let year = installment_date.split('-')[2];
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + 1)
    let result = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return result.toString();
  }

  function renderWeeklyNextInstallmentDate(installment_date) {
    let day = installment_date.split('-')[0];
    let month = installment_date.split('-')[1];
    let year = installment_date.split('-')[2];
    const date = new Date(year, month, day);
    // let today = new Date();
    // let date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    date.setDate(date.getDate() + 7)
    let result = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return result.toString();
  }

  function renderMonthlyNextInstallmentDate(installment_date) {
    let day = installment_date.split('-')[0];
    let month = installment_date.split('-')[1];
    let year = installment_date.split('-')[2];
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + 30)
    let result = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    return result.toString();
  }

  function renderDailyPenalty(penalty, os_penalty, installment, amount) {
    let result = 0;
    if (amount < installment) {
      result = penalty + os_penalty;
    } else {
      result = os_penalty;
    }
    return result.toString();
  }

  function renderPenalty(penalty, os_penalty, installment, amount) {
    let result = 0;
    if (amount < installment) {
      result = penalty + os_penalty;
    } else {
      result = os_penalty;
    }
    return result.toString();
  }

  function renderPenaltyPaid(interest, tenure, penalty, os_penalty, installment, amount) {
    let result = 0;
    let check = 0;
    if (amount < installment) {
      check = amount - ((interest / tenure) + installment + os_penalty + penalty);
    } else {
      check = amount - ((interest / tenure) + installment + os_penalty + 0);
    }

    if (check < 0) {
      result = 0;
    } else {
      result = check;
    }

    return result.toString();
  }

  function renderDailyPenaltyPaid(interest, tenure, penalty, os_penalty, installment, amount) {
    let result = 0;
    let check = 0;
    if (amount < installment) {
      check = amount - ((interest / tenure) + installment + os_penalty + penalty);
    } else {
      check = amount - ((interest / tenure) + installment + os_penalty + 0);
    }

    if (check < 0) {
      result = 0;
    } else {
      result = check;
    }

    return result.toString();
  }

  function renderOutstandingPenalty(penalty, os_penalty) {
    let result = 0;
    if (os_penalty === 0) {
      result = os_penalty;
    } else {
      result = penalty + os_penalty;
    }
    return result.toString();
  }

  const setPayment = () => {
    setInstallmentDate((currentInstallmentDate).split('-')[2] + '-' + (currentInstallmentDate).split('-')[1] + '-' + (currentInstallmentDate).split('-')[0])
    setArrears(renderArrears(Number(customerDetails[0]?.installmentAmount), Number(amountPaid)))
    setOutstandingBalance((renderOutstandingBalance(Number(customerDetails[0]?.principalAmount), Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure), Number(amountPaid))));
    setInterestPaid((renderInterestPaid(Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure))));
    setPrincipalPaid((renderPrincipalPaid(Number(customerDetails[0]?.loanTenure), Number(customerDetails[0]?.interestAmount), Number(amountPaid))));
    // setInstallmentDate(renderInstallmentDate());
    setNextInstallmentDate(
      customerDetails[0]?.repaymentCycle === 'days' ?
        (
          customerDetails[0]?.outstandingPenalty === "false" ?
            renderDailyNextInstallmentDate(customerDetails[0]?.firstInstallmentDate)
            :
            renderDailyNextInstallmentDate(installmentDate)
        )
        :
        customerDetails[0]?.repaymentCycle === 'weeks' ?
          (
            customerDetails[0]?.outstandingPenalty === "false" ?
              renderWeeklyNextInstallmentDate(customerDetails[0]?.firstInstallmentDate)
              :
              renderWeeklyNextInstallmentDate(installmentDate)
          )
          :
          (
            customerDetails[0]?.outstandingPenalty === "false" ?
              renderMonthlyNextInstallmentDate(customerDetails[0]?.firstInstallmentDate)
              :
              renderMonthlyNextInstallmentDate(installmentDate)
          )
    );
    setPenalty(
      customerDetails[0]?.repaymentCycle === 'days' ?
        (
          customerDetails[0]?.outstandingPenalty === 'false' ?
            '0'
            :
            renderDailyPenalty(Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty), Number(customerDetails[0]?.installmentAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.amountPaid))
        )
        :
        (
          customerDetails[0]?.outstandingPenalty === 'false' ?
            '0'
            :
            renderPenalty(Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty), Number(customerDetails[0]?.installmentAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.amountPaid))
        )
    );
    setPenaltyPaid(
      customerDetails[0]?.repaymentCycle === 'days' ?
        renderDailyPenaltyPaid(Number(customerDetails[0]?.penaltyAmount).toString())
        :
        renderPenaltyPaid(Number(customerDetails[0]?.penaltyAmount).toString())
    );
    setOutstandingPenalty(
      customerDetails[0]?.outstandingPenalty === "false" ?
        '0'
        :
        customerDetails[0]?.outstandingPenalty === "0" ?
          '0'
          :
          renderOutstandingPenalty(Number(customerDetails[0]?.outstandingPenalty), Number(customerDetails[0]?.penaltyAmount), installmentDate)
    );
    console.log("·······················");
    // console.log("amount paid  :", amountPaid);
    // console.log("arrears owe  :", arrears);
    // console.log("m-pesa code  :", mpesaReferenceCode);
    // console.log("inst amount  :", customerDetails[0]?.installmentAmount);
    // console.log("o/s balance  :", outstandingBalance);
    // console.log("princi paid  :", principalPaid);
    // console.log("intrst paid  :", interestPaid);
    // console.log("amnt penlty  :", outstandingPenalty);
    // console.log("penlty paid  :", penaltyPaid);
    console.log("instmt date  :", installmentDate);
    // console.log("nxt instlmt  :", nextInstallmentDate);
  };

  const addPayment = () => {
    if (
      amountPaid
      && mpesaReferenceCode
      && arrears
      && outstandingBalance
      && outstandingPenalty
      && principalPaid
      && interestPaid
      && penaltyPaid
      && installmentDate
      && nextInstallmentDate
    ) {
      setAddingPayment(true);
      client
        .patch(paymentId)
        .set({
          outstandingPenalty: '0',
        })
        .commit()
        .then((update) => {
          console.log(update);
        });
      client
        .patch(paymentId)
        .setIfMissing({ recentPayments: [] })
        .insert('after', 'recentPayments[-1]', [
          {
            amountPaid
            , mpesaReferenceCode
            , arrears
            , outstandingBalance
            , outstandingPenalty
            , principalPaid
            , interestPaid
            , penaltyPaid
            , installmentDate
            , nextInstallmentDate
            , _key: uuidv4()
          }
        ])
        .commit()
        .then(() => {
          fetchCustomerDetails();
          setAmountPaid('');
          setMpesaReferenceCode('');
          setOutstandingBalance('');
          setOutstandingPenalty('');
          setPrincipalPaid('');
          setInterestPaid('');
          setPenaltyPaid('');
          setInstallmentDate('');
          setNextInstallmentDate('');
          setCurrentInstallmentDate('');
          setAddingPayment(false);
          setReview(false);
          alert('Payment Added')
        });
    };
  };

  function renderLoanDetails() {
    return (
      <>
        <div
        >
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-0">
                <span className="font-bold text-xl mr-2">
                  Loan Details
                </span>
              </div>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Product Name
                </span>
                <span className="ml-auto">{customerDetails[0]?.productType}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Loan A/C Number
                </span>
                <span className="ml-auto">DC-{customerDetails[0]?.loanAccNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Principal Amount
                </span>
                <span className="ml-auto">KShs. {customerDetails[0]?.principalAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Loan Tenure
                </span>
                <span className="ml-auto">{customerDetails[0]?.loanTenure} {customerDetails[0]?.repaymentCycle}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Amount
                </span>
                <span className="ml-auto">KSHs. {customerDetails[0]?.interestAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Installment Amount
                </span>
                <span className="ml-auto">KSHs. {customerDetails[0]?.installmentAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Processing Fee Amount
                </span>
                <span className="ml-auto">KShs. {customerDetails[0]?.processingFeeAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Penalty
                </span>
                <span className="ml-auto">{productDetails[0]?.penaltyTypeChoice === 'amount' ? `KSHs. ${productDetails[0]?.penalty}` : `${productDetails[0]?.penalty} %`}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Penalty Amount
                </span>
                {productDetails[0]?.penaltyTypeChoice === 'amount' ?
                  <span className="ml-auto">KSHs. {productDetails[0]?.penalty}</span>
                  :
                  <span className="ml-auto">KSHs. {customerDetails[0]?.penaltyAmount}</span>
                }
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Penalty Payment
                </span>
                <span className="ml-auto">{productDetails[0]?.penaltyPaymentChoice === 'perInstallment' ? 'Per Installment' : productDetails[0]?.penaltyPaymentChoice === 'lastInstallment' ? 'Last Installment' : productDetails[0]?.penaltyTypeChoice === 'amount' ? 'Each Installment' : 'Percentage of Principal'}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Repayment Cycle
                </span>
                <span className="ml-auto">Paid {productDetails[0]?.repaymentCycle}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Grace Period
                </span>
                <span className="ml-auto">{productDetails[0]?.gracePeriod} day</span>
              </li>
            </ul>
          </div>
          <div className="mb-8" />
        </div>
      </>
    )
  }

  //   const data = [
  //   {title : "One",prix:100},
  //   {title : "Two",prix:200},
  //   {title : "Three",prix:300}
  // ]

  // console.log((data.reduce((a,v) =>  a = a + v.prix , 0 )))

  // const sum = data.map(datum => datum.prix).reduce((a, b) => a + b)

  function renderReview() {
    return (
      <>
        <div
        >
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-3">
                <span className="font-bold text-xl mr-2">
                  Review Payment Details
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Loan Ref Number
                  </span>
                  <span className="ml-auto">DC-{customerDetails[0]?.referenceNumber}</span>
                </li>
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    First Installment Date
                  </span>
                  <span className="ml-auto">{customerDetails[0]?.firstInstallmentDate}</span>
                </li>
                {
                  customerDetails[0]?.outstandingPenalty === 'false' ?
                    null
                    :
                    <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                      <span>
                        Previous Installment Date
                      </span>
                      <span className="ml-auto">
                        {customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.installmentDate}
                      </span>
                    </li>
                }
                <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                  <span>
                    Next Installment Date
                  </span>
                  {
                    customerDetails[0]?.repaymentCycle === 'days' ?
                      <span className="ml-auto">
                        {
                          customerDetails[0]?.outstandingPenalty === "false" ?
                            renderDailyNextInstallmentDate(customerDetails[0]?.firstInstallmentDate)
                            :
                            renderDailyNextInstallmentDate(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.installmentDate)
                        }
                      </span>
                      :
                      customerDetails[0]?.repaymentCycle === 'weeks' ?
                        <span className="ml-auto">{
                          customerDetails[0]?.outstandingPenalty === "false" ?
                            renderWeeklyNextInstallmentDate(customerDetails[0]?.firstInstallmentDate)
                            :
                            renderWeeklyNextInstallmentDate(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.installmentDate)
                        }</span>
                        :
                        <span className="ml-auto">{
                          customerDetails[0]?.outstandingPenalty === "false" ?
                            renderMonthlyNextInstallmentDate(customerDetails[0]?.firstInstallmentDate)
                            :
                            renderMonthlyNextInstallmentDate(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.installmentDate)
                        }</span>
                  }
                </li>
              </ul>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Current Installment Date
                </span>
                <input
                  className="ml-auto rounded-lg"
                  type="date"
                  value={currentInstallmentDate}
                  onChange={(e) => setCurrentInstallmentDate(e.target.value)}
                />
                {/* <span className="ml-auto">{renderInstallmentDate()}</span> */}
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Amount Paid
                </span>
                <span className="ml-auto">KSHs. {amountPaid}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Arrears
                </span>
                <span className="ml-auto">KSHs. {renderArrears(Number(customerDetails[0]?.installmentAmount), Number(amountPaid))}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Installment Amount
                </span>
                <span className="ml-auto">KSHs. {customerDetails[0]?.installmentAmount}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  O/S Balance
                </span>
                <span className="ml-auto">
                  KSHs. {
                    customerDetails[0]?.outstandingPenalty === "false" ?
                      renderOutstandingBalance(Number(customerDetails[0]?.principalAmount), Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure), Number(amountPaid))
                      :
                      renderOutstandingBalance(Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingBalance), Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure), Number(amountPaid))
                  }
                </span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Principal Paid
                </span>
                <span className="ml-auto">KSHs. {renderPrincipalPaid(Number(customerDetails[0]?.loanTenure), Number(customerDetails[0]?.interestAmount), Number(amountPaid))}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Interest Paid
                </span>
                <span className="ml-auto">KSHs. {renderInterestPaid(Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure))}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Penalty
                </span>
                {
                  customerDetails[0]?.repaymentCycle === 'days' ?
                    <span className="ml-auto">KSHs.
                      {
                        customerDetails[0]?.outstandingPenalty === 'false' ?
                          '0'
                          :
                          renderDailyPenalty(Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty), Number(customerDetails[0]?.installmentAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.amountPaid))
                      }
                    </span>
                    :
                    <span className="ml-auto">KSHs.
                      {
                        customerDetails[0]?.outstandingPenalty === 'false' ?
                          '0'
                          :
                          renderPenalty(Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty), Number(customerDetails[0]?.installmentAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.amountPaid))
                      }
                    </span>
                }
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Outstanding Penalty
                </span>
                <span className="ml-auto">KSHs.
                  {
                    customerDetails[0]?.outstandingPenalty === "false" ?
                      0
                      :
                      renderOutstandingPenalty(Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty))
                  }
                </span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Penalty Paid
                </span>
                {
                  customerDetails[0]?.repaymentCycle === 'days' ?
                    <span className="ml-auto">KSHs.
                      {
                        customerDetails[0]?.outstandingPenalty === 'false' ?
                          '0'
                          :
                          renderDailyPenaltyPaid(Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure), Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty), Number(customerDetails[0]?.installmentAmount), Number(amountPaid))
                      }
                    </span>
                    :
                    <span className="ml-auto">KSHs.
                      {
                        customerDetails[0]?.outstandingPenalty === 'false' ?
                          '0'
                          :
                          renderPenaltyPaid(Number(customerDetails[0]?.interestAmount), Number(customerDetails[0]?.loanTenure), Number(customerDetails[0]?.penaltyAmount), Number(customerDetails[0]?.recentPayments[customerDetails[0].recentPayments.length - 1]?.outstandingPenalty), Number(customerDetails[0]?.installmentAmount), Number(amountPaid))
                      }
                    </span>
                }
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  M-PESA Code
                </span>
                <span className="ml-auto uppercase">{mpesaReferenceCode}</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap justify-center mt-6 gap-3">
            <button
              type="button"
              className="bg-cyan-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={() => { setPayment(); addPayment(); }}
              onMouseEnter={() => { setPayment(); }}
            >
              {addingPayment ? 'Adding ...' : 'Add Payment'}
            </button>
          </div>
          <br />
        </div>
      </>
    )
  }

  function renderCustomerDetails() {
    return (
      <>
        <div
        >
          <div className="ml-auto mr-auto mb-3">
            <div className="flex justify-center items-center px-4 py-4">
              <div className="mt-3">
                <span className="font-bold text-xl mr-2">
                  Personal Details
                </span>
              </div>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Member Code
                </span>
                <span className="ml-auto">DC-{customerDetails[0]?.loanAccNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Mobile No.
                </span>
                <span className="ml-auto">{customerDetails[0]?.memberPhoneNumber}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  Email
                </span>
                <span className="ml-auto">{customerDetails[0]?.memberEmail}</span>
              </li>
              <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                <span>
                  ID Number
                </span>
                <span className="ml-auto">{customerDetails[0]?.memberIdNumber}</span>
              </li>
            </ul>
          </div>
          <br />
        </div>
      </>
    )
  }

  function renderRecentPayments() {
    return (
      <div className="flex flex-col mt-5">
        <div className="font-bold flex justify-center w-full text-xl">
          <span className="text-gray-700 ml-auto mr-auto">Recent Payments Made</span>
        </div>
        <br />
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 border-b-2 border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">M-PESA Code</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penalty Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal Paid</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Penalty</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrears</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerDetails ? customerDetails[0]?.recentPayments?.map((payment, index) => (
                    <tr
                      // onClick={() => {
                      //   navigate(`/loan/approvals/${payment._id}`);
                      // }}
                      key={index}
                      className="hover:bg-gray-300 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{payment.installmentDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-0">
                            <div className="text-sm font-medium text-gray-900">{payment.amountPaid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm uppercase font-medium text-gray-900">{payment.mpesaReferenceCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.penaltyPaid}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.interestPaid}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.principalPaid}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{
                          payment.outstandingPenalty === 'false' ?
                            0 :
                            payment.outstandingPenalty
                        }</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.arrears}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.outstandingBalance}</div>
                      </td>
                    </tr>
                  ))
                    :
                    null
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderLoanPayments() {
    return (
      <>
        <div
          onMouseEnter={() => {
            setProductType(customerDetails[0]?.productType)
          }}
        >
          <div className="font-bold mt-5 flex justify-center w-full text-2xl">
            <span className="text-gray-500">Payments for </span>
            <span className="text-gray-700 ml-3">{customerDetails[0]?.memberNames}</span>
          </div>
          <br />
          <div className="ml-auto mr-auto mb-3">
            <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  Amount Paid (KShs)
                  <span className="text-red-500 italic">*</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  placeholder="Paid Amount ..."
                  value={amountPaid}
                  onChange={(e) => {
                    setReview(true);
                    setAmountPaid(e.target.value);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                  M-PESA Code
                  <span className="text-red-500 italic">*</span>
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 uppercase border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="string"
                  placeholder="M-PESA Code ..."
                  value={mpesaReferenceCode}
                  onChange={(e) => setMpesaReferenceCode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {renderLoanPayments()}
      {review ? renderReview() : renderCustomerDetails()}
      {renderRecentPayments()}
      {loadLoan ? null :
        <>
          <div className="flex justify-center mt-5">
            <div className="w-full md:w-1/3 mr-auto ml-auto">
              <button
                type="button"
                onClick={() => {
                  setLoadLoan(true);
                  setProductType(customerDetails[0]?.productType)
                }}
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Show Loan Details
              </button>
            </div>
          </div>
        </>
      }
      {loadLoan ? renderLoanDetails() : null}
      {!loadLoan ? null :
        <>
          <div className="flex justify-center mt-5">
            <div className="w-full md:w-1/3 mr-auto ml-auto">
              <button
                type="button"
                onClick={() => {
                  setLoadLoan(false);
                }}
                className="bg-blue-500 w-full hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hide Loan Details
              </button>
            </div>
          </div>
        </>
      }
      <pre>{JSON.stringify(productDetails, undefined, 2)}</pre>
      <pre>{JSON.stringify(customerDetails, undefined, 2)}</pre>
    </>
  )
}





