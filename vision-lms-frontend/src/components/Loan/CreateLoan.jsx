import React, { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { ModalAlert } from "../Modals";
import { List, Label, Spinner } from "../Components";
import { v4 as uuidv4 } from "uuid";

import { client, urlFor } from "../../client";

export default function CreateLoan() {
  const [maintenanceId, setMaintenanceId] = useState();
  const [fields, setFields] = useState();
  const [validator, setValidator] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [maintaining, setMaintaining] = useState(false);
  const [adding, setAdding] = useState(false);
  const [list, setList] = useState(false);
  const [guarantorList, setGuarantorList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchGuarantorTerm, setSearchGuarantorTerm] = useState("");
  const [members, setMembers] = useState("");
  const [guarantors, setGuarantors] = useState("");
  const [toggleSundays, setToggleSundays] = useState(false);
  const [togglePayoff, setTogglePayoff] = useState(false);
  const [plusSundays, setPlusSundays] = useState("false");
  const [payoff, setPayoff] = useState("false");
  const [payoffMember, setPayoffMember] = useState("false");

  const [memberId, setMemberId] = useState("");
  const [memberIdNumber, setMemberIdNumber] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberIdentity, setMemberIdentity] = useState("");
  const [memberDetail, setMemberDetail] = useState();
  const [membersList, setMembersList] = useState("");
  const [memberNames, setMemberNames] = useState("");
  const [memberPhoneNumber, setMemberPhoneNumber] = useState("");

  const [productId, setProductId] = useState("");
  const [productList, setProductList] = useState("");
  const [productType, setProductType] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const [principalAmount, setPrincipalAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [loanAccNumber, setLoanAccNumber] = useState("");
  const [repaymentCycle, setRepaymentCycle] = useState("");

  const [sundays, setSundays] = useState("");

  const [interestAmount, setInterestAmount] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [processingFee, setProcessingFee] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  const [guarantorName, setGuarantorName] = useState("");
  const [guarantorId, setGuarantorId] = useState("");
  const [guarantorDetails, setGuarantorDetails] = useState("");
  const [guarantor, setGuarantor] = useState("");
  const [guarantorRelationship, setGuarantorRelationship] = useState("");
  const [guarantorPhone, setGuarantorPhone] = useState("");

  const [collateralItem, setCollateralItem] = useState("");
  const [collateralValue, setCollateralValue] = useState("");

  const [maintained, setMaintained] = useState("");
  const [approved, setApproved] = useState("");
  const [disbursed, setDisbursed] = useState("");

  const id = memberIdentity.split(" ")[0];
  const sname = memberIdentity.split(" ")[1];
  const oname =
    memberIdentity.split(" ")[2] + " " + memberIdentity.split(" ")[3];
  const names = sname + " " + oname;

  const gid = guarantorDetails.split(" ")[0];
  const gsname = guarantorDetails.split(" ")[1];
  const goname =
    guarantorDetails.split(" ")[2] + " " + guarantorDetails.split(" ")[3];
  const gnames = gsname + " " + goname;

  useEffect(() => {
    let subscription = true;
    const membersListQuery = '*[_type == "member" && maintained == "false"]';
    const memberQuery = `*[_type == "member" && memberNumber match '${id}' || surName match '${sname}' || otherNames match '${oname}']`;
    const productListQuery = '*[_type == "newProduct"]';
    const payOffQuery = `*[_type == "maintenance" && memberNames match '${names}' && arrears match "0"]`;
    const guarantorQuery = `*[_type == "member" && memberNumber match '${gid}' || surName match '${gsname}' || otherNames match '${goname}']`;
    // const productTypeQuery = productDetailQuery(productType);
    const productTypeQuery = `*[_type == "newProduct" && productName == "${productType}"]`;
    const m_query = `*[_type == "member" && memberNumber match '${searchTerm}*' || surName match '${searchTerm}*' || otherNames match '${searchTerm}*' || mobileNumber match '${searchTerm}*' || idPass match '${searchTerm}*']`;
    const g_query = `*[_type == "member" && memberNumber match '${searchGuarantorTerm}*' || surName match '${searchGuarantorTerm}*' || otherNames match '${searchGuarantorTerm}*' || mobileNumber match '${searchGuarantorTerm}*' || idPass match '${searchGuarantorTerm}*']`;

    if (subscription) {
      client.fetch(payOffQuery).then((data) => {
        setPayoffMember(data);
      });

      client.fetch(membersListQuery).then((data) => {
        setMembersList(data);
      });

      client.fetch(guarantorQuery).then((data) => {
        setGuarantor(data);
      });

      client.fetch(memberQuery).then((data) => {
        setMemberDetail(data);
      });

      client.fetch(productListQuery).then((data) => {
        setProductList(data);
      });

      client.fetch(productTypeQuery).then((data) => {
        setProductDetails(data);
      });

      client.fetch(m_query).then((data) => {
        setMembers(data);
      });

      client.fetch(g_query).then((data) => {
        setGuarantors(data);
      });
    }
    return () => (subscription = false);
  }, [
    productType,
    memberIdentity,
    id,
    sname,
    oname,
    names,
    gid,
    goname,
    gsname,
    searchTerm,
    searchGuarantorTerm,
    payoff,
  ]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGuarantorChange = (event) => {
    setSearchGuarantorTerm(event.target.value);
  };

  function renderSundays(tenure) {
    var day = "";
    let result = "";
    var sundays = 0;
    var counter = 0;

    while (counter < Number(tenure) + 1) {
      const date = new Date();
      date.setDate(date.getDate() + counter);
      day = date.getDay();
      if (day === 0) {
        sundays += 1;
      }
      counter++;
    }

    result = plusSundays === "true" ? 0 : sundays;
    return result;
  }

  function renderPayOffCalculator() {
    let member =
      payoffMember[0]?.recentPayments[
        payoffMember[0]?.recentPayments.length - 1
      ];
    if (payoff === "true") {
      client
        .patch(payoffMember[0]?._id)
        .set({
          arrears: "false",
          outstandingPenalty: "0",
        })
        .insert("after", "recentPayments[-1]", [
          {
            amountPaid: member?.amountPaid,
            mpesaReferenceCode: "NIUGHI976E",
            arrears: "0",
            counter: "0",
            arrearsPaid: member?.arrearsPaid,
            paymentCount: "0",
            paymentDay: "0",
            outstandingInterest: "0",
            outstandingPrincipal: "0",
            outstandingBalance: "0",
            outstandingPenalty: "0",
            principalPaid: member?.principalPaid,
            interestPaid: member?.interestPaid,
            penaltyPaid: member?.penaltyPaid,
            penalty: "0",
            awardedPenalty: "0",
            installmentDate: member?.installmentDate,
            faceInstallmentDate: member?.faceInstallmentDate,
            faceOutstandingArrears: "0",
            facePaidArrears: member?.facePaidArrears,
            faceOutstandingPenalty: "0",
            facePaidPenalty: member?.facePaidPenalty,
            faceOutstandingInterest: "0",
            facePaidInterest: member?.facePaidInterest,
            faceOutstandingPrincipal: "0",
            facePaidPrincipal: member?.facePaidPrincipal,
            faceOutstandingBalance: "0",
            nextInstallmentDate: member?.nextInstallmentDate,
            _key: uuidv4(),
          },
        ]).commit().then(() => {console.log("Done")});
      return console.log("Done");
    }
    if (payoff === "false") return console.log("false");
  }

  // console.log(payoffMember);
  function renderPayoff() {
    return (
      <>
        <div className="ml-auto mr-auto mb-3">
          <div className="flex justify-center items-center px-4 py-4">
            <div className=" mt-3">
              <span className="font-bold text-red-400 text-xl mr-2">
                Outstanding Balance +{/* Outstanding Penalty + */}
                Outstanding Interest =
              </span>
              <span className="font-bold text-red-400 text-xl mr-2">
                Payoff Amount
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center px-4 py-4">
            <div className="mt-3">
              <span className="font-bold text-red-400 text-xl mr-2">
                {payoffMember.length > 0 &&
                  Number(
                    payoffMember[0]?.recentPayments[
                      payoffMember[0]?.recentPayments.length - 1
                    ]?.faceOutstandingBalance
                  )}
                +{/* {payoffMember.length > 0 && */}
                {/*   Number( */}
                {/*     payoffMember[0]?.recentPayments[ */}
                {/*       payoffMember[0]?.recentPayments.length - 1 */}
                {/*     ]?.faceOutstandingPenalty */}
                {/*   )} */}
                {/* + */}
                {payoffMember.length > 0 &&
                  Number(payoffMember[0]?.interestAmount) -
                    Number(
                      payoffMember[0]?.recentPayments[
                        payoffMember[0]?.recentPayments.length - 1
                      ].facePaidInterest
                    )}
                =
              </span>
              <span className="font-bold text-red-400 text-xl mr-2">
                {payoffMember.length > 0 &&
                  Number(
                    payoffMember[0]?.recentPayments[
                      payoffMember[0]?.recentPayments.length - 1
                    ]?.faceOutstandingBalance
                  ) +
                    // Number(
                    //   payoffMember[0]?.recentPayments[
                    //     payoffMember[0]?.recentPayments.length - 1
                    //   ]?.faceOutstandingPenalty
                    // ) +
                    (Number(payoffMember[0]?.interestAmount) -
                      Number(
                        payoffMember[0]?.recentPayments[
                          payoffMember[0]?.recentPayments.length - 1
                        ].facePaidInterest
                      ))}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderPayoffButton() {
    return (
      //   Switch Container
      <div
        className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${
          !togglePayoff ? "bg-gray-400" : "bg-green-500"
        } rounded-full p-1 cursor-pointer`}
        onClick={() => {
          setTogglePayoff(!togglePayoff);
          setPayoff(!togglePayoff ? "true" : "false");
        }}
      >
        <div
          className={
            `${
              !togglePayoff ? "bg-green-100" : "bg-red-100"
            } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md ease-in-out duration-500` +
            (togglePayoff ? null : toggleClass)
          }
        ></div>
      </div>
    );
  }

  function renderSundayButton() {
    return (
      //   Switch Container
      <div
        className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${
          !toggleSundays ? "bg-gray-400" : "bg-green-500"
        } rounded-full p-1 cursor-pointer`}
        onClick={() => {
          setToggleSundays(!toggleSundays);
          setPlusSundays(!toggleSundays ? "true" : "false");
        }}
      >
        {/* Switch */}
        <div
          className={
            `${
              !toggleSundays ? "bg-green-100" : "bg-red-100"
            } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md ease-in-out duration-500` +
            (toggleSundays ? null : toggleClass)
          }
        ></div>
      </div>
    );
  }

  const toggleClass = "transform translate-x-6";

  function renderDailyInterestAmount(rate, principal, tenure) {
    tenure = Number(tenure);
    let multiplier = 30 / 4;
    tenure =
      tenure === 7
        ? multiplier
        : tenure === 14
        ? multiplier * 2
        : tenure === 21
        ? multiplier * 3
        : tenure;
    return roundOff(((rate * principal) / 3000) * tenure);
  }

  function renderWeeklyInterestAmount(rate, principal, tenure) {
    return roundOff(((rate * principal) / 400) * tenure);
  }

  function renderMonthlyInterestAmount(rate, principal, tenure) {
    return roundOff(((rate * principal) / 100) * tenure);
  }

  function renderDailyInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = renderDailyInterestAmount(rate, principal, tenure);
    return roundOff(
      (Number(principalAmount) + Number(principal)) /
        (Number(tenure) - Number(renderSundays(Number(tenure))))
    );
  }

  function renderWeeklyInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = ((rate * principal) / 400) * tenure;
    return roundOff(
      (Number(principalAmount) + Number(principal)) / Number(tenure)
    );
  }

  function renderMonthlyInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = ((rate * principal) / 100) * tenure;
    return roundOff((Number(principalAmount) + Number(principal)) / tenure);
  }

  function renderProcessingFeeAmount(feePercentage, principal) {
    let procFee = roundOff((feePercentage / 100) * principal);
    return procFee < 301 ? "300" : procFee;
  }

  function renderPenaltyAmount(penaltyPercentage, installment) {
    return roundOff((Number(penaltyPercentage) / 100) * installment);
  }

  function roundOff(x) {
    return (
      Number(x.toString().split(".")[1]) > 0
        ? Number(x.toString().split(".")[0]) + 1
        : Number(x.toString().split(".")[0]) + 0
    ).toString();
  }

  function renderDays(tenure) {
    var days;
    var day = "";
    var sundays = 0;
    var sundates = [];
    var counter = 0;
    var months = 1;
    var startDate = 1;
    var data = [];
    while (counter < tenure + 1) {
      const date = new Date();
      startDate = [{ start_date: date.getDate(), start_day: date.getDay() }];
      date.setDate(date.getDate() + counter);
      days = date.getDate();
      day = date.getDay();
      if (day === 0) {
        sundays += 1;
        sundates.push([
          { date: days, month: Number(date.getMonth() + 1), day: "sunday" },
        ]);
      }
      if (days === 1) {
        months += 1;
      }
      counter++;
    }
    var endDate = [{ end_date: days, end_day: day }];
    data = [
      {
        tenure: counter - 1,
        start_date_data: startDate,
        end_date_data: endDate,
        total_months: months,
        total_sundays: sundays,
        sunday_dates: sundates,
      },
    ];
    return data;
  }

  const handleCollateralAdd = () => {
    console.log("1");
    setMaintenanceId(memberDetail[0]?._id);
    // setCollateralItem(collateralItem);
    // setCollateralValue(collateralValue);
    if (memberDetail?.length === 0) return;
    console.log("2");
    if (maintenanceId || collateralValue || collateralItem) {
      console.log("3");
      setAdding(true);
      client
        .patch(maintenanceId)
        .setIfMissing({ collateral: [] })
        .insert("after", "collateral[-1]", [
          {
            collateralValue,
            collateralItem,
            _key: uuidv4(),
          },
        ])
        .commit()
        .then(() => {
          console.log("3");
          setCollateralItem("");
          setCollateralValue("");
          setAdding(false);
        });
    }
  };

  const handleLoanSave = () => {
    setMaintained("true");
    setApproved("false");
    setDisbursed("false");
    setSundays(renderSundays(Number(loanTenure)).toString());
    setMemberId(memberDetail[0]?._id);
    setProductId(productDetails[0]?._id);
    setRepaymentCycle(
      productDetails[0]?.repaymentCycle === "weekly"
        ? "weeks"
        : productDetails[0]?.repaymentCycle === "monthly"
        ? "months"
        : "days"
    );
    setMemberNames(
      memberDetail[0]?.surName + " " + memberDetail[0]?.otherNames
    );
    setMemberPhoneNumber(memberDetail[0]?.mobileNumber);
    setInterestAmount(
      productDetails[0]?.repaymentCycle === "weekly"
        ? renderWeeklyInterestAmount(
            productDetails[0]?.interestRate,
            principalAmount,
            loanTenure
          ).toString()
        : productDetails[0]?.repaymentCycle === "monthly"
        ? renderMonthlyInterestAmount(
            productDetails[0]?.interestRate,
            principalAmount,
            loanTenure
          ).toString()
        : renderDailyInterestAmount(
            productDetails[0]?.interestRate,
            principalAmount,
            loanTenure
          ).toString()
    );
    setInstallmentAmount(
      productDetails[0]?.repaymentCycle === "weekly"
        ? renderWeeklyInstallmentsAmount(
            productDetails[0]?.interestRate,
            principalAmount,
            loanTenure
          ).toString()
        : productDetails[0]?.repaymentCycle === "monthly"
        ? renderMonthlyInstallmentsAmount(
            productDetails[0]?.interestRate,
            principalAmount,
            loanTenure
          ).toString()
        : renderDailyInstallmentsAmount(
            productDetails[0]?.interestRate,
            principalAmount,
            loanTenure
          ).toString()
    );
    setProcessingFee(
      renderProcessingFeeAmount(
        productDetails[0]?.processingFee,
        principalAmount
      ).toString()
    );
    setPenaltyAmount(
      productDetails[0]?.repaymentCycle === "weekly"
        ? renderPenaltyAmount(
            productDetails[0]?.penalty,
            renderWeeklyInstallmentsAmount(
              productDetails[0]?.interestRate,
              principalAmount,
              loanTenure
            )
          ).toString()
        : productDetails[0]?.repaymentCycle === "monthly"
        ? renderPenaltyAmount(
            productDetails[0]?.penalty,
            renderMonthlyInstallmentsAmount(
              productDetails[0]?.interestRate,
              principalAmount,
              loanTenure
            )
          ).toString()
        : renderPenaltyAmount(
            productDetails[0]?.penalty,
            renderDailyInstallmentsAmount(
              productDetails[0]?.interestRate,
              principalAmount,
              loanTenure
            )
          ).toString()
    );
    setLoanAccNumber(
      productDetails[0]?.productCode +
        "-" +
        memberDetail[0]?.memberNumber.split("-")[1]
    );
    setMemberIdNumber(memberDetail[0]?.idPass);
    setMemberEmail(memberDetail[0]?.emailAddress);

    setGuarantorName(
      guarantorDetails
        ? guarantor[0]?.surName + " " + guarantor[0]?.otherNames
        : guarantorName
    );
    setGuarantorId(guarantorDetails ? guarantor[0]?.idPass : guarantorId);
    setGuarantorPhone(
      guarantorDetails ? guarantor[0]?.mobileNumber : guarantorPhone
    );
    setGuarantorRelationship(guarantorRelationship);
    console.log(
      productType,
      principalAmount,
      repaymentCycle,
      memberId,
      productId,
      memberIdNumber,
      memberEmail,
      memberNames,
      memberPhoneNumber,
      loanTenure,
      interestAmount,
      installmentAmount,
      processingFee,
      penaltyAmount,
      maintained,
      approved,
      disbursed,
      loanAccNumber,
      guarantorName,
      guarantorId,
      guarantorPhone,
      guarantorRelationship,
      payoff,
      sundays
    );
  };

  const handleLoanSubmit = () => {
    if (
      productType &&
      principalAmount &&
      memberId &&
      productId &&
      memberIdNumber &&
      memberEmail &&
      memberNames &&
      memberPhoneNumber &&
      loanTenure &&
      interestAmount &&
      installmentAmount &&
      processingFee &&
      penaltyAmount &&
      maintained &&
      approved &&
      disbursed &&
      loanAccNumber &&
      guarantorName &&
      guarantorId &&
      guarantorPhone &&
      guarantorRelationship &&
      sundays &&
      payoff &&
      repaymentCycle
    ) {
      setMaintaining(true);
      client
        .patch(memberId)
        .set({
          maintained: "true",
        })
        .commit()
        .then((update) => {
          setMaintaining(true);
          console.log(update);
        });
      const doc = {
        _type: "maintenance",
        productType,
        principalAmount,
        repaymentCycle,
        memberId,
        productId,
        memberIdNumber,
        memberEmail,
        memberNames,
        memberPhoneNumber,
        loanTenure,
        interestAmount,
        installmentAmount,
        processingFee,
        penaltyAmount,
        maintained,
        approved,
        disbursed,
        loanAccNumber,
        guarantorName,
        guarantorId,
        guarantorPhone,
        guarantorRelationship,
        sundays,
        payoff,
      };
      client.create(doc).then(() => {
        setOpen(true);
        console.log("Submitted", doc);
        // navigate("/loan/approvals");
        // navigate(`/loan/preview/${_id}`)
      });
    } else {
      setValidator(true);
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  let classInput =
    "appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  let classSpan =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  function renderGuaList(gua) {
    return (
      <>
        {gua.length > 0 ? (
          gua?.map((member) => (
            <div key={member?._id}>
              {member?.surName === undefined ? null : (
                <li
                  className="flex cursor-pointer items-center border-gray-200 border-b-1 border-t-1 pl-2 pr-2 hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3"
                  onClick={() => {
                    setGuarantorDetails(
                      member?.memberNumber +
                        "  " +
                        member?.surName +
                        " " +
                        member?.otherNames
                    );
                    setGuarantorList(false);
                  }}
                >
                  <span className="mr-2">
                    {member?.memberNumber +
                      "  " +
                      member?.surName +
                      " " +
                      member?.otherNames}
                  </span>
                </li>
              )}
            </div>
          ))
        ) : (
          <span className="bg-red-100 p-3 rounded-lg flex ml-auto mr-auto">
            No matching results found ...
          </span>
        )}
      </>
    );
  }

  function renderMemList(mem) {
    return (
      <>
        {mem.length > 0 ? (
          mem?.map((member) => (
            <div key={member?._id}>
              {member?.surName === undefined ? null : (
                <li
                  className="flex cursor-pointer items-center border-gray-200 border-b-1 border-t-1 pl-2 pr-2 hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3"
                  onClick={() => {
                    setMemberIdentity(
                      member?.memberNumber +
                        "  " +
                        member?.surName +
                        " " +
                        member?.otherNames
                    );
                    setList(false);
                  }}
                >
                  <span className="mr-2">
                    {member?.memberNumber +
                      "  " +
                      member?.surName +
                      " " +
                      member?.otherNames}
                  </span>
                </li>
              )}
            </div>
          ))
        ) : (
          <span className="bg-red-100 p-3 rounded-lg flex ml-auto mr-auto">
            No matching results found ...
          </span>
        )}
      </>
    );
  }

  function renderList(mem, term) {
    return (
      <div className="relative">
        {list ? (
          <ul className="bg-white w-1/2 md:w-full rounded-lg absolute">
            <>{renderMemList(mem)}</>
          </ul>
        ) : null}
        {memberIdentity ? null : (
          <>
            {term.length > 1 ? (
              <ul
                className="bg-white w-1/2 md:w-full rounded-lg absolute"
                value={memberIdentity}
                onChange={(e) =>
                  setMemberIdentity(e.target.value.toUpperCase())
                }
              >
                <>{renderMemList(mem)}</>
              </ul>
            ) : null}
          </>
        )}
      </div>
    );
  }

  function renderGuarantors() {
    return (
      <>
        <div className="w-full flex justify-center mr-auto ml-auto px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            Guarantor Details
          </label>
        </div>
        <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={
                guarantorDetails?.length === 0 || guarantor?.length > 0
                  ? validator
                  : !validator
              }
              label="Search for a Guarantor"
              item={guarantorName}
            />
            <div>
              <input
                type="text"
                placeholder="Search ..."
                value={
                  guarantorDetails ? guarantorDetails : searchGuarantorTerm
                }
                onChange={handleGuarantorChange}
                onClick={() => {
                  setGuarantorDetails("");
                  setGuarantorName("");
                  setGuarantorPhone("");
                  setGuarantorId("");
                  setGuarantorRelationship("");
                  setSearchTerm("");
                  setGuarantorList(true);
                  setList(false);
                  setTimeout(() => {
                    setGuarantorList(false);
                  }, 8000);
                }}
                className={classInput}
              />
              <div className="relative">
                {guarantorList ? (
                  <ul className="bg-white w-1/2 md:w-full rounded-lg absolute">
                    <>{renderGuaList(guarantors)}</>
                  </ul>
                ) : null}
                {guarantorDetails ? null : (
                  <>
                    {searchGuarantorTerm.length > 1 ? (
                      <ul
                        className="bg-white w-1/2 md:w-full rounded-lg absolute"
                        value={guarantorDetails}
                        onChange={(e) => {
                          setGuarantorDetails(e.target.value.toUpperCase());
                        }}
                      >
                        <>{renderGuaList(guarantors)}</>
                      </ul>
                    ) : null}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label
              valid={
                guarantorDetails?.length === 0 || guarantor?.length > 0
                  ? validator
                  : !validator
              }
              label="Guarantor Names"
              item={guarantorName}
            />
            {guarantorDetails.length === 0 ? (
              <input
                className={classInput}
                type="text"
                placeholder="Guarantor Names ..."
                value={guarantorName}
                onChange={(e) => setGuarantorName(e.target.value.toUpperCase())}
                onClick={() => {
                  setGuarantorDetails("");
                  setSearchGuarantorTerm("");
                  setGuarantorList(false);
                  setList(false);
                }}
              />
            ) : (
              <div className="flex">
                <span className="appearance-none mr-2 block w-3/4 bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                  {gnames}
                </span>
                <span
                  onClick={() => {
                    setGuarantorDetails("");
                    setGuarantor("");
                    setSearchGuarantorTerm("");
                    setGuarantorList(false);
                  }}
                  className="flex items-center font-bold cursor-pointer text-lg bg-red-400 w-1/3 text-gray-100 border border-gray-500 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                  Clear Details
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label
              valid={
                guarantorDetails?.length === 0 || guarantor?.length > 0
                  ? validator
                  : !validator
              }
              label="Guarantor Phone"
              item={guarantorPhone}
            />
            {!guarantorDetails && (
              <input
                className={classInput}
                type="text"
                placeholder="Phone Number ..."
                value={guarantorPhone}
                onChange={(e) =>
                  setGuarantorPhone(e.target.value.toUpperCase())
                }
                onClick={() => {
                  setGuarantorList(false);
                  setList(false);
                }}
              />
            )}
            {guarantorDetails && (
              <span className={classSpan}>{guarantor[0]?.mobileNumber}</span>
            )}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label
              valid={
                guarantorDetails?.length === 0 || guarantor?.length > 0
                  ? validator
                  : !validator
              }
              label="Guarantor ID"
              item={guarantorId}
            />
            {!guarantorDetails && (
              <input
                className={classInput}
                type="text"
                placeholder="ID Number ..."
                value={guarantorId}
                onChange={(e) => setGuarantorId(e.target.value.toUpperCase())}
                onClick={() => {
                  setGuarantorList(false);
                  setList(false);
                }}
              />
            )}
            {guarantorDetails && (
              <span className={classSpan}>{guarantor[0]?.idPass}</span>
            )}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label
              valid={
                guarantorDetails?.length === 0 || guarantor?.length > 0
                  ? validator
                  : !validator
              }
              label="Guarantor Relationship"
              item={guarantorRelationship}
            />
            <input
              className={classInput}
              type="text"
              placeholder="Relationship ..."
              value={guarantorRelationship}
              onChange={(e) =>
                setGuarantorRelationship(e.target.value.toUpperCase())
              }
              onClick={() => {
                setGuarantorList(false);
                setList(false);
              }}
            />
          </div>
        </div>
      </>
    );
  }

  function renderCollaterals() {
    return (
      <>
        <div className="w-full flex justify-center mr-auto ml-auto px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            Collateral List
          </label>
        </div>
        <div className="flex flex-col justify-center w-full flex-wrap -mx-3 mt-9">
          <div className="flex w-full mb-6 mr-auto ml-auto flex-wrap -mx-3">
            <div className="flex justify-center w-1/8 px-3 md:mb-0">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">
                  Nọ
                </span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">
                  Collateral Items
                </span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">
                  Value (KSHs)
                </span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/6 px-3">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">
                  Image
                </span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
          </div>
          <div>
            {memberDetail?.length > 0
              ? memberDetail[0]?.collateral?.map((item, index) => (
                  <div
                    key={index.toString()}
                    className="flex flex-wrap w-full mb-2"
                  >
                    <span className="font-bold flex justify-center w-1/8 text-gray-700 p-2 mt-1">
                      {index + 1}
                    </span>
                    <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                      <input
                        className={classInput}
                        value={item.collateralItem}
                        onChange={(e) =>
                          setCollateralItem(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                      <input
                        className={classInput}
                        value={item.collateralValue}
                        onChange={(e) =>
                          setCollateralValue(e.target.value.toUpperCase())
                        }
                      />
                    </div>
                  </div>
                ))
              : null}
            <div className="flex flex-wrap w-full mb-2">
              <div />
              <span className="font-bold flex justify-center w-1/8 text-gray-700 p-2 mt-1">
                0
              </span>
              <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                <input
                  className={classInput}
                  type="text"
                  placeholder="Item Name ..."
                  value={collateralItem}
                  onChange={(e) =>
                    setCollateralItem(e.target.value.toUpperCase())
                  }
                  onClick={() => {
                    setGuarantorList(false);
                    setList(false);
                  }}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                <input
                  className={classInput}
                  type="text"
                  placeholder="Value ..."
                  value={collateralValue}
                  onChange={(e) =>
                    setCollateralValue(e.target.value.toUpperCase())
                  }
                  onClick={() => {
                    setGuarantorList(false);
                    setList(false);
                  }}
                  required
                />
              </div>
              <div className="flex justify-center items-center ">
                <button
                  onClick={handleCollateralAdd}
                  type="button"
                  className="bg-purple-500 m-2 hover:bg-purple-700 ml-2 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                  {adding ? "Adding ..." : "Add"}
                </button>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderMaintenance() {
    return (
      <>
        <div
          onMouseEnter={() => setMemberId(memberDetail[0]?._id)}
          className="w-full md:w-full md:mx-2"
        >
          {memberDetail && (
            <>
              <div className="flex justify-center items-center px-4 py-4">
                {membersList.length !== 0 ? (
                  <div className="mt-3">
                    {memberDetail.length === 0 ? (
                      <span className="font-bold uppercase text-blue-500 text-xl mr-2">
                        Select a Member & a product
                      </span>
                    ) : memberIdentity.length === 0 ? (
                      <>
                        <span className="font-bold uppercase text-blue-500 text-xl mr-2">
                          Select a Member & a product
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-gray-500 text-xl mr-2">
                          Maintain
                        </span>
                        <span className="font-bold text-gray-500 text-xl mr-2">
                          for
                        </span>
                        <span className="font-bold text-xl mr-2">
                          {names}
                          {/* {memberDetail[0]?.surName + ' ' + memberDetail[0]?.otherNames} */}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center ml-auto mr-auto">
                    <div className="mt-3">
                      <span className="font-bold text-red-500 text-xl mr-2">
                        No
                      </span>
                      <span className="font-bold text-gray-500 text-xl mr-2">
                        members available ...
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-blue-500 text-xl mr-2">
                        They've either been maintained for or have an active
                        loan.
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Label
                    valid={validator}
                    label="Search for a Member"
                    item={memberIdentity ? memberIdentity : searchTerm}
                  />
                  <div>
                    <input
                      type="text"
                      placeholder="Search ..."
                      value={memberIdentity ? memberIdentity : searchTerm}
                      onChange={handleChange}
                      onClick={() => {
                        setMemberIdentity("");
                        setSearchGuarantorTerm("");
                        setList(true);
                        setGuarantorList(false);
                        setTimeout(() => {
                          setList(false);
                        }, 8000);
                      }}
                      className={classInput}
                    />
                    {renderList(members, searchTerm)}
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <Label
                    valid={validator}
                    label="Select a Product"
                    item={productType}
                  />
                  <div className="relative">
                    <select
                      value={productType}
                      onChange={(e) =>
                        setProductType(e.target.value.toUpperCase())
                      }
                      className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      onClick={() => {
                        setGuarantorList(false);
                        setList(false);
                      }}
                    >
                      <option className="text-gray-500">
                        Select a Product ...
                      </option>
                      {productList
                        ? productList?.map((item) => (
                            <option key={item._id}>{item.productName}</option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Label
                    valid={validator}
                    label="Amount (KShs)"
                    item={principalAmount}
                  />
                  <input
                    className={classInput}
                    id="principalAmount"
                    type="number"
                    placeholder="Principal Amount ..."
                    value={principalAmount}
                    onChange={(e) =>
                      setPrincipalAmount(e.target.value.toUpperCase())
                    }
                    onClick={() => {
                      setGuarantorList(false);
                      setList(false);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <Label
                    valid={validator}
                    label={`Loan Tenure ${
                      productDetails[0]?.repaymentCycle === "daily"
                        ? !loanTenure
                          ? 0
                          : renderDays(Number(loanTenure))[0]?.total_sundays +
                            " sundays"
                        : ""
                    }`}
                    item={loanTenure}
                  />
                  <input
                    className={classInput}
                    id="loanTenure"
                    type="number"
                    placeholder="Loan Tenure ..."
                    value={loanTenure}
                    onChange={(e) => {
                      setLoanTenure(e.target.value.toUpperCase());
                    }}
                    onClick={() => {
                      setGuarantorList(false);
                      setList(false);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* <pre>{JSON.stringify(memberDetail, undefined, 2)}</pre> */}
        <br />
      </>
    );
  }

  function renderMember() {
    return (
      <>
        {memberDetail.length !== 0 ? (
          <div>
            {productDetails.length > 0 ? null : (
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-1/4 mx-auto"
                  src={
                    memberDetail[0]?.image &&
                    urlFor(memberDetail[0]?.image).url()
                  }
                  alt="member-profile-pic"
                />
              </div>
            )}
            <div className="ml-auto mr-auto mb-3">
              <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                <List
                  title="Member Code"
                  note=""
                  content={memberDetail[0]?.memberNumber}
                />
                <List
                  title="Member No."
                  note=""
                  content={memberDetail[0]?.mobileNumber}
                />
                <List
                  title="Email"
                  note=""
                  content={memberDetail[0]?.emailAddress}
                />
                <List
                  title="ID Number"
                  note=""
                  content={memberDetail[0]?.idPass}
                />
              </ul>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  function renderProduct() {
    return (
      <>
        {productDetails.length !== 0 ? (
          <>
            <span
              key={productDetails[0]?.productCode}
              className="flex justify-center w-full text-red-500 italic"
            >
              {Number(loanTenure) > Number(productDetails[0]?.tenureMaximum)
                ? `Maximum Tenure is ${productDetails[0]?.tenureMaximum} ${productDetails[0]?.tenureMaximumChoice}`
                : null}
            </span>
            <span className="flex justify-center w-full text-red-500 italic">
              {Number(principalAmount) > Number(productDetails[0]?.maximumRange)
                ? `Maximum Principal Amount is KSHs. ${productDetails[0]?.maximumRange}`
                : null}
            </span>
            <span className="flex justify-center w-full text-red-500 italic">
              {Number(principalAmount) < Number(productDetails[0]?.minimumRange)
                ? `Minimum Principal Amount is KSHs. ${productDetails[0]?.minimumRange}`
                : null}
            </span>
            <div
              key={productDetails[0]?.productName}
              className="flex flex-wrap"
            >
              <ul className="bg-gray-100 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                {productDetails[0]?.repaymentCycle === "daily" ? (
                  <List
                    title={
                      plusSundays === "true"
                        ? "Sundays Inclusive"
                        : "Sundays Exclusive"
                    }
                    note={" (+" + renderSundays(loanTenure) + " " + "Sundays) "}
                    content={renderSundayButton()}
                  />
                ) : null}
                <List
                  title="Loan Payoff :"
                  note={payoff === "true" ? "TRUE" : "FALSE"}
                  content={renderPayoffButton()}
                />
                <List
                  title="Loan A/C Number"
                  note=""
                  content={`DC-${productDetails[0]?.productCode}-${
                    memberDetail[0]?.memberNumber.split("-")[1]
                  }`}
                />
                <List
                  title="Interest Rate"
                  note=""
                  content={`${productDetails[0]?.interestRate} %`}
                />
                <List
                  title="Interest Amount"
                  note=""
                  content={
                    productDetails[0]?.repaymentCycle === "weekly"
                      ? `KSHs. ${renderWeeklyInterestAmount(
                          productDetails[0]?.interestRate,
                          principalAmount,
                          loanTenure
                        )}`
                      : productDetails[0]?.repaymentCycle === "monthly"
                      ? `KSHs. ${renderMonthlyInterestAmount(
                          productDetails[0]?.interestRate,
                          principalAmount,
                          loanTenure
                        )}`
                      : `KSHs. ${renderDailyInterestAmount(
                          productDetails[0]?.interestRate,
                          principalAmount,
                          loanTenure
                        )}`
                  }
                />
                <List
                  title="Installments"
                  note=""
                  content={
                    productDetails[0]?.repaymentCycle === "weekly"
                      ? `KSHs. ${renderWeeklyInstallmentsAmount(
                          productDetails[0]?.interestRate,
                          principalAmount,
                          loanTenure
                        )}`
                      : productDetails[0]?.repaymentCycle === "monthly"
                      ? `KSHs. ${renderMonthlyInstallmentsAmount(
                          productDetails[0]?.interestRate,
                          principalAmount,
                          loanTenure
                        )}`
                      : `KSHs. ${renderDailyInstallmentsAmount(
                          productDetails[0]?.interestRate,
                          principalAmount,
                          loanTenure
                        )}`
                  }
                />
                <List
                  title="Repayment Cycle"
                  note=""
                  content={`${productDetails[0]?.repaymentCycle}`}
                />
                {productDetails[0]?.repaymentCycle === "daily" ? (
                  <List
                    title="Grace Period"
                    note=""
                    content={`
                      ${productDetails[0]?.gracePeriod} ${
                      productDetails[0]?.gracePeriod === "1" ? "day" : "days"
                    }
                      `}
                  />
                ) : null}
                <List
                  title="Processing Fee"
                  note=""
                  content={`
                    KSHs. ${renderProcessingFeeAmount(
                      productDetails[0]?.processingFee,
                      principalAmount
                    )}
                      `}
                />
                {productDetails[0]?.repaymentCycle === "daily" ? (
                  <List
                    title="Penalty"
                    note=""
                    content={
                      productDetails[0]?.repaymentCycle === "weekly"
                        ? `KSHs. ${renderPenaltyAmount(
                            productDetails[0]?.penalty,
                            renderWeeklyInstallmentsAmount(
                              productDetails[0]?.interestRate,
                              principalAmount,
                              loanTenure
                            )
                          )}`
                        : productDetails[0]?.repaymentCycle === "monthly"
                        ? `KSHs. ${renderPenaltyAmount(
                            productDetails[0]?.penalty,
                            renderMonthlyInstallmentsAmount(
                              productDetails[0]?.interestRate,
                              principalAmount,
                              loanTenure
                            )
                          )}`
                        : `KSHs. ${renderPenaltyAmount(
                            productDetails[0]?.penalty,
                            renderMonthlyInstallmentsAmount(
                              productDetails[0]?.interestRate,
                              principalAmount,
                              loanTenure
                            )
                          )}`
                    }
                  />
                ) : (
                  <List
                    title="Penalty"
                    note=""
                    content={
                      productDetails[0]?.penaltyTypeChoice === "amount"
                        ? `KSHs. ${productDetails[0]?.penalty}`
                        : `${productDetails[0]?.penalty} %`
                    }
                  />
                )}
              </ul>
            </div>
          </>
        ) : null}
      </>
    );
  }

  function renderButtons() {
    return (
      <>
        <div className="flex mt-8 mb-8">
          <button
            type="button"
            onClick={() => {
              show ? setShow(false) : setShow(true);
            }}
            className="flex bg-blue-500 items-center w-1/4 ml-auto mr-auto hover:bg-blue-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span className="flex items-center ml-auto mr-auto">
              {show ? "Hide" : "Add Guarantor"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleLoanSubmit();
              setValidator(true);
              renderPayOffCalculator();
            }}
            onMouseEnter={handleLoanSave}
            className="flex bg-green-500 items-center w-1/4 ml-auto mr-auto hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span className="flex items-center ml-auto mr-auto">
              {maintaining ? "Submitting ..." : "Submit"}
            </span>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 ml-auto mr-auto">
            {fields && (
              <p className="text-red-500 mt-3 text-xl transition-all duration-150 ease-in">
                Please Fill All the Required Fields!
              </p>
            )}
          </div>
        </div>
      </>
    );
  }

  function renderSuccessModal() {
    return (
      <div>
        <ModalAlert
          open={open}
          onClose={() => setOpen(false)}
          message="Navigate to Approved ..."
          title={names}
          path="/loan/approvals"
        >
          <div className="flex items-center w-full">
            <div className="bg-green-300 opacity-80 relative rounded-full p-2">
              <BsCheck2Circle className="w-10 font-bold text-black h-10" />
            </div>
            <div className="text-md p-3">
              <span className="font-bold text-3xl">
                Successfully Maintained!
              </span>
            </div>
          </div>
        </ModalAlert>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => {
        setList(false);
        setGuarantorList(false);
      }}
    >
      {renderMaintenance()}
      {show ? (
        <>
          {renderGuarantors()}
          {renderCollaterals()}
        </>
      ) : null}
      {productDetails ? renderProduct() : null}
      {memberDetail ? renderMember() : null}
      {togglePayoff ? renderPayoff() : null}
      {memberDetail ? renderButtons() : <Spinner message="Loading ..." />}
      {renderSuccessModal()}
      {/* <pre>{JSON.stringify(renderDays(Number(loanTenure)), undefined, 2)}</pre> */}
    </div>
  );
}
