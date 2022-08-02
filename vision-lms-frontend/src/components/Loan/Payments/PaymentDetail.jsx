import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../../client";
import { v4 as uuidv4 } from "uuid";
import {
  renderFirstInstallmentDate,
  renderNextInstallmentDate,
  renderCurrentInstallmentDate,
  renderPayments,
  renderDates,
} from "./Functions/functions";
import { List, Label, Spinner, ListLayout } from "../../Components";
import { BsCheck2Circle } from "react-icons/bs";
import { ModalAlert } from "../../Modals";
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

export default function PaymentDetail() {
  const { paymentId } = useParams();
  // const navigate = useNavigate();
  const [validator, setValidator] = useState(false);
  const [customerDetails, setCustomerDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productType, setProductType] = useState("");
  const [addingPayment, setAddingPayment] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState();
  const [showPage, setShowPage] = useState(false);
  const [readyGo, setReadyGo] = useState(false);
  const [title, setTitle] = useState("payment");
  const [toggleClear, setToggleClear] = useState(false);
  const [cleared, setCleared] = useState("false");
  const [toggleDefault, setToggleDefault] = useState(false);
  const [defaulted, setDefaulted] = useState("false");

  const [paymentCount, setPaymentCount] = useState("");
  const [counter, setCounter] = useState("");
  const [paymentDay, setPaymentDay] = useState("");
  const [resPayments, setResPayments] = useState("");
  const [resDates, setResDates] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [mpesaReferenceCode, setMpesaReferenceCode] = useState("");
  const [arrears, setArrears] = useState("");
  const [arrearsPaid, setArrearsPaid] = useState("");
  const [outstandingPrincipal, setOutstandingPrincipal] = useState("");
  const [outstandingInterest, setOutstandingInterest] = useState("");
  const [outstandingBalance, setOutstandingBalance] = useState("");
  const [outstandingPenalty, setOutstandingPenalty] = useState("");
  const [penaltyPaid, setPenaltyPaid] = useState("");
  const [penalty, setPenalty] = useState("");
  const [waivedPenalty, setWaivedPenalty] = useState("");
  const [awardedPenalty, setAwardedPenalty] = useState("");
  const [principalPaid, setPrincipalPaid] = useState("");
  const [interestPaid, setInterestPaid] = useState("");
  const [nextInstallmentDate, setNextInstallmentDate] = useState("");
  const [faceInstallmentDate, setFaceInstallmentDate] = useState("");
  const [faceOutstandingArrears, setFaceOutstandingArrears] = useState("");
  const [facePaidArrears, setFacePaidArrears] = useState("");
  const [faceOutstandingPenalty, setFaceOutstandingPenalty] = useState("");
  const [facePaidPenalty, setFacePaidPenalty] = useState("");
  const [faceOutstandingInterest, setFaceOutstandingInterest] = useState("");
  const [facePaidInterest, setFacePaidInterest] = useState("");
  const [faceOutstandingPrincipal, setFaceOutstandingPrincipal] = useState("");
  const [facePaidPrincipal, setFacePaidPrincipal] = useState("");
  const [faceOutstandingBalance, setFaceOutstandingBalance] = useState("");
  const [installmentDate, setInstallmentDate] = useState("");
  const [currentInstallmentDate, setCurrentInstallmentDate] = useState("");

  const fetchCustomerDetails = async () => {
    let subscription = true;
    const query = `*[_type == "maintenance" && _id == '${paymentId}']`;
    const pquery = `*[_type == "newProduct" && productName == '${productType}']`;

    if (subscription) {
      await client.fetch(pquery).then((data) => {
        setValidator(false);
        setProductDetails(data);
      });

      await client.fetch(query).then((data) => {
        setValidator(false);
        setCustomerDetails(data);
      });
    }

    return () => (subscription = false);
  };

  const renderFirstPaymentDate = (next_date) => {
    let day = next_date.split("-")[0];
    let month = next_date.split("-")[1];
    let year = next_date.split("-")[2];
    const date = new Date(year, month, day);
    date.setDate(date.getDate() + 0);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate() +
      (Number(date.getMonth() + 0) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 0) +
      "-" +
      date.getFullYear();
    return result;
  };

  const renderFirstInstallment = (next_date) => {
    let day = next_date.split("-")[0];
    let month = next_date.split("-")[1];
    let year = next_date.split("-")[2];
    const date = new Date(year, Number(month - 0), day);
    date.setDate(date.getDate() + 0);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate() +
      (Number(date.getMonth() + 1) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    return result;
  };

  let first_installment_date =
    customerDetails?.length > 0
      ? customerDetails[0]?.outstandingPenalty === "false"
        ? renderFirstPaymentDate(customerDetails[0]?.firstInstallmentDate)
        : customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.nextInstallmentDate
      : null;

  let payment_status = customerDetails[0]?.paymentDay;

  let previous_installment_date =
    customerDetails?.length > 0
      ? customerDetails[0]?.outstandingPenalty === "false"
        ? renderFirstPaymentDate(customerDetails[0]?.firstInstallmentDate)
        : customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.installmentDate
      : null;

  useEffect(() => {
    fetchCustomerDetails();
    setResPayments(
      customerDetails[0]?.outstandingPenalty === "false"
        ? renderPayments(
            Number(customerDetails[0]?.sundays),
            Number(customerDetails[0]?.interestAmount),
            Number(customerDetails[0]?.loanTenure),
            Number(customerDetails[0]?.installmentAmount),
            Number(customerDetails[0]?.principalAmount),
            Number(amountPaid),
            0,
            Number(customerDetails[0]?.penaltyAmount),
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            customerDetails[0]?.repaymentCycle,
            customerDetails[0]?.paymentDay,
            paymentDay,
            renderCurrentInstallmentDate(currentInstallmentDate),
            first_installment_date,
            first_installment_date,
            customerDetails[0]?.paymentCount,
            customerDetails[0]?.counter,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            Number(customerDetails[0]?.principalAmount)
          )
        : renderPayments(
            Number(customerDetails[0]?.sundays),
            Number(customerDetails[0]?.interestAmount),
            Number(customerDetails[0]?.loanTenure),
            Number(customerDetails[0]?.installmentAmount),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.outstandingBalance
            ),
            Number(amountPaid),
            Number(waivedPenalty),
            Number(customerDetails[0]?.penaltyAmount),
            Number(customerDetails[0]?.outstandingPenalty),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.penalty
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.arrears
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.arrearsPaid
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.outstandingInterest
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.interestPaid
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.outstandingPrincipal
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.principalPaid
            ),
            customerDetails[0]?.repaymentCycle,
            customerDetails[0]?.paymentDay,
            paymentDay,
            renderCurrentInstallmentDate(currentInstallmentDate),
            customerDetails[0]?.recentPayments[
              customerDetails[0]?.recentPayments?.length - 1
            ]?.installmentDate,
            customerDetails[0]?.recentPayments[
              customerDetails[0]?.recentPayments?.length - 1
            ]?.nextInstallmentDate,
            customerDetails[0]?.recentPayments[
              customerDetails[0]?.recentPayments?.length - 1
            ]?.paymentCount,
            customerDetails[0]?.counter,
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingArrears
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.facePaidArrears
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingPenalty
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.facePaidPenalty
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingInterest
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.facePaidInterest
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingPrincipal
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.facePaidPrincipal
            ),
            Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingBalance
            )
          )
    );
  }, [
    waivedPenalty,
    amountPaid,
    paymentId,
    productType,
    amountPaid,
    mpesaReferenceCode,
    currentInstallmentDate,
  ]);

  function roundOff(x) {
    return (
      Number(x.toString().split(".")[1]) > 0
        ? Number(x.toString().split(".")[0]) + 1
        : Number(x.toString().split(".")[0]) + 0
    ).toString();
  }

  let sundays = customerDetails[0]?.sundays;

  let payment_day = resPayments[0]?.res_payment_day;
  let face_os_arrears = resPayments[0]?.res_arrears_os;
  let face_pd_arrears = resPayments[0]?.res_arrears_pd;
  let face_os_penalty = resPayments[0]?.res_penalty_os;
  let face_pd_penalty = resPayments[0]?.res_penalty_pd;
  let face_os_interest = resPayments[0]?.res_interest_os;
  let face_pd_interest = resPayments[0]?.res_interest_pd;
  let face_os_principal = resPayments[0]?.res_principal_os;
  let face_pd_principal = resPayments[0]?.res_principal_pd;
  let principal_paid = resPayments[0]?.res_principal_paid;
  let payment_count = resPayments[0]?.res_payment_count;
  let payment_counter = resPayments[0]?.res_payment_counter;
  let awarded_penalty = resPayments[0]?.res_awarded_penalty;
  let face_os_balance = resPayments[0]?.res_balance_os;

  let next_installment_date = customerDetails
    ? customerDetails[0]?.outstandingPenalty === "false"
      ? renderNextInstallmentDate(
          customerDetails[0]?.sundays,
          first_installment_date,
          first_installment_date,
          first_installment_date,
          customerDetails[0]?.repaymentCycle,
          customerDetails[0]?.paymentCount,
          payment_day,
          paymentDay,
          payment_status,
          renderCurrentInstallmentDate(currentInstallmentDate)
        )
      : renderNextInstallmentDate(
          customerDetails[0]?.sundays,
          first_installment_date,
          previous_installment_date,
          customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.nextInstallmentDate,
          customerDetails[0]?.repaymentCycle,
          customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.paymentCount,
          payment_day,
          paymentDay,
          payment_status,
          renderCurrentInstallmentDate(currentInstallmentDate)
        )
    : null;

  let date_today = new Date();
  let date_today_face =
    date_today.getFullYear() +
    (Number(date_today.getMonth()) + 1 > 9 ? "-" : "-0") +
    (Number(date_today.getMonth()) + 1) +
    (Number(date_today.getDate()) > 9 ? "-" : "-0") +
    date_today.getDate();

  useEffect(() => {
    setPaymentDay(payment_day);
    setResDates(
      customerDetails
        ? customerDetails[0]?.outstandingPenalty === "false"
          ? renderDates(
              renderFirstInstallmentDate(first_installment_date),
              renderCurrentInstallmentDate(currentInstallmentDate),
              renderNextInstallmentDate(
                customerDetails[0]?.sundays,
                renderFirstInstallmentDate(first_installment_date),
                renderFirstInstallmentDate(first_installment_date),
                renderFirstInstallmentDate(first_installment_date),
                customerDetails[0]?.repaymentCycle,
                customerDetails[0]?.paymentCount,
                payment_day,
                paymentDay,
                payment_status,
                renderCurrentInstallmentDate(currentInstallmentDate)
              )
            )
          : renderDates(
              renderFirstInstallmentDate(first_installment_date),
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.installmentDate,
              renderNextInstallmentDate(
                customerDetails[0]?.sundays,
                renderFirstInstallmentDate(first_installment_date),
                previous_installment_date,
                customerDetails[0]?.recentPayments[
                  customerDetails[0]?.recentPayments?.length - 1
                ]?.nextInstallmentDate,
                customerDetails[0]?.repaymentCycle,
                customerDetails[0]?.recentPayments[
                  customerDetails[0]?.recentPayments?.length - 1
                ]?.paymentCount,
                payment_day,
                paymentDay,
                payment_status,
                renderCurrentInstallmentDate(currentInstallmentDate)
              )
            )
        : ""
    );
  }, [payment_day, waivedPenalty, amountPaid, currentInstallmentDate]);

  let total_amount_paid = 0;
  let total_arrears = 0;
  let total_arrears_paid = 0;
  let total_penalties_paid = 0;
  let total_interests_paid = 0;
  let total_principals_paid = 0;
  let total_outstanding_principal = 0;
  let total_outstanding_interest = 0;
  const total_payments_map = customerDetails[0]?.recentPayments;

  total_payments_map?.forEach((value) => {
    total_amount_paid += Number(value.amountPaid);
    total_arrears += 0;
    total_arrears_paid += 0;
    total_outstanding_principal += 0;
    total_outstanding_interest += 0;
    total_penalties_paid += Number(value.penaltyPaid);
    total_interests_paid += Number(value.facePaidInterest);
    total_principals_paid += 0;
  });

  // let payment_counter = 0;

  let payment_date = renderCurrentInstallmentDate(currentInstallmentDate);

  const renderPaymentDate = (next_date) => {
    let day = next_date.split("-")[0];
    let month = next_date.split("-")[1];
    let year = next_date.split("-")[2];
    const date = new Date(year, Number(month - 0), day);
    date.setDate(date.getDate() + 0);
    let result =
      (Number(date.getDate()) > 9 ? "" : "0") +
      date.getDate() +
      (Number(date.getMonth() + 1) > 9 ? "-" : "-0") +
      Number(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    return result;
  };

  payment_date = renderPaymentDate(payment_date);

  const setPayment = () => {
    setInstallmentDate(renderCurrentInstallmentDate(currentInstallmentDate));
    setArrears(resPayments[0]?.res_arrears);
    setArrearsPaid(resPayments[0]?.res_arrears_paid);
    setOutstandingPrincipal(resPayments[0]?.res_outstanding_principal);
    setOutstandingInterest(resPayments[0]?.res_outstanding_interest);
    setOutstandingBalance(
      resPayments[0]?.res_outstanding_balance === "0"
        ? (
            Number(resPayments[0]?.res_outstanding_balance) +
            Number(resPayments[0]?.res_arrears)
          ).toString()
        : resPayments[0]?.res_outstanding_balance
    );
    setInterestPaid(resPayments[0]?.res_interest_paid);
    setPrincipalPaid(resPayments[0]?.res_principal_paid);
    setDefaulted(defaulted);
    setCounter(payment_counter);
    setPaymentCount(payment_count);
    setFaceOutstandingArrears(face_os_arrears);
    setFacePaidArrears(face_pd_arrears);
    setFaceOutstandingPenalty(face_os_penalty);
    setFacePaidPenalty(face_pd_penalty);
    setFaceOutstandingInterest(face_os_interest);
    setFacePaidInterest(face_pd_interest);
    setFaceOutstandingPrincipal(face_os_principal);
    setFacePaidPrincipal(face_pd_principal);
    setFaceOutstandingBalance(
      defaulted === "true"
        ? Number(
            Number(customerDetails[0]?.principalAmount) +
              Number(customerDetails[0]?.interestAmount) -
              (Number(total_amount_paid) + Number(amountPaid))
          ).toString()
        : cleared === "true"
        ? "0"
        : face_os_balance
    );
    setNextInstallmentDate(next_installment_date);
    setAwardedPenalty(awarded_penalty ? "true" : "false");
    setFaceInstallmentDate(payment_date.toString());
    setPenalty(resPayments[0]?.res_current_penalty);
    setPenaltyPaid(resPayments[0]?.res_penalty_paid);
    setOutstandingPenalty(
      customerDetails[0]?.outstandingPenalty === "false"
        ? Number(resPayments[0]?.res_outstanding_penalty).toString()
        : Number(waivedPenalty) > 0
        ? (
            Number(customerDetails[0]?.outstandingPenalty) -
            Number(amountPaid) -
            Number(waivedPenalty)
          ).toString()
        : Number(resPayments[0]?.res_outstanding_penalty).toString()
    );
    // setOutstandingPenalty(Number(outstandingPenalty) > 0 ? outstandingPenalty : '0');

    const set_payments_dates = [
      { name: "Installment Date", value: installmentDate },
      { name: "Next Installment", value: nextInstallmentDate },
      { name: "Face Installment", value: faceInstallmentDate },
    ];

    const set_payments_results = [
      { name: "faceOutstandingArrears", value: faceOutstandingArrears },
      { name: "Amount Paid", value: amountPaid },
      { name: "O/S Arrears", value: arrears },
      { name: "Arrears Paid", value: arrearsPaid },
      { name: "O/S Penalty", value: outstandingPenalty },
      { name: "Penalty Paid", value: penaltyPaid },
      { name: "O/S Interest", value: outstandingInterest },
      { name: "Interest Paid", value: interestPaid },
      { name: "O/S Principal", value: outstandingPrincipal },
      { name: "Principal Paid", value: principalPaid },
      { name: "O/S Balance", value: outstandingBalance },
      { name: "M-PESA Code", value: mpesaReferenceCode },
    ];

    const set_payments_extra = [
      { name: "Penalty Due", value: penalty },
      { name: "Penalty Earned", value: awardedPenalty },
      { name: "Payment Counter", value: counter },
      { name: "Previous Status", value: paymentCount },
      { name: "Present Status", value: paymentDay },
      { name: "faceOutstandingArrears", value: faceOutstandingArrears },
      { name: "facePaidArrears", value: facePaidArrears },
      { name: "faceOutstandingPenalty", value: faceOutstandingPenalty },
      { name: "facePaidPenalty", value: facePaidPenalty },
      { name: "faceOutstandingInterest", value: faceOutstandingInterest },
      { name: "facePaidInterest", value: facePaidInterest },
      { name: "faceOutstandingPrincipal", value: faceOutstandingPrincipal },
      { name: "facePaidPrincipal", value: facePaidPrincipal },
      { name: "faceOutstandingBalance", value: faceOutstandingBalance },
    ];
    // console.groupCollapsed("Payment Detail");
    // console.table(set_payments_dates);
    // console.groupEnd();
    console.group("Set Payments");
    console.table(set_payments_results);
    console.table(set_payments_extra);
    console.groupEnd();
  };

  const defaultPenalty = (
    Number(customerDetails[0]?.penaltyAmount) *
    Number(customerDetails[0]?.loanTenure)
  ).toString();

  const addPayment = () => {
    if (
      amountPaid &&
      mpesaReferenceCode &&
      arrears &&
      counter &&
      paymentCount &&
      paymentDay &&
      arrearsPaid &&
      outstandingInterest &&
      outstandingPrincipal &&
      outstandingBalance &&
      outstandingPenalty &&
      principalPaid &&
      interestPaid &&
      penaltyPaid &&
      penalty &&
      awardedPenalty &&
      installmentDate &&
      faceInstallmentDate &&
      faceOutstandingArrears &&
      facePaidArrears &&
      faceOutstandingPenalty &&
      facePaidPenalty &&
      faceOutstandingInterest &&
      facePaidInterest &&
      faceOutstandingPrincipal &&
      facePaidPrincipal &&
      faceOutstandingBalance &&
      nextInstallmentDate
    ) {
      setAddingPayment(true);
      client
        .patch(paymentId)
        .set({
          outstandingPenalty:
            outstandingPenalty === "0"
              ? defaulted === "true"
                ? defaultPenalty
                : outstandingPenalty
              : outstandingPenalty,
          arrears:
            faceOutstandingBalance === "0"
              ? faceOutstandingArrears === "0"
                ? "false"
                : "0"
              : "0",
          paymentDay: paymentDay,
          counter: counter,
          paymentCount: paymentCount,
          defaulted: defaulted,
          cleared: cleared,
        })
        .commit()
        .then((update) => {
          console.table(update);
        });
      client
        .patch(paymentId)
        .setIfMissing({ recentPayments: [] })
        .insert("after", "recentPayments[-1]", [
          {
            amountPaid,
            mpesaReferenceCode,
            arrears,
            counter,
            arrearsPaid,
            paymentCount,
            paymentDay,
            outstandingInterest,
            outstandingPrincipal,
            outstandingBalance,
            outstandingPenalty,
            principalPaid,
            interestPaid,
            penaltyPaid,
            penalty,
            awardedPenalty,
            installmentDate,
            faceInstallmentDate,
            faceOutstandingArrears,
            facePaidArrears,
            faceOutstandingPenalty,
            facePaidPenalty,
            faceOutstandingInterest,
            facePaidInterest,
            faceOutstandingPrincipal,
            facePaidPrincipal,
            faceOutstandingBalance,
            nextInstallmentDate,
            _key: uuidv4(),
          },
        ])
        .commit()
        .then(() => {
          fetchCustomerDetails();
          setAmountPaid("");
          setWaivedPenalty("");
          setCounter(0);
          setMpesaReferenceCode("");
          setReadyGo(false);
          setOutstandingBalance("");
          setOutstandingPenalty("");
          setOutstandingPrincipal("");
          setOutstandingInterest("");
          setPrincipalPaid("");
          setArrearsPaid("");
          setArrears("");
          setDefaulted("false");
          setCleared("false");
          setResDates("");
          setResPayments("");
          setPaymentCount("");
          setPaymentDay("");
          setInterestPaid("");
          setPenaltyPaid("");
          setPenalty("");
          setAwardedPenalty("");
          setInstallmentDate("");
          setFaceInstallmentDate("");
          setFaceOutstandingArrears("");
          setFacePaidArrears("");
          setFaceOutstandingPenalty("");
          setFacePaidPenalty("");
          setFaceOutstandingInterest("");
          setFacePaidInterest("");
          setFaceOutstandingPrincipal("");
          setFacePaidPrincipal("");
          setFaceOutstandingBalance("");
          setNextInstallmentDate("");
          setCurrentInstallmentDate("");
          setAddingPayment(false);
          setOpen(true);
          setValidator(false);
        });
    }
    setValidator(true);
  };

  const headers = [
    "Payment Date",
    "Amount Paid",
    "O/S Arrears",
    "Arrears Paid",
    "O/S Penalty",
    "Penalty Paid",
    "O/S Interest",
    "Interest Paid",
    "O/S Principal",
    "Principal Paid",
    "O/S Balance",
    "M-PESA",
  ];

  const TableData = ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-semibold text-gray-900">{children}</div>
    </td>
  );

  const toggleClass = "transform translate-x-6";

  function renderClearButton() {
    return (
      //   Switch Container
      <div
        className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${
          !toggleClear ? "bg-gray-400" : "bg-green-500"
        } rounded-full p-1 cursor-pointer`}
        onClick={() => {
          setToggleClear(!toggleClear);
          setCleared(!toggleClear ? "true" : "false");
          setFaceOutstandingBalance(!toggleClear ? "0" : face_os_balance);
          setAmountPaid(!toggleClear ? "0" : amountPaid);
          setMpesaReferenceCode(!toggleClear ? "NA" : mpesaReferenceCode);
          setReadyGo(!toggleClear ? true : false);
        }}
      >
        {/* Switch */}
        <div
          className={
            `${
              !toggleClear ? "bg-green-100" : "bg-red-100"
            } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md ease-in-out duration-500` +
            (toggleClear ? null : toggleClass)
          }
        ></div>
      </div>
    );
  }

  function renderDefaultButton() {
    return (
      //   Switch Container
      <div
        className={`md:w-14 md:h-7 w-12 h-6 flex items-center ${
          !toggleDefault ? "bg-gray-400" : "bg-green-500"
        } rounded-full p-1 cursor-pointer`}
        onClick={() => {
          setToggleDefault(!toggleDefault);
          setDefaulted(!toggleDefault ? "true" : "false");
        }}
      >
        {/* Switch */}
        <div
          className={
            `${
              !toggleDefault ? "bg-green-100" : "bg-red-100"
            } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md ease-in-out duration-500` +
            (toggleDefault ? null : toggleClass)
          }
        ></div>
      </div>
    );
  }

  function renderLoanDetails() {
    return (
      <>
        <div>
          <div className="ml-auto mr-auto mb-3">
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <List
                title="Product Name"
                note=""
                content={customerDetails[0]?.productType}
              />
              <List
                title="Loan A/C Number"
                note=""
                content={`DC-${customerDetails[0]?.loanAccNumber}`}
              />
              <List
                title="Principal Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.principalAmount}`}
              />
              <List
                title="Loan Tenure"
                note=""
                content={`${customerDetails[0]?.loanTenure} ${customerDetails[0]?.repaymentCycle}`}
              />
              <List
                title="Interest Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.interestAmount}`}
              />
              <List
                title="Installment Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.installmentAmount}`}
              />
              <List
                title="Processing Fee Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.processingFee}`}
              />
              <List
                title="Penalty"
                note=""
                content={`${
                  productDetails[0]?.penaltyTypeChoice === "amount"
                    ? `KSHs. ${productDetails[0]?.penalty}`
                    : `${productDetails[0]?.penalty} %`
                }`}
              />
              <List
                title="Penalty Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.penaltyAmount}`}
              />
              <List
                title="Penalty Payment"
                note=""
                content={`${
                  productDetails[0]?.penaltyPaymentChoice === "perInstallment"
                    ? "Per Installment"
                    : productDetails[0]?.penaltyPaymentChoice ===
                      "lastInstallment"
                    ? "Last Installment"
                    : productDetails[0]?.penaltyTypeChoice === "amount"
                    ? "Each Installment"
                    : "Percentage of Principal"
                }`}
              />
              <List
                title="Repayment Cycle"
                note=""
                content={`Paid ${productDetails[0]?.repaymentCycle}`}
              />
              <List
                title="Grace Period"
                note=""
                content={`${productDetails[0]?.gracePeriod} day`}
              />
            </ul>
          </div>
          <div className="mb-8" />
        </div>
      </>
    );
  }

  function renderReview() {
    return (
      <>
        <div>
          <div className="ml-auto mr-auto mb-3">
            <div className="flex items-center">
              <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                <List
                  title="Loan Ref Number"
                  note=""
                  content={`DC-${customerDetails[0]?.referenceNumber}`}
                />
                <List
                  title="First Installment Date"
                  note=""
                  content={`${
                    customerDetails
                      ? renderFirstInstallment(
                          customerDetails[0]?.firstInstallmentDate
                        )
                      : null
                  }`}
                />
                {resDates ? (
                  <>
                    {customerDetails[0]?.outstandingPenalty ===
                    "false" ? null : !resDates ? null : (
                      <List
                        title="Previous Installment Date"
                        note=""
                        content={`${resDates[0]?.res_prev_installment}`}
                      />
                    )}
                    {currentInstallmentDate ? (
                      <>
                        {customerDetails[0]?.outstandingPenalty === "false" ? (
                          <List
                            title="Next Installment Date"
                            note=""
                            content={`${
                              customerDetails
                                ? renderFirstInstallment(next_installment_date)
                                : null
                            }`}
                          />
                        ) : Number(
                            customerDetails[0]?.recentPayments[
                              customerDetails[0]?.recentPayments?.length - 1
                            ]?.faceOutstandingBalance
                          ) === 0 ? null : (
                          <List
                            title="Next Installment Date"
                            note=""
                            content={`${
                              customerDetails
                                ? renderFirstInstallment(next_installment_date)
                                : null
                            }`}
                          />
                        )}
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    {customerDetails[0]?.outstandingPenalty ===
                    "false" ? null : (
                      <List
                        title="Previous Installment Date"
                        note=""
                        content={`${
                          customerDetails[0]?.recentPayments[
                            customerDetails[0]?.recentPayments?.length - 1
                          ]?.faceInstallmentDate
                        }`}
                      />
                    )}
                  </>
                )}
                <>
                  {customerDetails[0]?.cleared === "true" ? null : (
                    <List
                      title="Clear Loan :"
                      note={cleared === "true" ? "TRUE" : "FALSE"}
                      content={renderClearButton()}
                    />
                  )}
                </>
                <>
                  {customerDetails[0]?.defaulted === "true" ? null : (
                    <List
                      title="Loan Default :"
                      note={defaulted === "true" ? "TRUE" : "FALSE"}
                      content={renderDefaultButton()}
                    />
                  )}
                </>
              </ul>
            </div>
            <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
              <List
                title="Principal Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.principalAmount}`}
              />
              <List
                title="Installment Amount"
                note=""
                content={`KSHs. ${customerDetails[0]?.installmentAmount}`}
              />
              <List
                title="Interest Amount"
                note={`[KSHs. ${roundOff(
                  customerDetails[0]?.interestAmount /
                    customerDetails[0]?.loanTenure
                )} per installment]`}
                content={`KSHs. ${customerDetails[0]?.interestAmount}`}
              />
              <List
                title="Loan Tenure"
                note=""
                content={`${customerDetails[0]?.loanTenure} ${customerDetails[0]?.repaymentCycle}`}
              />
            </ul>
          </div>
          <br />
        </div>
      </>
    );
  }

  const classUl =
    "bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm";

  function renderCustomerDetails() {
    return (
      <>
        <div>
          <div className="ml-auto mr-auto mb-3">
            <ul className={classUl}>
              <List
                title="Member Code"
                note=""
                content={`DC-${customerDetails[0]?.loanAccNumber}`}
              />
              <List
                title="Mobile No."
                note=""
                content={`${customerDetails[0]?.memberPhoneNumber}`}
              />
              {customerDetails[0]?.memberEmail === "NA" ? null : (
                <List
                  title="Email"
                  note=""
                  content={`${customerDetails[0]?.memberEmail}`}
                />
              )}
              <List
                title="ID Number"
                note=""
                content={`${customerDetails[0]?.memberIdNumber}`}
              />
            </ul>
            <ul className={classUl}>
              <List
                title="Guarantor Name"
                note=""
                content={`${customerDetails[0]?.guarantorName}`}
              />
              <List
                title="Guarantor Phone"
                note=""
                content={`${customerDetails[0]?.guarantorPhone}`}
              />
              <List
                title="Guarantor ID"
                note=""
                content={`${customerDetails[0]?.guarantorId}`}
              />
            </ul>
            <ul className={classUl}>
              <List
                title="Loan Office Name"
                note=""
                content={`${customerDetails[0]?.loanOfficerName}`}
              />
              <List
                title="Loan Officer Phone"
                note=""
                content={`${customerDetails[0]?.loanOfficerPhoneNumber}`}
              />
            </ul>
          </div>
          <br />
        </div>
      </>
    );
  }

  function renderRecentPayments() {
    return (
      <ListLayout title="Payments List" headers={headers} type="payments">
        <tbody className="bg-white divide-y divide-gray-200">
          {customerDetails
            ? customerDetails[0]?.recentPayments?.map((payment, index) => (
                <tr
                  // onClick={() => {
                  //   navigate(`/loan/approvals/${payment._id}`);
                  // }}
                  key={index}
                  className="hover:bg-gray-300 cursor-pointer"
                >
                  <TableData>{payment?.faceInstallmentDate}</TableData>
                  <TableData>{payment?.amountPaid}</TableData>
                  <TableData>{payment?.faceOutstandingArrears}</TableData>
                  <TableData>{payment?.facePaidArrears}</TableData>
                  <TableData>{payment?.faceOutstandingPenalty}</TableData>
                  <TableData>{payment?.facePaidPenalty}</TableData>
                  <TableData>{payment?.faceOutstandingInterest}</TableData>
                  <TableData>{payment?.facePaidInterest}</TableData>
                  <TableData>{payment?.faceOutstandingPrincipal}</TableData>
                  <TableData>{payment?.facePaidPrincipal}</TableData>
                  <TableData>{payment?.faceOutstandingBalance}</TableData>
                  <TableData>{payment?.mpesaReferenceCode}</TableData>
                </tr>
              ))
            : null}
          {
            <tr
              className={`
                        ${
                          customerDetails[0]?.outstandingPenalty === "false"
                            ? amountPaid
                              ? Number(face_os_penalty) > 0
                                ? "hover:bg-red-300"
                                : "hover:bg-blue-300"
                              : null
                            : amountPaid
                            ? Number(face_os_penalty) > 0
                              ? "hover:bg-red-300"
                              : Number(face_os_arrears) > 0
                              ? "hover:bg-amber-300"
                              : "hover:bg-blue-300"
                            : Number(
                                customerDetails[0]?.recentPayments[
                                  customerDetails[0]?.recentPayments?.length - 1
                                ]?.faceOutstandingPenalty
                              ) > 0
                            ? "hover:bg-orange-300"
                            : Number(
                                customerDetails[0]?.recentPayments[
                                  customerDetails[0]?.recentPayments?.length - 1
                                ]?.faceOutstandingArrears
                              ) > 0
                            ? "hover:bg-amber-300"
                            : "hover:bg-teal-300"
                        } font-semibold ${
                customerDetails[0]?.outstandingPenalty === "false"
                  ? amountPaid
                    ? Number(face_os_penalty) > 0
                      ? "bg-red-200"
                      : "bg-blue-200"
                    : null
                  : amountPaid
                  ? Number(face_os_penalty) > 0
                    ? "bg-red-200"
                    : Number(face_os_arrears) > 0
                    ? "bg-amber-200"
                    : "bg-blue-200"
                  : Number(
                      customerDetails[0]?.recentPayments[
                        customerDetails[0]?.recentPayments?.length - 1
                      ]?.faceOutstandingPenalty
                    ) > 0
                  ? "bg-orange-200"
                  : Number(
                      customerDetails[0]?.recentPayments[
                        customerDetails[0]?.recentPayments?.length - 1
                      ]?.faceOutstandingArrears
                    ) > 0
                  ? "bg-amber-200"
                  : "bg-teal-200"
              } ${amountPaid ? null : "hidden"}`}
            >
              <TableData>
                {currentInstallmentDate ? (
                  <div className="ml-0">{currentInstallmentDate}</div>
                ) : (
                  <div className="ml-0">{date_today_face}</div>
                )}
              </TableData>
              <TableData>{amountPaid ? amountPaid : "0"}</TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_os_arrears
                      : "0"
                    : amountPaid
                    ? face_os_arrears
                    : customerDetails[0]?.repaymentCycle === "days"
                    ? Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.faceOutstandingArrears
                      )
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.faceOutstandingArrears
                      ) +
                      Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.outstandingPenalty
                      )
                  : "0"}
              </TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_pd_arrears
                      : "0"
                    : amountPaid
                    ? face_pd_arrears
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.facePaidArrears
                      )
                  : "0"}
              </TableData>
              <TableData>{resPayments[0]?.res_outstanding_penalty}</TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_pd_penalty
                      : "0"
                    : amountPaid
                    ? face_pd_penalty
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.facePaidPenalty
                      )
                  : "0"}
              </TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_os_interest
                      : "0"
                    : amountPaid
                    ? face_os_interest
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.faceOutstandingInterest
                      )
                  : "0"}
              </TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_pd_interest
                      : "0"
                    : amountPaid
                    ? face_pd_interest
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.facePaidInterest
                      )
                  : "0"}
              </TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_os_principal
                      : "0"
                    : amountPaid
                    ? face_os_principal
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.faceOutstandingPrincipal
                      )
                  : "0"}
              </TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_pd_principal
                      : "0"
                    : amountPaid
                    ? face_pd_principal
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.facePaidPrincipal
                      )
                  : "0"}
              </TableData>
              <TableData>
                {customerDetails
                  ? customerDetails[0]?.outstandingPenalty === "false"
                    ? amountPaid
                      ? face_os_balance
                      : "0"
                    : amountPaid
                    ? face_os_balance
                    : Number(
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.faceOutstandingBalance
                      )
                  : "0"}
              </TableData>
              <TableData>
                {readyGo ? renderAddButton() : principal_paid}
              </TableData>
            </tr>
          }
          {customerDetails[0]?.outstandingPenalty === "false" ? null : (
            <tr className="hover:bg-green-300 cursor-pointer font-semibold bg-green-200">
              <TableData>
                <div className="ml-0">TOTAL</div>
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? amountPaid
                  : total_amount_paid}
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : total_arrears_paid}
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : total_arrears}
              </TableData>
              {Number(waivedPenalty) > 0 ? (
                <>
                  <TableData>
                    {resPayments[0]?.res_outstanding_penalty}
                  </TableData>
                  <TableData>
                    {customerDetails
                      ? customerDetails[0]?.outstandingPenalty === "false"
                        ? amountPaid
                          ? face_pd_penalty
                          : "0"
                        : amountPaid
                        ? face_pd_penalty
                        : Number(
                            customerDetails[0]?.recentPayments[
                              customerDetails[0]?.recentPayments?.length - 1
                            ]?.facePaidPenalty
                          )
                      : "0"}
                  </TableData>
                </>
              ) : (
                <>
                  {Number(
                    customerDetails[0]?.recentPayments[
                      customerDetails[0]?.recentPayments?.length - 1
                    ]?.faceOutstandingBalance
                  ) > 0 ? (
                    <>
                      <TableData>
                        {customerDetails[0]?.outstandingPenalty === "false"
                          ? "0"
                          : customerDetails[0]?.recentPayments[
                              customerDetails[0]?.recentPayments?.length - 1
                            ]?.outstandingPenalty}
                      </TableData>
                      <TableData>
                        {customerDetails[0]?.outstandingPenalty === "false"
                          ? "0"
                          : customerDetails[0]?.recentPayments[
                              customerDetails[0]?.recentPayments?.length - 1
                            ]?.facePaidPenalty}
                      </TableData>
                    </>
                  ) : (
                    <>
                      <TableData>
                        {customerDetails
                          ? customerDetails[0]?.outstandingPenalty === "false"
                            ? amountPaid
                              ? face_os_penalty
                              : "0"
                            : amountPaid
                            ? face_os_penalty
                            : Number(
                                customerDetails[0]?.recentPayments[
                                  customerDetails[0]?.recentPayments?.length - 1
                                ]?.outstandingPenalty
                              )
                          : "0"}
                      </TableData>
                      <TableData>
                        {customerDetails
                          ? customerDetails[0]?.outstandingPenalty === "false"
                            ? amountPaid
                              ? face_pd_penalty
                              : "0"
                            : amountPaid
                            ? face_pd_penalty
                            : Number(
                                customerDetails[0]?.recentPayments[
                                  customerDetails[0]?.recentPayments?.length - 1
                                ]?.facePaidPenalty
                              )
                          : "0"}
                      </TableData>
                    </>
                  )}
                </>
              )}
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : total_outstanding_interest}
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : customerDetails[0]?.recentPayments[
                      customerDetails[0]?.recentPayments?.length - 1
                    ]?.facePaidInterest}
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : total_outstanding_principal}
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : customerDetails[0]?.recentPayments[
                      customerDetails[0]?.recentPayments?.length - 1
                    ]?.facePaidPrincipal}
              </TableData>
              <TableData>
                {customerDetails[0]?.outstandingPenalty === "false"
                  ? "0"
                  : customerDetails[0]?.recentPayments[
                      customerDetails[0]?.recentPayments?.length - 1
                    ]?.faceOutstandingBalance}
              </TableData>
              {Number(waivedPenalty) > 0 ? (
                <TableData>
                  {amountPaid
                    ? mpesaReferenceCode
                      ? mpesaReferenceCode
                      : `+ ${
                          customerDetails[0]?.recentPayments[
                            customerDetails[0]?.recentPayments?.length - 1
                          ]?.principalPaid
                        }`
                    : renderAddButton()}
                </TableData>
              ) : (
                <TableData>
                  {customerDetails[0]?.outstandingPenalty === "false"
                    ? mpesaReferenceCode
                    : `+ ${
                        customerDetails[0]?.recentPayments[
                          customerDetails[0]?.recentPayments?.length - 1
                        ]?.principalPaid
                      }`}
                </TableData>
              )}
            </tr>
          )}
        </tbody>
      </ListLayout>
    );
  }

  const classInput =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";
  const val =
    customerDetails[0]?.outstandingPenalty === "false"
      ? validator
      : Number(
          customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.faceOutstandingBalance
        ) > 0
      ? validator
      : !validator;
  const classContains = "w-full md:w-1/4 px-3";
  const classContainer = "w-full md:w-1/3 px-3";
  const classContained =
    customerDetails[0]?.outstandingPenalty === "false"
      ? classContainer
      : Number(
          customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.faceOutstandingBalance
        ) === 0
      ? Number(
          customerDetails[0]?.recentPayments[
            customerDetails[0]?.recentPayments?.length - 1
          ]?.outstandingPenalty
        ) > 0
        ? classContains
        : classContainer
      : classContainer;

  function renderWaiver() {
    return (
      <>
        {customerDetails[0]?.outstandingPenalty === "false" ? null : (
          <>
            {Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingBalance
            ) > 0 ? null : (
              <div className={classContained}>
                <Label
                  valid={val}
                  label={
                    amountPaid ? "Amount To Waive" : "Enter Amount To Waive"
                  }
                  item={amountPaid}
                />
                <input
                  className={classInput}
                  type="number"
                  placeholder="Amount to Waive ..."
                  value={waivedPenalty}
                  onChange={(e) => {
                    setWaivedPenalty(e.target.value.toUpperCase());
                    setAmountPaid("0");
                  }}
                />
              </div>
            )}
          </>
        )}
      </>
    );
  }

  function renderLoanPayments() {
    return (
      <>
        <div
          onClick={() => {
            setShowPage(false);
            setProductType(customerDetails[0]?.productType);
            setPage(renderReview());
            setTitle("payment");
            fetchCustomerDetails();
          }}
          onMouseEnter={() => {
            setShowPage(false);
            setProductType(customerDetails[0]?.productType);
            setPage(renderReview());
            setTitle("payment");
            fetchCustomerDetails();
          }}
        >
          <div className="font-bold mt-5 flex justify-center w-full text-2xl">
            <span className="text-gray-500">Payments for </span>
            <span className="text-gray-700 ml-3">
              {customerDetails[0]?.memberNames}
            </span>
          </div>
          <br />
          <div className="ml-auto mr-auto mb-3">
            <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
              <div className={classContained}>
                <Label
                  valid={val}
                  label={`Current Installment Date`}
                  item={currentInstallmentDate}
                />
                <input
                  className={classInput}
                  type="date"
                  value={currentInstallmentDate}
                  onChange={(e) => {
                    setCurrentInstallmentDate(e.target.value);
                  }}
                />
              </div>
              <div className={classContained}>
                <Label
                  valid={val}
                  label={`Amount Paid (KShs)`}
                  item={amountPaid}
                />
                <input
                  className={classInput}
                  type="number"
                  placeholder="Paid Amount ..."
                  value={amountPaid}
                  onChange={(e) => {
                    setAmountPaid(e.target.value);
                    setWaivedPenalty("0");
                  }}
                />
              </div>
              {customerDetails[0]?.outstandingPenalty === "false"
                ? null
                : Number(
                    customerDetails[0]?.recentPayments[
                      customerDetails[0]?.recentPayments?.length - 1
                    ]?.faceOutstandingBalance
                  ) === 0
                ? Number(
                    customerDetails[0]?.recentPayments[
                      customerDetails[0]?.recentPayments?.length - 1
                    ]?.outstandingPenalty
                  ) > 0
                  ? renderWaiver()
                  : null
                : null}
              <div className={classContained}>
                <Label
                  valid={val}
                  label={`M-PESA Code`}
                  item={mpesaReferenceCode}
                />
                <input
                  className={classInput}
                  type="string"
                  placeholder="M-PESA Code ..."
                  maxLength={10}
                  value={mpesaReferenceCode}
                  onChange={(e) => {
                    setMpesaReferenceCode(e.target.value.toUpperCase());
                    setTimeout(() => {
                      setReadyGo(true);
                    }, 5000);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderLoanPaid() {
    return (
      <>
        <div
          onClick={() => {
            setProductType(customerDetails[0]?.productType);
            setAmountPaid("");
            setMpesaReferenceCode("");
            setReadyGo(false);
            setCurrentInstallmentDate("");
            fetchCustomerDetails();
          }}
          onMouseEnter={() => {
            setProductType(customerDetails[0]?.productType);
            setAmountPaid("");
            setMpesaReferenceCode("");
            setReadyGo(false);
            setCurrentInstallmentDate("");
            fetchCustomerDetails();
          }}
        >
          <div className="font-bold mt-5 flex justify-center w-full text-2xl">
            <span className="text-gray-500">Loan Review for </span>
            <span className="text-gray-700 ml-3">
              {customerDetails[0]?.memberNames}
            </span>
          </div>
          <br />
        </div>
      </>
    );
  }

  function renderAddButton() {
    return (
      <>
        <span
          className="bg-green-600 text-white p-2 cursor-pointer rounded-lg"
          onClick={() => {
            setPayment();
            addPayment();
            setTimeout(() => {
              fetchCustomerDetails();
            }, 5000);
          }}
          onMouseEnter={() => {
            setPayment();
          }}
        >
          {addingPayment ? "Adding ..." : "Add Payment"}
        </span>
      </>
    );
  }

  function renderSuccessModal() {
    return (
      <div>
        <ModalAlert
          open={open}
          onClose={() => setOpen(false)}
          message="Payment Successfully Added ..."
          title={customerDetails[0]?.memberNames}
          type="payment"
        >
          <div className="flex items-center w-full">
            <div className="bg-green-300 opacity-80 relative rounded-full p-2">
              <BsCheck2Circle className="w-10 font-bold text-black h-10" />
            </div>
            <div className="text-md p-3">
              <span className="font-bold text-3xl">Successfully Paid!</span>
            </div>
          </div>
        </ModalAlert>
      </div>
    );
  }

  const Nav = ({ nav_page, nav_title, nav_header }) => {
    const isActiveStyle =
      "flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 mb-2 bg-indigo-500 border-b-2 rounded-lg border-indigo-100 sm:px-4 -px-1 dark:border-indigo-100 dark:text-indigo-100 whitespace-nowrap focus:outline-none";
    const isNotActiveStyle =
      "flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400";
    return (
      <button
        onClick={nav_page}
        className={title === nav_title ? isActiveStyle : isNotActiveStyle}
      >
        <span className="mx-1 text-sm font-semibold sm:text-base">
          {" "}
          {nav_header}{" "}
        </span>
      </button>
    );
  };

  function renderNav() {
    return (
      <div className="flex justify-center items-center mt-5 p-5 rounded-lg">
        <Nav
          nav_page={() => {
            setShowPage(true);
            setPage(renderCustomerDetails());
            setTitle("personal");
          }}
          nav_title="personal"
          nav_header="Personal Details"
        />
        <Nav
          nav_page={() => {
            setShowPage(true);
            setPage(renderReview());
            setTitle("payment");
          }}
          nav_title="payment"
          nav_header="Payment Details"
        />
        <Nav
          nav_page={() => {
            setShowPage(true);
            setPage(renderLoanDetails());
            setTitle("loan");
          }}
          nav_title="loan"
          nav_header="Loan Details"
        />
      </div>
    );
  }
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
              customerDetails[0]?.outstandingPenalty === "false"
                ? chart_data
                : customerDetails[0]?.recentPayments
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
        fetchCustomerDetails();
        setProductType(customerDetails[0]?.productType);
      }}
      onMouseEnter={() => {
        fetchCustomerDetails();
        setProductType(customerDetails[0]?.productType);
      }}
    >
      {customerDetails[0]?.disbursed === "true" ? (
        <>
          {customerDetails[0]?.outstandingPenalty === "false"
            ? renderLoanPayments()
            : Number(
                customerDetails[0]?.recentPayments[
                  customerDetails[0]?.recentPayments?.length - 1
                ]?.faceOutstandingBalance
              ) +
                Number(
                  customerDetails[0]?.recentPayments[
                    customerDetails[0]?.recentPayments?.length - 1
                  ]?.outstandingPenalty
                ) >
              0
            ? customerDetails[0]?.defaulted === "true"
              ? renderLoanPaid()
              : renderLoanPayments()
            : renderLoanPaid()}
          {renderRecentPayments()}
          {renderSuccessModal()}
          {renderNav()}
          {showPage ? page : renderReview()}
          {customerDetails[0]?.outstandingPenalty === "false" ? (
            <pre>{JSON.stringify(customerDetails, undefined, 2)}</pre>
          ) : Number(
              customerDetails[0]?.recentPayments[
                customerDetails[0]?.recentPayments?.length - 1
              ]?.faceOutstandingBalance
            ) +
              Number(
                customerDetails[0]?.recentPayments[
                  customerDetails[0]?.recentPayments?.length - 1
                ]?.outstandingPenalty
              ) >
            0 ? (
            customerDetails[0]?.defaulted === "true" ? (
              <div className="charts border border-gray-400 rounded-lg">
                <Charts title="Chart Title" aspect={2 / 1} />
              </div>
            ) : (
              <pre>{JSON.stringify(customerDetails, undefined, 2)}</pre>
            )
          ) : (
            <div className="charts border border-gray-400 rounded-lg">
              <Charts title="Chart Title" aspect={2 / 1} />
            </div>
          )}
        </>
      ) : (
        <Spinner message="Loading Member Details ..." />
      )}
    </div>
  );
}
