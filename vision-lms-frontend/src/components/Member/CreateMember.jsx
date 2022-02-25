import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { products } from '../../utils/data';
import { client } from '../../client';
import { Spinner } from '../Components';

export default function CreateMember() {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [product, setProduct] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const [date, setDate] = useState('');
  const [branchName, setBranchName] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [surName, setSurName] = useState('');
  const [otherNames, setOtherNames] = useState('');
  const [dob, setDOB] = useState('');
  const [idPass, setIDPass] = useState('');
  const [pinNumber, setPinNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [religion, setReligion] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nameSpouse, setNameSpouse] = useState('');
  const [spouseNumber, setSpouseNumber] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cityTown, setCityTown] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [rented, setRented] = useState('');
  const [owned, setOwned] = useState('');
  const [landCareAgent, setLandCareAgent] = useState('');
  const [occupationEmployer, setOccupationEmployer] = useState('');
  const [employerNumber, setEmployerNumber] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [businessAge, setBusinessAge] = useState('');
  const [refereeName, setRefereeName] = useState('');
  const [group, setGroup] = useState('');
  const [communityPosition, setCommunityPosition] = useState('');
  const [mpesaTransNumber, setMpesaTransNumber] = useState('');
  const [nameKin, setNameKin] = useState('');
  const [relationship, setRelationship] = useState('');
  const [residentialAddressKin, setResidentialAddressKin,] = useState('');
  const [postalAddressKin, setPostalAddressKin,] = useState('');
  const [postalCodeKin, setPostalCodeKin,] = useState('');
  const [cityTownKin, setCityTownKin] = useState('');
  const [mobileNumberKin, setMobileNumberKin] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupLeaderName, setGroupLeaderName] = useState('');
  const [leaderIdNumber, setLeaderIdNumber] = useState('');
  const [leaderNumber, setLeaderNumber] = useState('');

  const navigate = useNavigate();
  const [code, setCode] = useState();

  useEffect(() => {
    const query = '*[_type == "member"]';

    client.fetch(query).then((data) => {
      setCode(data);
    });

  }, []);

  const genderSelector = [
    {
      name: 'gender',
      abbr: 'G'
    },
    {
      name: 'female',
      abbr: 'F'
    },
    {
      name: 'male',
      abbr: 'M'
    },
  ]

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

  // console.log(Date().split(' ')[3].split('0')[1] + Date().split(' ')[2] + '-' + (code.length > 9 ? '00' + code.length : '000' + code.length))
  // console.log(Date().split(' ')[2] + Date().split(' ')[4].split(':')[0] + Date().split(' ')[4].split(':')[1])
  // console.log(memberNumber)
  const saveMember = () => {
    // setMemberNumber(`${Date().split(' ')[3].split('0')[1] + Date().split(' ')[2] + '-' + (code.length > 9 ? '00' + (Number(code.length) + 1) : '000' + (Number(code.length) + 1))}`)
    setMemberNumber(`${(code.length > 9 ? code.length > 99 ? code.length > 999 ? (Number(code.length) + 1) : '0' + (Number(code.length) + 1) : '00' + (Number(code.length) + 1) : '000' + (Number(code.length) + 1))}`)
    console.log(memberNumber)
    // setMemberNumber(`${Date().split(' ')[2] + Date().split(' ')[4].split(':')[0] + Date().split(' ')[4].split(':')[1]}`)
    // if (date && branchName && memberNumber && surName && otherNames && dob && idPass && pinNumber && mobileNumber && gender && age && religion && maritalStatus && spouseNumber && nameSpouse && postalAddress && postalCode && cityTown && residentialAddress && emailAddress && rented && owned && landCareAgent && occupationEmployer && employerNumber && businessLocation && businessAge && refereeName && group && communityPosition && mpesaTransNumber && nameKin && relationship && residentialAddressKin && postalAddressKin && postalCodeKin && cityTownKin && mobileNumberKin && groupName && groupLeaderName && leaderNumber && leaderIdNumber && imageAsset?._id) {
    if (date && branchName && memberNumber && surName && otherNames && dob && idPass && pinNumber && mobileNumber && gender && age && religion && maritalStatus && spouseNumber && nameSpouse && postalAddress && postalCode && cityTown && residentialAddress && emailAddress && rented && owned && landCareAgent && occupationEmployer && employerNumber && businessLocation && businessAge && refereeName && communityPosition && mpesaTransNumber && nameKin && relationship && residentialAddressKin && postalAddressKin && postalCodeKin && cityTownKin && mobileNumberKin && imageAsset?._id) {
      const doc = {
        _type: 'member',
        memberNumber,
        date,
        branchName,
        personalDetails: {
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
          rented,
          owned,
          landCareAgent,
          occupationEmployer,
          employerNumber,
          businessLocation,
          businessAge,
          refereeName,
          // group,
          communityPosition,
          mpesaTransNumber,
        },
        kinInformation: {
          nameKin,
          relationship,
          residentialAddressKin,
          postalAddressKin,
          postalCodeKin,
          cityTownKin,
          mobileNumberKin,
        },
        // groupInformation: {
        //   groupName,
        //   groupLeaderName,
        //   leaderNumber,
        //   leaderIdNumber,
        // },
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        // userId: user._id,
        // postedBy: {
        //   _type: 'postedBy',
        //   _ref: user._id,
        // },
        // product,
      };
      client.create(doc).then(() => {
        navigate('/');
        // window.location.reload();
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
  };

  function renderCreateMember() {
    return (
      <div className="w-full mt-5">
        <div className="flex uppercase flex-col text-3xl mb-3 items-center sm:text-3xl font-bold p-2">Member Registration Form</div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Date</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="date"
              type="date"
              placeholder="Date ..."
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            {/* <label className="relative cursor-pointer"> */}
            {/*   <input */}
            {/*     className="h-1/2 w-full px-6 bg-gray-300 text-l border-2 rounded-lg-lg border-gray-500 border-opacity-50 outline-none focus:border-cyan-500 focus:text-black transition duration-500" */}
            {/*     // id="branchName" */}
            {/*     type="text" */}
            {/*     placeholder="." */}
            {/*     value={branchName} */}
            {/*     onChange={(e) => setBranchName(e.target.value)} */}
            {/*   /> */}
            {/*   <span className="text-xl text-black text-opacity-30 absolute left-5 top-3 px-1 transition duration-300 input-text">Branch Name</span> */}
            {/* </label> */}
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Branch Name</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="branchName"
              type="text"
              placeholder="Branch Name ..."
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Member Number</span>
              {/* <span className="text-red-500 italic">*{memNum.split('-')[0]}</span> */}
              <span className="text-red-500 italic">*</span>
            </label>
            {code && (
              <span
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                {/* {`DC-${Date().split(' ')[3].split('0')[1] + Date().split(' ')[2] + '-' + (code.length > 9 ? '00' + (Number(code.length) + 1) : '000' + (Number(code.length) + 1))}`} */}
                {`DC-${code.length > 9 ? code.length > 99 ? code.length > 999 ? (Number(code.length) + 1) : '0' + (Number(code.length) + 1) : '00' + (Number(code.length) + 1) : '000' + (Number(code.length) + 1)}`}
              </span>
            )}
            {/* <input */}
            {/*   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" */}
            {/*   id="memberNumber" */}
            {/*   type="number" */}
            {/*   // placeholder="Member Number ..." */}
            {/*   placeholder={`DC-${memNum.split('-')[1]}`} */}
            {/*   value={memberNumber} */}
            {/*   onChange={(e) => setMemberNumber(e.target.value)} */}
            {/* /> */}
          </div>
        </div>
        <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">Personal Details</div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Surname
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="surName"
              type="text"
              placeholder="Surname ..."
              value={surName}
              onChange={(e) => setSurName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Other Names
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="otherNames"
              type="text"
              placeholder="Other Names ..."
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Date Of Birth
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="dob"
              type="date"
              placeholder="Date of Birth ..."
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              ID/Passport No.
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="idPass"
              type="text"
              placeholder="ID/Passport ..."
              value={idPass}
              onChange={(e) => setIDPass(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              PIN No. (Attach Copy)
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="pinNumber"
              type="text"
              placeholder="PIN ..."
              value={pinNumber}
              onChange={(e) => setPinNumber(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Mobile No.
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="mobileNumber"
              type="tel"
              placeholder="Mobile No. ..."
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Gender</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <select
              onChange={(e) => { setGender(e.target.value); (e.target.value) }} className="outline-none w-4.5 text-base border-gray-200 p-2 rounded-lg-md cursor-pointer"
            >
              {/* <option value="Gender ..." className="sm:text-bg bg-white text-gray-400">Gender ...</option> */}
              {genderSelector.map((item) => (
                <option key={item.name} className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                  {item.name}
                </option>
              )
              )}
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Age</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="age"
              type="number"
              placeholder="Age ..."
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Religion</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="religion"
              type="text"
              placeholder="Religion ..."
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Marital Status</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="maritalStatus"
              type="text"
              placeholder="Marital Status ..."
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Name of Spouse</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="nameSpouse"
              type="text"
              placeholder="Name of Spouse ..."
              value={nameSpouse}
              onChange={(e) => setNameSpouse(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Spouse Tel. No.</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="spouseNumber"
              type="tel"
              placeholder="Spouse Tel. ..."
              value={spouseNumber}
              onChange={(e) => setSpouseNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Postal Address</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="postalAddress"
              type="text"
              placeholder="Postal Address ..."
              value={postalAddress}
              onChange={(e) => setPostalAddress(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Postal Code</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="postalCode"
              type="number"
              placeholder="Postal Code..."
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">City/Town</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="cityTown"
              type="text"
              placeholder="City/Town ..."
              value={cityTown}
              onChange={(e) => setCityTown(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Residential Address
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="residentialAddress"
              type="text"
              placeholder="Residential Address ..."
              value={residentialAddress}
              onChange={(e) => setResidentialAddress(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Email Address
              <span className="text-red-500 italic">*</span>
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="emailAddress"
              type="email"
              placeholder="Email Address ..."
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Rented</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="rented"
              type="text"
              placeholder="Rented ..."
              value={rented}
              onChange={(e) => setRented(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Owned</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="owned"
              type="text"
              placeholder="Owned ..."
              value={owned}
              onChange={(e) => setOwned(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Landlord/Caretaker/Agent Name</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="landCareAgent"
              type="text"
              placeholder="Landlord/Caretaker/Agent Name ..."
              value={landCareAgent}
              onChange={(e) => setLandCareAgent(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Occupation/Employer
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="occupationEmployer"
              type="text"
              placeholder="Occupation/Employer ..."
              value={occupationEmployer}
              onChange={(e) => setOccupationEmployer(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Employer Contacts (Tel. No.)
              <span className="text-red-500 italic">*</span>
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="employerNumber"
              type="tel"
              placeholder="Employer Contacts ..."
              value={employerNumber}
              onChange={(e) => setEmployerNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Location of Business (Attach Map)
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="businessLocation"
              type="text"
              placeholder="Business Location ..."
              value={businessLocation}
              onChange={(e) => setBusinessLocation(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Age of Business
              <span className="text-red-500 italic">*</span>
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="businessAge"
              type="number"
              placeholder="Age of Business ..."
              value={businessAge}
              onChange={(e) => setBusinessAge(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Name of Referee
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="refereeName"
              type="text"
              placeholder="Name of Referee ..."
              value={refereeName}
              onChange={(e) => setRefereeName(e.target.value)}
            />
          </div>
          <div className="hidden w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Group
              <span className="text-red-500 italic">*</span>
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="group"
              type="text"
              placeholder="Group ..."
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Any Position of Leadership in the Community
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="communityPosition"
              type="text"
              placeholder="Poistion in Community ..."
              value={communityPosition}
              onChange={(e) => setCommunityPosition(e.target.value)}
            />
          </div>
          <div className="w-full md:w-full px-3">
            <label className="block tracking-wide text-l mb-2 uppercase text-gray-900 font-bold text-md">
              Membership fee M-PESA Transaction No.
              <span className="text-red-500 italic">*</span>
            </label>
            <input className="uppercase appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="mpesaTransNumber"
              type="text"
              placeholder="M-PESA Transaction NUMBER ..."
              value={mpesaTransNumber}
              onChange={(e) => setMpesaTransNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">NEXT OF KIN INFORMATION</div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Name
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="nameKin"
              type="text"
              placeholder="Name ..."
              value={nameKin}
              onChange={(e) => setNameKin(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Relationship
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="relationship"
              type="text"
              placeholder="Relationship ..."
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Residential Address
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="residentialAddressKin"
              type="text"
              placeholder="Residential Address ..."
              value={residentialAddressKin}
              onChange={(e) => setResidentialAddressKin(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Postal Address</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="postalAddressKin"
              type="text"
              placeholder="Postal Address ..."
              value={postalAddressKin}
              onChange={(e) => setPostalAddressKin(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Postal Code</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="postalCodeKin"
              type="number"
              placeholder="Postal Code..."
              value={postalCodeKin}
              onChange={(e) => setPostalCodeKin(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">City/Town</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="cityTownKin"
              type="text"
              placeholder="City/Town ..."
              value={cityTownKin}
              onChange={(e) => setCityTownKin(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Mobile/Tel No.
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="mobileNumberKin"
              type="tel"
              placeholder="Mobile/Tel ..."
              value={mobileNumberKin}
              onChange={(e) => setMobileNumberKin(e.target.value)}
            />
          </div>
        </div>
        <div className="flex hidden flex-col text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">GROUP INFORMATION</div>
        <div className="flex hidden flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Group Name
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="groupName"
              type="text"
              placeholder="Group Name ..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Name of Group Leader
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="groupLeaderName"
              type="text"
              placeholder="Name of Group Leader ..."
              value={groupLeaderName}
              onChange={(e) => setGroupLeaderName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex hidden flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              ID No. of Leader
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="leaderIdNumber"
              type="number"
              placeholder="ID No. of Leader ..."
              value={leaderIdNumber}
              onChange={(e) => setLeaderIdNumber(e.target.value)}
            />
          </div>
          <div className="w-full hidden md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2 uppercase text-gray-700 font-bold text-md">
              Mobile No. of Group Leader
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="leaderNumber"
              type="tel"
              placeholder="Mobile No. of Group Leader ..."
              value={leaderNumber}
              onChange={(e) => setLeaderNumber(e.target.value)}
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
                    <label>
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-bold text-2xl">
                            <AiOutlineCloudUpload />
                          </p>
                          <p className="text-lg">Click to Upload Profile Picture</p>
                        </div>

                        <p className="mt-32 text-gray-400">
                          Recommended: Use High-Quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
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
              <div>
                {/* <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Product Line</p> */}
                {/* <select */}
                {/*   onChange={(e) => { */}
                {/*     setProduct(e.target.value); */}
                {/*     (e.target.value); */}
                {/*   }} */}
                {/*   className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-lg-md cursor-pointer" */}
                {/* > */}
                {/*   <option value="others" className="sm:text-bg bg-white">Select Product</option> */}
                {/*   {products.map((item) => ( */}
                {/*     <option key={item.name} className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}> */}
                {/*       {item.name} */}
                {/*     </option> */}
                {/*   ))} */}
                {/* </select> */}
              </div>
              <div className="flex justify-end items-end mt-5">
                <div className="w-full md:w-1/2">
                  <button
                    type="button"
                    onClick={saveMember}
                    className="bg-green-500 text-white font-bold p-2 rounded-lg w-36 outline-none"
                  >
                    Save Member
                  </button>
                </div>
                <div className="w-full md:w-1/2">
                  {
                    fields && (
                      <p className="text-red-500 mb-3 text-xl transition-all duration-150 ease-in">
                        Please Fill All the Required Fields!
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
            {/* {user && ( */}
            {/*   <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg-lg "> */}
            {/*     <img */}
            {/*       src={user.image} */}
            {/*       className="w-10 h-10 rounded-lg-full" */}
            {/*       alt="user-profile" */}
            {/*     /> */}
            {/*     <p className="font-bold">{user.userName}</p> */}
            {/*   </div> */}
            {/* )} */}
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
};

