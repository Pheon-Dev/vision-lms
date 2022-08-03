import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ModalAlert } from "../Modals";
import user from "../../assets/user.png";

import { client } from "../../client";
import { Spinner, Label } from "../Components";

export default function CreateMember() {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [validator, setValidator] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [adding, setAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState("");
  const [branchName, setBranchName] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const [surName, setSurName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [dob, setDOB] = useState("");
  const [idPass, setIDPass] = useState("");
  const [pinNumber, setPinNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [religion, setReligion] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nameSpouse, setNameSpouse] = useState("");
  const [spouseNumber, setSpouseNumber] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [rentedOwned, setRentedOwned] = useState("");
  const [landCareAgent, setLandCareAgent] = useState("");
  const [occupationEmployer, setOccupationEmployer] = useState("");
  const [employerNumber, setEmployerNumber] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessAge, setBusinessAge] = useState("");
  const [refereeName, setRefereeName] = useState("");
  const [refereeNumber, setRefereeNumber] = useState("");
  const [communityPosition, setCommunityPosition] = useState("");
  const [mpesaTransNumber, setMpesaTransNumber] = useState("");
  const [mpesaAmount, setMpesaAmount] = useState("");
  const [nameKin, setNameKin] = useState("");
  const [relationship, setRelationship] = useState("");
  const [residentialAddressKin, setResidentialAddressKin] = useState("");
  const [postalAddressKin, setPostalAddressKin] = useState("");
  const [postalCodeKin, setPostalCodeKin] = useState("");
  const [cityTownKin, setCityTownKin] = useState("");
  const [mobileNumberKin, setMobileNumberKin] = useState("");

  const [maintained, setMaintained] = useState("false");
  const [group, setGroup] = useState("false");

  const navigate = useNavigate();
  const [code, setCode] = useState();

  useEffect(() => {
    let subscription = true;
    const query = '*[_type == "member"]';

    if (subscription) {
      client.fetch(query).then((data) => {
        setCode(data);
      });
    }

    return () => (subscription = false);
  }, []);

  const marital = [
    {
      name: "Marital Status ...",
      abbr: "MS",
    },
    {
      name: "Married",
      abbr: "M",
    },
    {
      name: "Single",
      abbr: "S",
    },
    {
      name: "Widowed",
      abbr: "W",
    },
  ];

  const rentedOrOwned = [
    {
      name: "Rented/Owned ...",
      abbr: "RO",
    },
    {
      name: "Rented",
      abbr: "R",
    },
    {
      name: "Owned",
      abbr: "O",
    },
  ];

  const religionSelector = [
    {
      name: "Religion ...",
      abbr: "R",
    },
    {
      name: "Christian",
      abbr: "C",
    },
    {
      name: "Muslim",
      abbr: "M",
    },
    {
      name: "Hindu",
      abbr: "H",
    },
    {
      name: "Other",
      abbr: "O",
    },
  ];

  const genderSelector = [
    {
      name: "Gender ...",
      abbr: "G",
    },
    {
      name: "female",
      abbr: "F",
    },
    {
      name: "male",
      abbr: "M",
    },
  ];

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff" ||
      selectedFile.type === "image/jpg"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  let res_age = 0;
  let year_diff = date.split("-")[0] - dob.split("-")[0];
  function renderAge(month_now, month_dob) {
    let result = 0;
    if (month_now === month_dob) result = 1;
    if (month_now > month_dob) result = 1;
    if (month_now < month_dob) result = 0;
    return result;
  }
  let month_date = renderAge(
    Number(date.split("-")[1]) + 0,
    dob.split("-")[1] - 0
  );
  res_age = year_diff + month_date - 1;
  res_age = res_age > 0 ? res_age : res_age * -1;
  res_age = res_age.toString();

  const preSaveMember = () => {
    setMaintained("false");
    setGroup("false");
    setAge(res_age);
    setMemberNumber(
      `DC-${
        code.length > 9
          ? code.length > 99
            ? code.length > 999
              ? Number(code.length) + 1
              : "0" + (Number(code.length) + 1)
            : "00" + (Number(code.length) + 1)
          : "000" + (Number(code.length) + 1)
      }`
    );
    console.log(
      date,
      branchName,
      memberNumber,
      mpesaAmount,
      surName,
      otherNames,
      dob,
      idPass,
      pinNumber,
      mobileNumber,
      gender,
      age,
      religion,
      maritalStatus,
      spouseNumber,
      nameSpouse,
      postalAddress,
      postalCode,
      cityTown,
      residentialAddress,
      emailAddress,
      rentedOwned,
      landCareAgent,
      occupationEmployer,
      employerNumber,
      businessLocation,
      businessAge,
      refereeName,
      group,
      communityPosition,
      mpesaTransNumber,
      nameKin,
      relationship,
      residentialAddressKin,
      postalAddressKin,
      postalCodeKin,
      cityTownKin,
      mobileNumberKin
    );
  };

  const saveMember = () => {
    setAdding(true);
    if (
      date &&
      maintained &&
      branchName &&
      memberNumber &&
      surName &&
      otherNames &&
      dob &&
      idPass &&
      pinNumber &&
      mobileNumber &&
      gender &&
      age &&
      religion &&
      maritalStatus &&
      spouseNumber &&
      nameSpouse &&
      postalAddress &&
      postalCode &&
      cityTown &&
      residentialAddress &&
      emailAddress &&
      rentedOwned &&
      landCareAgent &&
      occupationEmployer &&
      employerNumber &&
      businessLocation &&
      businessAge &&
      refereeName &&
      refereeNumber &&
      communityPosition &&
      mpesaTransNumber &&
      mpesaAmount &&
      nameKin &&
      relationship &&
      residentialAddressKin &&
      group &&
      postalAddressKin &&
      postalCodeKin &&
      cityTownKin &&
      mobileNumberKin &&
      imageAsset?._id
    ) {
      const doc = {
        _type: "member",
        memberNumber,
        date,
        maintained,
        branchName,
        surName,
        otherNames,
        dob,
        idPass,
        pinNumber,
        mobileNumber,
        gender,
        age,
        religion,
        maritalStatus,
        spouseNumber,
        nameSpouse,
        postalAddress,
        postalCode,
        cityTown,
        residentialAddress,
        emailAddress,
        rentedOwned,
        landCareAgent,
        occupationEmployer,
        employerNumber,
        businessLocation,
        businessAge,
        refereeName,
        refereeNumber,
        group,
        communityPosition,
        mpesaTransNumber,
        mpesaAmount,
        nameKin,
        relationship,
        residentialAddressKin,
        postalAddressKin,
        postalCodeKin,
        cityTownKin,
        mobileNumberKin,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
      };
      client.create(doc).then(() => {
        setAdding(false);
        setOpen(true);
        // navigate("/member/");
        // alert("Member Registered Successfully");
      });
    } else {
      setFields(true);
      setValidator(true);

      setAdding(false);
      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  let classInput =
    "appearance-none uppercase block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white";

  function renderCreateMember() {
    return (
      <div className="w-full mt-5">
        <div className="flex uppercase flex-col text-3xl mb-3 items-center sm:text-3xl font-bold p-2">
          Member Registration Form
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label valid={validator} label="Date" item={date} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value.toUpperCase())}
              className={classInput}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="Branch Name" item={branchName} />
            <input
              type="text"
              placeholder="Branch Name ..."
              value={branchName}
              onChange={() => setBranchName("Eldoret")}
              className={classInput}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label
              valid={validator}
              label="Member Number"
              item={memberNumber}
            />
            {code && (
              <span className={classInput}>
                {`DC-${
                  code.length > 9
                    ? code.length > 99
                      ? code.length > 999
                        ? Number(code.length) + 1
                        : "0" + (Number(code.length) + 1)
                      : "00" + (Number(code.length) + 1)
                    : "000" + (Number(code.length) + 1)
                }`}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">
          Personal Details
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label valid={validator} label="Surname" item={surName} />
            <input
              className={classInput}
              id="surName"
              type="text"
              placeholder="Surname ..."
              value={surName}
              onChange={(e) => setSurName(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label valid={validator} label="Other Names" item={otherNames} />
            <input
              className={classInput}
              id="otherNames"
              type="text"
              placeholder="Other Names ..."
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label valid={validator} label="Date Of Birth" item={dob} />
            <input
              className={classInput}
              id="dob"
              type="date"
              placeholder="Date of Birth ..."
              value={dob}
              onChange={(e) => setDOB(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label valid={validator} label="ID/Passport No." item={idPass} />
            <input
              className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="idPass"
              type="text"
              placeholder="ID/Passport ..."
              value={idPass}
              onChange={(e) => setIDPass(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="PIN No. (Attach Copy)"
              item={pinNumber}
            />
            <input
              className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="pinNumber"
              type="text"
              placeholder="PIN ..."
              value={pinNumber}
              onChange={(e) => setPinNumber(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label valid={validator} label="Mobile No." item={mobileNumber} />
            <input
              className={classInput}
              id="mobileNumber"
              type="tel"
              placeholder="Mobile No. ..."
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label valid={validator} label="Gender" item={gender} />
            <select
              onChange={(e) => {
                setGender(e.target.value.toUpperCase());
              }}
              className={classInput}
            >
              {genderSelector.map((item) => (
                <option
                  key={item.name}
                  className={classInput}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="Age" item={age} />
            {res_age && <span className={classInput}>{`${res_age}`}</span>}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="Religion" item={religion} />
            <select
              onChange={(e) => {
                setReligion(e.target.value.toUpperCase());
              }}
              className={classInput}
            >
              {religionSelector.map((item) => (
                <option
                  key={item.name}
                  className={classInput}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
            {/* <input */}
            {/*   className={classInput} */}
            {/*   id="religion" */}
            {/*   type="text" */}
            {/*   placeholder="Religion ..." */}
            {/*   value={religion} */}
            {/*   onChange={(e) => setReligion(e.target.value.toUpperCase())} */}
            {/* /> */}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Marital Status"
              item={maritalStatus}
            />
            <select
              onChange={(e) => {
                setMaritalStatus(e.target.value.toUpperCase());
                setNameSpouse("");
                setSpouseNumber("");
              }}
              className={classInput}
            >
              {marital.map((item) => (
                <option
                  key={item.name}
                  className={classInput}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
            {/* <input */}
            {/*   className={classInput} */}
            {/*   id="maritalStatus" */}
            {/*   type="text" */}
            {/*   placeholder="Marital Status ..." */}
            {/*   value={maritalStatus} */}
            {/*   onChange={(e) => setMaritalStatus(e.target.value.toUpperCase())} */}
            {/* /> */}
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="Name of Spouse" item={nameSpouse} />
            <input
              className={classInput}
              id="nameSpouse"
              type="text"
              placeholder="Name of Spouse ..."
              value={nameSpouse}
              onChange={(e) => setNameSpouse(maritalStatus === "SINGLE" ? "N/A" : e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label
              valid={validator}
              label="Spouse Tel. No."
              item={spouseNumber}
            />
            <input
              className={classInput}
              id="spouseNumber"
              type="tel"
              placeholder="Spouse Tel. ..."
              value={spouseNumber}
              onChange={(e) => setSpouseNumber(maritalStatus === "SINGLE" ? "N/A" : e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Postal Address"
              item={postalAddress}
            />
            <input
              className={classInput}
              id="postalAddress"
              type="text"
              placeholder="Postal Address ..."
              value={postalAddress}
              onChange={(e) => setPostalAddress(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="Postal Code" item={postalCode} />
            <input
              className={classInput}
              id="postalCode"
              type="text"
              placeholder="Postal Code..."
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="City/Town" item={cityTown} />
            <input
              className={classInput}
              id="cityTown"
              type="text"
              placeholder="City/Town ..."
              value={cityTown}
              onChange={(e) => setCityTown(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Residential Address"
              item={residentialAddress}
            />
            <input
              className={classInput}
              id="residentialAddress"
              type="text"
              placeholder="Residential Address ..."
              value={residentialAddress}
              onChange={(e) =>
                setResidentialAddress(e.target.value.toUpperCase())
              }
            />
          </div>
          {/* // valid email */}
          <div className="w-full md:w-1/2 px-3">
            <Label
              valid={validator}
              label="Email Address"
              item={emailAddress}
            />
            <input
              className={classInput}
              id="emailAddress"
              type="email"
              placeholder="Email Address ..."
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label valid={validator} label="Rented/Owned" item={rentedOwned} />
            <select
              onChange={(e) => {
                setRentedOwned(e.target.value.toUpperCase());
                rentedOwned === "OWNED" && setLandCareAgent("N/A");
              }}
              className={classInput}
            >
              {rentedOrOwned.map((item) => (
                <option
                  key={item.name}
                  className={classInput}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={`w-full md:w-2/3 px-3 ${rentedOwned === "OWNED" ? "hidden" : ""}`}>
            <Label
              valid={validator}
              label="Landlord/Caretaker/Agent Name"
              item={landCareAgent}
            />
            <input
              className={classInput}
              id="landCareAgent"
              type="text"
              placeholder="Landlord/Caretaker/Agent Name ..."
              value={landCareAgent}
              onClick={() => setLandCareAgent("")}
              onChange={(e) => setLandCareAgent(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        {/* Show business if not employed */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Occupation/Employer"
              item={occupationEmployer}
            />
            <input
              className={classInput}
              id="occupationEmployer"
              type="text"
              placeholder="Occupation/Employer ..."
              value={occupationEmployer}
              onChange={(e) => {
                setOccupationEmployer(e.target.value.toUpperCase());
                occupationEmployer === "BUSINESS" && setEmployerNumber("N/A")
              }
              }
            />
          </div>
          <div className={`w-full md:w-1/3 px-3 ${occupationEmployer === "BUSINESS" ? "hidden" : ""}`}>
            <Label
              valid={validator}
              label="Employer Contacts (Tel. No.)"
              item={employerNumber}
            />
            <input
              className={classInput}
              id="employerNumber"
              type="tel"
              placeholder="Employer Contacts ..."
              value={employerNumber}
              onChange={(e) => setEmployerNumber(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Location of Business (Attach Map)"
              item={businessLocation}
            />
            <input
              className={classInput}
              id="businessLocation"
              type="text"
              placeholder="Business Location ..."
              value={businessLocation}
              onChange={(e) =>
                setBusinessLocation(e.target.value.toUpperCase())
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label
              valid={validator}
              label="Age of Business"
              item={businessAge}
            />
            <input
              className={classInput}
              id="businessAge"
              type="text"
              placeholder="Age of Business ..."
              value={businessAge}
              onChange={(e) => setBusinessAge(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Name of Referee"
              item={refereeName}
            />
            <input
              className={classInput}
              id="refereeName"
              type="text"
              placeholder="Name of Referee ..."
              value={refereeName}
              onChange={(e) => setRefereeName(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label valid={validator} label="Tel No." item={refereeNumber} />
            <input
              className={classInput}
              id="refereeNumber"
              type="tel"
              placeholder="Referee Number ..."
              value={refereeNumber}
              onChange={(e) => setRefereeNumber(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Any Position of Leadership in the Community"
              item={communityPosition}
            />
            <input
              className={classInput}
              id="communityPosition"
              type="text"
              placeholder="Poistion in Community ..."
              value={communityPosition}
              onChange={(e) =>
                setCommunityPosition(e.target.value.toUpperCase())
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Membership fee M-PESA Transaction No."
              item={communityPosition}
            />
            <input
              className={classInput}
              id="mpesaTransNumber"
              type="text"
              placeholder="M-PESA Transaction NUMBER ..."
              value={mpesaTransNumber}
              onChange={(e) =>
                setMpesaTransNumber(e.target.value.toUpperCase())
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label
              valid={validator}
              label="Membership fee Amount"
              item={communityPosition}
            />
            <input
              className={classInput}
              id="mpesaAmount"
              type="text"
              placeholder="Membership Amount ..."
              value={mpesaAmount}
              onChange={(e) => setMpesaAmount(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-col text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">
          NEXT OF KIN INFORMATION
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label valid={validator} label="Name" item={nameKin} />
            <input
              className={classInput}
              id="nameKin"
              type="text"
              placeholder="Name ..."
              value={nameKin}
              onChange={(e) => setNameKin(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Label valid={validator} label="Relationship" item={nameKin} />
            <input
              className={classInput}
              id="relationship"
              type="text"
              placeholder="Relationship ..."
              value={relationship}
              onChange={(e) => setRelationship(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3">
            <Label
              valid={validator}
              label="Residential Address"
              item={residentialAddressKin}
            />
            <input
              className={classInput}
              id="residentialAddressKin"
              type="text"
              placeholder="Residential Address ..."
              value={residentialAddressKin}
              onChange={(e) =>
                setResidentialAddressKin(e.target.value.toUpperCase())
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Label
              valid={validator}
              label="Postal Address"
              item={postalAddressKin}
            />
            <input
              className={classInput}
              id="postalAddressKin"
              type="text"
              placeholder="Postal Address ..."
              value={postalAddressKin}
              onChange={(e) =>
                setPostalAddressKin(e.target.value.toUpperCase())
              }
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="Postal Code" item={postalCodeKin} />
            <input
              className={classInput}
              id="postalCodeKin"
              type="text"
              placeholder="Postal Code..."
              value={postalCodeKin}
              onChange={(e) => setPostalCodeKin(e.target.value.toUpperCase())}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <Label valid={validator} label="City/Town" item={cityTownKin} />
            <input
              className={classInput}
              id="cityTownKin"
              type="text"
              placeholder="City/Town ..."
              value={cityTownKin}
              onChange={(e) => setCityTownKin(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3">
            <Label
              valid={validator}
              label="Mobile/Tel No."
              item={mobileNumberKin}
            />
            <input
              className={classInput}
              id="mobileNumberKin"
              type="tel"
              placeholder="Mobile/Tel ..."
              value={mobileNumberKin}
              onChange={(e) => setMobileNumberKin(e.target.value.toUpperCase())}
            />
          </div>
        </div>
      </div>
    );
  }

  function renderUploadsAndSaving() {
    return (
      <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
        <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <div className="flex flex-col">
              <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                  {loading && <Spinner />}
                  {wrongImageType && <p>It&apos;s wrong file type.</p>}
                  {!imageAsset ? (
                    // eslint-disable-next-line jsx-a11y/label-has-associated-control
                    <label>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg">
                            <Label
                              valid={validator}
                              label="Click to Upload Profile Picture"
                              item={imageAsset}
                            />
                          </p>
                        </div>

                        <p className="mt-32 text-gray-400">
                          Recommended: Use High-Quality JPG, JPEG, SVG, PNG, GIF
                          or TIFF less than 20MB
                        </p>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </label>
                  ) : (
                    <div className="relative h-full">
                      <img
                        src={imageAsset?.url}
                        alt="uploaded-pic"
                        className="h-full w-full"
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
                </div>
              </div>
              <div></div>
              <div className="flex justify-end items-end mt-5">
                <div className="w-full md:w-1/2">
                  <button
                    type="button"
                    onClick={saveMember}
                    onMouseEnter={preSaveMember}
                    className="bg-green-500 text-white font-bold p-2 rounded-lg w-36 outline-none"
                  >
                    {adding ? "Saving ..." : "Save Member"}
                  </button>
                </div>
                <div className="w-full md:w-1/2">
                  {fields && (
                    <p className="text-red-500 mb-3 text-xl transition-all duration-150 ease-in">
                      Please Fill All the Required Fields!
                    </p>
                  )}
                </div>
                <div>
                  <ModalAlert
                    open={open}
                    onClose={() => setOpen(false)}
                    title={surName + " " + otherNames}
                    message="Navigate to All Members List ..."
                    path="/member/"
                  >
                    <div className="flex items-center w-full">
                      <div className="bg-green-300 opacity-80 relative rounded-full p-2">
                        <BsCheck2Circle className="w-10 font-bold text-black h-10" />
                      </div>
                      <div className="text-md p-3">
                        <span className="font-bold text-3xl">
                          Successfully Registered!
                        </span>
                      </div>
                    </div>
                  </ModalAlert>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {renderCreateMember()}
      {renderUploadsAndSaving()}
    </>
  );
}
