import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import { client, urlFor } from '../../client';
import { productDetailQuery } from '../../utils/data';

import Spinner from '../Components/Spinner';

export default function CreateLoan() {
  const navigate = useNavigate();
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);

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

  const [interestAmount, setInterestAmount] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [processingFee, setProcessingFee] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");

  const [guarantorsList, setGuarantorsList] = useState('');
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorId, setGuarantorId] = useState('');
  const [guarantorDetails, setGuarantorDetails] = useState('');
  const [guarantor, setGuarantor] = useState('');
  const [guarantorRelationship, setGuarantorRelationship] = useState('');
  const [guarantorPhone, setGuarantorPhone] = useState('');

  const [addingCollaterals, setAddingCollaterals] = useState(false);
  const [collateralList, setCollateralList] = useState([{ collateral: "", value: "", image: "" }]);

  const [maintained, setMaintained] = useState('');
  const [approved, setApproved] = useState('');
  const [disbursed, setDisbursed] = useState('');

  const id = memberIdentity.split(' ')[0]
  const sname = memberIdentity.split(' ')[1]
  const oname = memberIdentity.split(' ')[2] + ' ' + memberIdentity.split(' ')[3]
  const names = sname + ' ' + oname

  const gid = guarantorDetails.split(' ')[0]
  const gsname = guarantorDetails.split(' ')[1]
  const goname = guarantorDetails.split(' ')[2] + ' ' + guarantorDetails.split(' ')[3]
  const gnames = gsname + ' ' + goname

  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff' || selectedFile.type === 'image/jpg') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };
  useEffect(() => {
    const membersListQuery = '*[_type == "member" && maintained == "false"]';
    const memberQuery = `*[_type == "member" && memberNumber match '${id}' || personalDetails.surName match '${sname}' || personalDetails.otherNames match '${oname}']`;
    const productListQuery = '*[_type == "newProduct"]';
    const guarantorsListQuery = '*[_type == "member"]';
    const guarantorQuery = `*[_type == "member" && memberNumber match '${gid}' || personalDetails.surName match '${gsname}' || personalDetails.otherNames match '${goname}']`;
    // const productTypeQuery = productDetailQuery(productType);
    const productTypeQuery = `*[_type == "newProduct" && productName == "${productType}"]`;

    client.fetch(membersListQuery).then((data) => {
      // setLoading(true);
      setMembersList(data);
      // setLoading(false);
    });

    client.fetch(guarantorsListQuery).then((data) => {
      setGuarantorsList(data);
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

    if (productTypeQuery) {
      client.fetch(productTypeQuery).then((data) => {
        setProductDetails(data);
      });
    }

  }, [productType, id, sname, oname, names, gid, goname, gsname]);

  function renderSundays(tenure) {
    var day = '';
    var sundays = 0;
    var counter = 0;
    while (counter < tenure + 1) {
      const date = new Date();
      date.setDate(date.getDate() + counter);
      day = date.getDay();
      if (day === 0) {
        sundays += 1
      }
      counter++;
    }
    return sundays;
  }

  // console.log('sundays', renderSundays(Number(loanTenure)))

  // console.log(guarantor)
  function renderDailyInterestAmount(rate, principal, tenure) {
    return roundOff(((rate * principal) / 3000) * tenure);
  }

  function renderWeeklyInterestAmount(rate, principal, tenure) {
    return roundOff(((rate * principal) / 400) * tenure);
  }

  function renderMonthlyInterestAmount(rate, principal, tenure) {
    return roundOff(((rate * principal) / 100) * tenure);
  }

  // Note Sundays
  function renderDailyInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = ((rate * principal) / 3000 * tenure);
    return roundOff((Number(principalAmount) + Number(principal)) / (Number(tenure) - Number(renderSundays(Number(tenure))))); // - sundays
  }

  function renderWeeklyInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = (((rate * principal) / 400) * tenure);
    return roundOff((Number(principalAmount) + Number(principal)) / Number(tenure));
  }

  function renderMonthlyInstallmentsAmount(rate, principal, tenure) {
    let principalAmount = (((rate * principal) / 100) * tenure);
    return roundOff((Number(principalAmount) + Number(principal)) / tenure);
  }

  function renderProcessingFeeAmount(feePercentage, principal) {
    let procFee = roundOff((feePercentage / 100) * principal);
    return (procFee < 301 ? '300' : procFee)
  }

  function renderPenaltyAmount(penaltyPercentage, rate, principal, tenure) {
    return roundOff(((((rate * principal) / 100) + Number(principal)) / tenure) * (penaltyPercentage / 100));
  }

  function roundOff(x) {
    return ((Number((x).toString().split('.')[1]) > 0 ? Number((x).toString().split('.')[0]) + 1 : Number((x).toString().split('.')[0]) + 0).toString())
  }

  // const ideaName = 'Member Details';
  // if (loading) {
  //   return (
  //     <Spinner message={`Loading ${ideaName} ...`} />
  //   );
  // }
  // if (membersList?.length === 0) {
  //   return (
  //     <div className="flex flex-col justify-center items-center ml-auto mr-auto">
  //       <div className="mt-3">
  //         <span className="font-bold text-red-500 text-xl mr-2">
  //           No
  //         </span>
  //         <span className="font-bold text-gray-500 text-xl mr-2">
  //           members available ...
  //         </span>
  //       </div>
  //       <div>
  //         <span className="font-bold text-blue-500 text-xl mr-2">
  //           They've either been maintained for or have an active loan.
  //         </span>
  //       </div>
  //     </div>
  //   )
  // }

  function sundays(year, month) {

    var day, counter, date;

    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === month) {
      if (date.getDay() === 0) { // Sun=0, Mon=1, Tue=2, etc.
        counter += 1;
      }
      day += 1;
      date = new Date(year, month, day);
    }
    return counter;
  }

  // console.log(sundays(2022, 2));

  function sundaysInMonth(m, y) {
    var days = new Date(y, m, 0).getDate();
    var sundays = [(8 - (new Date(m + '/01/' + y).getDay())) % 7];
    for (var i = sundays[0] + 7; i < days; i += 7) {
      sundays.push(i);
    }
    return sundays;
  }

  const date = new Date();

  // console.log(sundaysInMonth(date.getMonth(), Date().split(' ')[3])); //=> [ 7,14,21,28 ]

  // date.setDate(date.getDate() + loan_tenure);
  // console.log(sundaysInMonth(2, 2022).length); //=> 4
  // console.log(date.getDate());

  // let count = 0;
  // const d = new Date();
  // while (count < 10) {
  //   d.setDate(d.getDate() + loan_tenure);
  //   console.log(d.getDate());
  //   count += 1
  //   return count
  // }

  function renderDays(tenure) {
    var days;
    var day = '';
    var sundays = 0;
    var sundates = [];
    var counter = 0;
    var months = 1;
    var startDate = 1;
    var data = [];
    // for (var i = 0; i < tenure + 1;) {
    //   date.setDate(date.getDate() + i);
    //   sundays = date.getDate();
    //   i += 1;
    //   console.log(sundays)
    // }
    while (counter < tenure + 1) {
      const date = new Date();
      startDate = [{ start_date: date.getDate(), start_day: date.getDay() }];
      date.setDate(date.getDate() + counter);
      days = date.getDate();
      day = date.getDay();
      if (day === 0) {
        sundays += 1
        sundates.push([{ date: days, month: Number(date.getMonth() + 1), day: 'sunday' }])
        // sundates.push(days + ' ' + Number(date.getMonth() + 1))
        // console.log('date', days, 'sunday')
      }
      // console.log('date', days, day)
      if (days === 1) {
        months += 1
      }
      // console.log('months', months, date.getMonth())
      counter++;
    }
    var endDate = [{ end_date: days, end_day: day }]
    // console.log('start date', startDate)
    // console.log('total months', months)
    // console.log('sundays', sundays)
    // console.log('tenure', counter - 1)
    // console.log('end date', endDate)
    data = [{ tenure: counter - 1, start_date_data: startDate, end_date_data: endDate, total_months: months, total_sundays: sundays, sunday_dates: sundates }]
    return data;
    // return sundays;
  }

  // console.log('data', renderDays(Number(loanTenure)))
  const handleCollateralChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...collateralList];
    list[index][name] = value;
    setCollateralList(list);
  };

  const handleCollateralAdd = () => {
    setCollateralList([...collateralList, { collateral: "", value: "" }]);
  };

  const handleCollateralDelete = (index) => {
    const list = [...collateralList];
    list.splice(index, 1);
    setCollateralList(list);
  };

  const handleCollateralSave = () => {
    if (collateralList) {
      const doc = {
        collateralList,
      };
      // client.create(doc).then(() => {
      //   navigate('/');
      // });
      // console.log(doc)
    }
    // navigate("/create-group")
  };



  const handleLoanSave = () => {
    setMaintained('true');
    setApproved('false');
    setDisbursed('false');
    setMemberId(memberDetail[0]?._id);
    setProductId(productDetails[0]?._id);
    setRepaymentCycle(
      productDetails[0]?.repaymentCycle === 'weekly' ?
        productDetails[0]?.repaymentCycle === 'monthly' ?
          'months'
          : 'weeks'
        : 'days'
    );
    setMemberNames(names);
    // setMemberNames(memberDetail[0]?.personalDetails?.surName + ' ' + memberDetail[0]?.personalDetails?.otherNames);
    setMemberPhoneNumber(memberDetail[0]?.personalDetails?.mobileNumber);
    setInterestAmount(
      // renderInterestAmount(productDetails[0]?.interestRate, principalAmount).toString()
      productDetails[0]?.repaymentCycle === 'weekly' ?
        productDetails[0]?.repaymentCycle === 'monthly' ?
          renderMonthlyInterestAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString()
          : renderWeeklyInterestAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString()
        : renderDailyInterestAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString()
    );
    setInstallmentAmount(
      productDetails[0]?.repaymentCycle === 'weekly' ?
        productDetails[0]?.repaymentCycle === 'monthly' ?
          renderMonthlyInstallmentsAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString()
          : renderWeeklyInstallmentsAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString()
        : renderDailyInstallmentsAmount(productDetails[0]?.interestRate, principalAmount, loanTenure).toString()
    );
    setProcessingFee(renderProcessingFeeAmount(productDetails[0]?.processingFee, principalAmount).toString());
    setPenaltyAmount(productDetails[0]?.penaltyTypeChoice === 'amount' ? productDetails[0]?.penalty : renderPenaltyAmount(productDetails[0]?.penalty, productDetails[0]?.interestRate, principalAmount, loanTenure).toString());
    setLoanAccNumber(productDetails[0]?.productCode + '-' + memberDetail[0]?.memberNumber)
    setMemberIdNumber(memberDetail[0]?.personalDetails?.idPass)
    setMemberEmail(memberDetail[0]?.personalDetails?.emailAddress)
    setGuarantorName(guarantorDetails === '...' ? guarantorName : gnames)
    setGuarantorId(guarantorDetails === '...' ? guarantorId : guarantor[0]?.personalDetails?.idPass)
    setGuarantorPhone(guarantorDetails === '...' ? guarantorPhone : guarantor[0]?.personalDetails?.mobileNumber)
    // setGuarantorRelationship(guarantorDetails === '...' ? guarantorRelationship : guarantorRelationship)
  }

  const handleLoanSubmit = () => {
    if (
      productType
      && principalAmount
      && memberId
      && productId
      && memberIdNumber
      && memberEmail
      && memberNames
      && memberPhoneNumber
      && loanTenure
      && interestAmount
      && installmentAmount
      && processingFee
      && penaltyAmount
      && maintained
      && approved
      && disbursed
      && loanAccNumber
      && guarantorName
      && guarantorId
      && guarantorPhone
      && guarantorRelationship
      && repaymentCycle
    ) {
      client
        .patch(memberId)
        .set({
          maintained: 'true',
        })
        .commit()
        .then((update) => {
          console.log(update);
        });
      const doc = {
        _type: 'maintenance',
        productType
        , principalAmount
        , repaymentCycle
        , memberId
        , productId
        , memberIdNumber
        , memberEmail
        , memberNames
        , memberPhoneNumber
        , loanTenure
        , interestAmount
        , installmentAmount
        , processingFee
        , penaltyAmount
        , maintained
        , approved
        , disbursed
        , loanAccNumber
        , guarantorName
        , guarantorId
        , guarantorPhone
        , guarantorRelationship
      };
      client.create(doc).then(() => {
        alert('Loan Maintained Successfully!')
        console.log('Submitted', doc)
        navigate("/loan/approvals")
        // navigate(`/loan/preview/${_id}`)
      });

    } else {
      setFields(true);
      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
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
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Select Guarantor
            </label>
            <div className="relative">
              <select value={guarantorDetails} onChange={(e) => setGuarantorDetails(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option
                  className="text-gray-500"
                >...</option>
                {
                  guarantorsList && (
                    guarantorsList?.map((member, index) => (
                      <option key={index}>{member?.memberNumber + ' ' + member?.personalDetails?.surName + ' ' + member?.personalDetails?.otherNames}</option>
                    )
                    ))
                }
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Guarantor Names
            </label>
            {!guarantorDetails && (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Guarantor Names ..."
                value={guarantorName}
                onChange={(e) => setGuarantorName(e.target.value)}
              />
            )
            }
            {guarantorDetails && (
              <span
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                {gnames}
              </span>
            )
            }
          </div>
        </div>
        <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Guarantor Phone
              <span className="text-red-500 italic">*</span>
            </label>
            {!guarantorDetails && (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="tel"
                placeholder="Phone Number ..."
                value={guarantorPhone}
                onChange={(e) => setGuarantorPhone(e.target.value)}
              />
            )
            }
            {guarantorDetails && (
              <span
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                {guarantor[0]?.personalDetails?.mobileNumber}
              </span>
            )
            }
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Guarantor ID</span>
            </label>
            {!guarantorDetails && (
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="number"
                placeholder="ID Number ..."
                value={guarantorId}
                onChange={(e) => setGuarantorId(e.target.value)}
              />
            )
            }
            {guarantorDetails && (
              <span
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                {guarantor[0]?.personalDetails?.idPass}
              </span>
            )
            }
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Guarantor Relationship</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Relationship ..."
              value={guarantorRelationship}
              onChange={(e) => setGuarantorRelationship(e.target.value)}
            />
          </div>
        </div>
      </>
    )
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
            <div className="flex justify-center w-1/6 px-3 md:mb-0">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Nọ</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Collateral Items</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Value (KSHs)</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
            <div className="w-full md:w-1/6 px-3">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Image</span>
                {/* <span className="text-red-500 italic">*</span> */}
              </label>
            </div>
          </div>
          {collateralList.map((singleItem, index) => (
            <div key={index.toString()} >
              <div className="flex flex-wrap w-full mb-2">
                <span className="font-bold flex justify-center w-1/6 text-gray-700 p-2 mt-1">{index + 1}.</span>
                <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="collateralName"
                    type="text"
                    name="collateral"
                    placeholder="Item Name ..."
                    value={singleItem.collateral}
                    onChange={(e) => handleCollateralChange(e, index)}
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="idNumber"
                    type="number"
                    name="value"
                    placeholder="Value ..."
                    value={singleItem.value}
                    onChange={(e) => handleCollateralChange(e, index)}
                    required
                  />
                </div>
                <div className="flex w-full flex-wrap items-center justify-start md:w-1/6 px-3">
                  {loading && (
                    <Spinner />
                  )}
                  {
                    wrongImageType && (
                      <p>It&apos;s wrong file type.</p>
                    )
                  }
                  {!imageAsset ? (
                    // eslint-disable-next-line jsx-a11y/label-has-associated-control
                    <label className="mt-3">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <input
                        type="file"
                        name="upload-image"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </label>
                  ) : (
                    <div className="relative h-6 w-auto">
                      <img
                        src={imageAsset?.url}
                        alt="uploaded-pic"
                        className="h-4 w-4"
                      />
                      <button
                        type="button"
                        className="absolute bottom-3 right-3 p-3 rounded-lg-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                        onClick={() => setImageAsset(null)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                  {collateralList.length !== 1 && (
                    <span className="w-full md:w-1/6">
                      <button
                        onClick={() => handleCollateralDelete(index)}
                        type="button"
                        className="text-red-400 hover:text-red-600 pl-5 mb-4 font-bold"
                      >
                        <AiFillDelete />
                      </button>
                    </span>
                  )}
                </div>
              </div>
              {collateralList.length - 1 === index && collateralList.length < 10 && (
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleCollateralAdd}
                    type="button"
                    className="bg-blue-500 m-2 w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Add a Item +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

  function renderMaintenance() {
    return (
      <>
        <div
          onMouseEnter={() => setMemberId(memberDetail[0]?._id)}
          className="w-full md:w-full md:mx-2"
        >
          {memberDetail && productDetails && (
            <>
              <div className="flex justify-center items-center px-4 py-4">
                {
                  membersList.length !== 0 ?
                    <div className="mt-3">
                      {memberDetail.length === 0 ?
                        <span className="font-bold uppercase text-blue-500 text-xl mr-2">
                          Select a Member & a product
                        </span>
                        :
                        <>
                          <span className="font-bold text-gray-500 text-xl mr-2">
                            Maintain
                          </span>
                          <span className="font-bold text-gray-500 text-xl mr-2">
                            for
                          </span>
                          <span className="font-bold text-xl mr-2">
                            {names}
                            {/* {memberDetail[0]?.personalDetails?.surName + ' ' + memberDetail[0]?.personalDetails?.otherNames} */}
                          </span>
                        </>
                      }
                    </div>
                    :
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
                          They've either been maintained for or have an active loan.
                        </span>
                      </div>
                    </div>
                }
              </div>
              {memberDetail.length !== 0 ?
                <div>
                  <div className="image overflow-hidden">
                    <img className="h-auto w-1/4 mx-auto" src={(memberDetail[0]?.image && urlFor(memberDetail[0]?.image).url())} alt="member-profile-pic" />
                  </div>
                  <div className="ml-auto mr-auto mb-3">
                    <ul className="bg-gray-50 border border-gray-300 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Member Code
                        </span>
                        <span className="ml-auto">DC-{memberDetail[0]?.memberNumber}</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Mobile No.
                        </span>
                        <span className="ml-auto">{memberDetail[0]?.personalDetails?.mobileNumber}</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Email
                        </span>
                        <span className="ml-auto">{memberDetail[0]?.personalDetails?.emailAddress}</span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          ID Number
                        </span>
                        <span className="ml-auto">{memberDetail[0]?.personalDetails?.idPass}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                :
                null
              }
              <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Select a Member
                  </label>
                  <div className="relative">
                    <select value={memberIdentity} onChange={(e) => setMemberIdentity(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                      <option
                        className="text-gray-500"
                      >Select a Member ...</option>
                      {
                        membersList && (
                          membersList?.map((member, index) => (
                            <option key={index}>{member.memberNumber + ' ' + member.personalDetails.surName + ' ' + member.personalDetails.otherNames}</option>
                          )
                          ))
                      }
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Select a Product
                  </label>
                  <div className="relative">
                    <select value={productType} onChange={(e) => setProductType(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                      <option
                        className="text-gray-500"
                      >Select a Product ...</option>
                      {productList && (
                        productList?.map((item, index) => (
                          <option key={index}>{item.productName}</option>
                        )
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
                    Amount (KShs)
                    <span className="text-red-500 italic">*</span>
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="principalAmount"
                    type="number"
                    placeholder="Principal Amount ..."
                    value={principalAmount}
                    onChange={(e) => setPrincipalAmount(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block tracking-wide text-xs mb-2">
                    {productDetails && (
                      <span className="uppercase text-gray-700 font-bold text-md">Loan Tenure {productDetails[0]?.tenureMaximumChoice}</span>
                    )}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="loanTenure"
                    type="number"
                    placeholder="Loan Tenure ..."
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                  />
                </div>
              </div>
              {productDetails && productDetails?.map((item, index) => (
                <>
                  <span key={item._id} className="flex justify-center w-full text-red-500 italic">{Number(loanTenure) > Number(item.tenureMaximum) ? `Maximum Tenure is ${item.tenureMaximum} ${item.tenureMaximumChoice}` : null}</span>
                  <span className="flex justify-center w-full text-red-500 italic">{Number(principalAmount) > Number(item.maximumRange) ? `Maximum Principal Amount is KSHs. ${item.maximumRange}` : null}</span>
                  <span className="flex justify-center w-full text-red-500 italic">{Number(principalAmount) < Number(item.minimumRange) ? `Minimum Principal Amount is KSHs. ${item.minimumRange}` : null}</span>
                  <div key={index.toString()} className="flex flex-wrap">
                    <ul className="bg-gray-100 w-full md:w-2/3 mr-auto ml-auto text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded-lg shadow-sm">
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Product Type
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          {item.productName}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Loan A/C Number
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          DC-{item.productCode}-{memberDetail[0]?.memberNumber}
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Interest Rate
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          {item?.interestRate} %
                        </span>
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Interest Amount
                        </span>
                        {
                          item?.repaymentCycle === 'weekly' ?
                            <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                              KSHs. {renderWeeklyInterestAmount(item?.interestRate, principalAmount, loanTenure)}
                            </span>
                            :
                            item?.repaymentCycle === 'monthly' ?
                              <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                                KSHs. {renderMonthlyInterestAmount(item?.interestRate, principalAmount, loanTenure)}
                              </span>
                              :
                              <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                                KSHs. {renderDailyInterestAmount(item?.interestRate, principalAmount, loanTenure)}
                              </span>
                        }
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Installments
                        </span>
                        {
                          item?.repaymentCycle === 'weekly' ?
                            <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                              KSHs. {renderWeeklyInstallmentsAmount(item?.interestRate, principalAmount, loanTenure)}
                            </span>
                            :
                            item?.repaymentCycle === 'monthly' ?
                              <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                                KSHs. {renderMonthlyInstallmentsAmount(item?.interestRate, principalAmount, loanTenure)}
                              </span>
                              :
                              <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                                KSHs. {renderDailyInstallmentsAmount(item?.interestRate, principalAmount, loanTenure)}
                              </span>
                        }
                      </li>
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Repayment Cycle
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          {item?.repaymentCycle}
                        </span>
                      </li>
                      {item?.repaymentCycle === 'daily' ?
                        <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                          <span className="tracking-wide text-l text-gray-700 font-bold">
                            Grace Period
                          </span>
                          <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                            {item?.gracePeriod}
                          </span>
                        </li>
                        :
                        null
                      }
                      <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                        <span className="tracking-wide text-l text-gray-700 font-bold">
                          Processing Fee
                        </span>
                        <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                          KSHs. {renderProcessingFeeAmount(item?.processingFee, principalAmount)}
                        </span>
                      </li>
                      {item?.repaymentCycle === 'daily' ?
                        <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                          <span className="tracking-wide text-l text-gray-700 font-bold">
                            Penalty
                          </span>
                          <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                            {item?.penaltyTypeChoice === 'amount' ? `KSHs. ${item?.penalty}` : `${renderPenaltyAmount(item?.penalty, item?.interestRate, principalAmount, loanTenure)} %`}
                          </span>
                        </li>
                        :
                        <li className="flex items-center hover:bg-gray-300 hover:p-3 transition-all duration-100 rounded-lg py-3">
                          <span className="tracking-wide text-l text-gray-700 font-bold">
                            Penalty
                          </span>
                          <span className="tracking-wide text-gray-500 font-semibold text-md ml-auto">
                            {item?.penaltyTypeChoice === 'amount' ? `KSHs. ${item?.penalty}` : `${item?.penalty} %`}
                          </span>
                        </li>
                      }
                    </ul>
                  </div>
                </>
              ))}

            </>
          )}
        </div>
        {/* <pre>{JSON.stringify(memberDetail, undefined, 2)}</pre> */}
        <br />
      </>
    )
  }

  return (
    <>
      {membersList?.length === 0 ?
        <>
          <div className="flex flex-col justify-center items-center ml-auto mr-auto">
            <div className="mt-9">
              <span className="font-bold text-red-500 text-xl mr-2">
                No
              </span>
              <span className="font-bold text-gray-500 text-xl mr-2">
                members available ...
              </span>
            </div>
            <div className="mt-5">
              <span className="font-bold text-blue-400 text-xl mr-2">
                They've either been maintained for or have an active loan.
              </span>
            </div>
            <div className="mt-0">
              <span className="font-bold text-blue-500 text-xl mr-2">
                Checkout the approval list ...
              </span>
            </div>
            <div className="mt-8">
              <Link
                to="/loan/approvals"
                className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Approval List
              </Link>
            </div>
          </div>
        </>
        :
        <>
          {renderMaintenance()}
          {renderGuarantors()}
          {renderCollaterals()}
          <>
            <div className="flex justify-center mt-5">
              <div className="w-full md:w-1/3 mr-auto ml-auto">
                <button
                  type="button"
                  onClick={handleLoanSubmit}
                  onMouseEnter={handleLoanSave}
                  className="bg-green-500 w-full hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-1/2 ml-auto mr-auto">
                {
                  fields && (
                    <p className="text-red-500 mt-3 text-xl transition-all duration-150 ease-in">
                      Please Fill All the Required Fields!
                    </p>
                  )
                }
              </div>
            </div>
          </>
          <pre>
            {JSON.stringify(renderDays(Number(loanTenure)), undefined, 2)}
          </pre>
        </>
      }
    </>
  );
}


