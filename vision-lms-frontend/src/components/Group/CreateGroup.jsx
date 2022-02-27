import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai"

import { client } from '../../client';

export default function CreateGroup() {
  const [memberList, setMemberList] = useState("");
  const [membersList, setMembersList] = useState([{ member: "", idNumber: "" }]);
  const [date, setDate] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupInitiatorId, setGroupInitiatorId] = useState('');
  const [groupInitiatorName, setGroupInitiatorName] = useState('');
  const [groupInitiatorPhone, setGroupInitiatorPhone] = useState('');
  const [groupLeaderId, setGroupLeaderId] = useState('');
  const [groupLeaderName, setGroupLeaderName] = useState('');
  const [groupLeaderPhone, setGroupLeaderPhone] = useState('');

  const navigate = useNavigate();

  const lead_id = groupInitiatorName.split(' ')[0]
  const lead_sname = groupInitiatorName.split(' ')[1]
  const lead_oname = groupInitiatorName.split(' ')[2] + ' ' + groupInitiatorName.split(' ')[3]
  const lead_names = lead_sname + ' ' + lead_oname

  const init_id = groupInitiatorName.split(' ')[0]
  const init_sname = groupInitiatorName.split(' ')[1]
  const init_oname = groupInitiatorName.split(' ')[2] + ' ' + groupInitiatorName.split(' ')[3]
  const init_names = init_sname + ' ' + init_oname

  useEffect(() => {
    const mquery = '*[_type == "member" && personalDetails.group == "false"]'
    // const memberQuery = `*[_type == "member" && memberNumber match '${id}' || personalDetails.surName match '${sname}' || personalDetails.otherNames match '${oname}']`;

    client.fetch(mquery).then((data) => {
      setMemberList(data);
    });

    return (() => console.log('unsubscribing'));
  }, [])


  const handleMemberChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...memberList];
    list[index][name] = value;
    setMembersList(list);
    console.log('change member')
  };
  console.log(memberList)

  const handleMemberAdd = () => {
    // setMemberList([...memberList, { member: "", idNumber: "" }]);
    console.log('add member')
  };

  const handleMemberDelete = (index) => {
    const list = [...memberList];
    list.splice(index, 1);
    setMemberList(list);
  };

  const handleAddMember = () => {
    let counter = 0;
    // if (counter > memberList.length) {
    //   return console.log('No more members to add!')
    // } 
    while (counter < memberList.length) {
      const { name, value } = [' ', ' '];
      let id = ' ';
      let nm = ' ';
      id = memberList[counter]?.personalDetails?.idPass
      nm = memberList[counter]?.personalDetails?.surName
      const list = [...membersList];
      // console.log(list);
      list[counter][name] = value;
      // console.log(list);
      counter++;
      console.log(counter);
    }
  }

  const handleGroupSave = () => {
    setGroupLeaderName(lead_names);
    setGroupLeaderId(lead_id);
    setGroupInitiatorName(init_names);
    setGroupInitiatorId(init_id);
    if (
      date &&
      groupName &&
      groupInitiatorId &&
      groupInitiatorName &&
      // groupInitiatorPhone &&
      groupLeaderId &&
      // groupLeaderPhone &&
      groupLeaderName
    ) {
      console.log(date, groupName);
      const doc = {
        _type: 'groups',
        date,
        groupName,
        groupInitiatorId,
        groupInitiatorName,
        // groupInitiatorPhone,
        groupLeaderId,
        groupLeaderName,
        // groupLeaderPhone
      };
      client.create(doc).then(() => {
        alert('Group Created Successfully');
        console.log(doc);
        // navigate('/');
      });
      // navigate('/group')
    }
    // navigate("/create-group")
  };

  function renderLeadersSelection() {
    return (
      <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Select the Group Initiator
          </label>
          <div className="relative">
            <select value={groupInitiatorName} onChange={(e) => setGroupInitiatorName(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {/* <option */}
              {/*   className="text-gray-500" */}
              {/* >Select a Product ...</option> */}
              {memberList && (
                memberList?.map((member, index) => (
                  <option key={index.toString()}>{member?.memberNumber + ' ' + member?.personalDetails?.surName + ' ' + member?.personalDetails?.otherNames}</option>
                )
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mt-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Select the Group Leader
          </label>
          <div className="relative">
            <select value={groupLeaderName} onChange={(e) => setGroupLeaderName(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {/* <option */}
              {/*   className="text-gray-500" */}
              {/* >Select a Member ...</option> */}
              {
                memberList && (
                  memberList?.map((member, index) => (
                    <option key={index.toString()}>{member?.memberNumber + ' ' + member?.personalDetails?.surName + ' ' + member?.personalDetails?.otherNames}</option>
                  )
                  ))
              }
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center ml-auto mr-auto w-full mt-9">
          <button
            onClick={handleGroupSave}
            type="button"
            className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
            {/* » Add Members ↓ */}
          </button>
        </div>
      </div>
    )
  }

  function renderGroupInfo() {
    return (
      // <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-6">
      <div className="flex flex-wrap justify-center w-full ml-auto mr-auto -mx-0 mb-6">
        <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">Group Data From</div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Date</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="date"
              type="date"
              placeholder="Date ..."
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block tracking-wide text-xs mb-2">
              <span className="uppercase text-gray-700 font-bold text-md">Group Name</span>
              <span className="text-red-500 italic">*</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="groupName"
              type="text"
              placeholder="Group Name ..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }

  function renderGroup() {
    return (
      <div className="ml-5 mt-5 w-full">
        <div className="flex flex-col justify-center w-full flex-wrap -mx-3 mb-6">
          <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">Group Data From</div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Date</span>
                <span className="text-red-500 italic">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="date"
                type="date"
                placeholder="Date ..."
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-xs mb-2">
                <span className="uppercase text-gray-700 font-bold text-md">Group Name</span>
                <span className="text-red-500 italic">*</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="groupName"
                type="text"
                placeholder="Group Name ..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <span className="uppercase text-gray-700 font-bold text-md">
          Group Initiator
        </span>
        <div className="flex flex-wrap -mx-5 mb-7">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="initiatorIdNumber"
              type="text"
              placeholder="Initiator Names ..."
              value={groupInitiatorName}
              onChange={(e) => setGroupInitiatorName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="initiatorIdNumber"
              type="text"
              placeholder="Initiator ID ..."
              value={groupInitiatorId}
              onChange={(e) => setGroupInitiatorId(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="initiatorNumber"
              type="tel"
              placeholder="+254 123 456 789"
              value={groupInitiatorPhone}
              onChange={(e) => setGroupInitiatorPhone(e.target.value)}
            />
          </div>
        </div>
        <span className="uppercase text-gray-700 font-bold text-md">
          Group Leader
        </span>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="leaderIdNumber"
              type="text"
              placeholder="Leader Names ..."
              value={groupLeaderName}
              onChange={(e) => setGroupLeaderName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="leaderIdNumber"
              type="text"
              placeholder="Leader ID ..."
              value={groupLeaderId}
              onChange={(e) => setGroupLeaderId(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="leaderNumber"
              type="tel"
              placeholder="+254 123 456 789"
              value={groupLeaderPhone}
              onChange={(e) => setGroupLeaderPhone(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleGroupSave}
          type="button"
          className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          » Add Members ↓
        </button>
        <div className="flex flex-col justify-center w-full flex-wrap -mx-3 mt-9">
          <div className="flex flex-col uppercase text-xl text-gray-700 mb-5 items-center sm:text-xl font-semibold p-2">
            Add Members
            {/* » Add Members ↓ */}
          </div>
          <div className="flex ml-8 -mx-3">
            <div className="w-full md:w-1/3 px-3 md:mb-0">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">Member Names</span>
                <span className="text-red-500 italic">*</span>
              </label>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label className="block tracking-wide text-xs">
                <span className="uppercase text-gray-700 font-bold text-md">ID Number</span>
                <span className="text-red-500 italic">*</span>
              </label>
            </div>
          </div>
        </div>
        {memberList.map((singleMember, index) => (
          <div key={index}>
            <div className="flex flex-wrap -mx-3 mb-2">
              {/* <div className="px-3 mb-6 md:mb-0 md:w-1/4"> */}
              {/*   <label className="appearance-none block text-gray-700 font-bold rounded py-3 leading-tight focus:outline-none bg-white"> */}
              {/*     {index + 1} */}
              {/*   </label> */}
              {/* </div> */}
              <span className="font-bold text-gray-700 p-2 mt-1">{index + 1}.</span>
              <div className="w-1/3 md:w-1/3 px-3 mb-1 md:mb-0">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="memberName"
                  type="text"
                  name="member"
                  placeholder="Full Names ..."
                  value={singleMember?.personalDetails?.surName + ' ' + singleMember?.personalDetails?.otherNames}
                  // value={singleMember.member}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </div>
              <div className="w-1/3 md:w-1/3 px-3 mb-1 md:mb-0">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="idNumber"
                  type="text"
                  name="idNumber"
                  placeholder="ID Number ..."
                  value={singleMember?.personalDetails?.idPass}
                  // value={singleMember.idNumber}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </div>
              {memberList.length !== 1 && (
                <span>
                  <button
                    onClick={() => handleAddMember(index)}
                    // onClick={() => handleMemberDelete(index)}
                    type="button"
                    // className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    className="text-red-400 hover:text-red-600 p-2 mt-1 font-bold"
                  >
                    <AiFillDelete />
                  </button>
                </span>
              )}
            </div>
            {memberList.length - 1 === index && memberList.length < 10 && (
              <div className="justify-center items-center ml-8">
                <button
                  // onClick={handleMemberSave}
                  type="button"
                  className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  « Save Member »
                </button>
                <button
                  onClick={handleMemberAdd}
                  type="button"
                  className="bg-blue-500 m-2 w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  + Add a Member +
                </button>
              </div>
            )}
          </div>
        ))}
        {/* <div className="flex flex-wrap -mx-3 mb-2"> */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Select Members
          </label>
          {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Group Location ..." /> */}
        </div>
        {/*   <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"> */}
        {/*     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> */}
        {/*       Area */}
        {/*     </label> */}
        {/*     <div className="relative"> */}
        {/*       <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"> */}
        {/*         <option>Annex</option> */}
        {/*         <option>Langas</option> */}
        {/*         <option>West Indies</option> */}
        {/*       </select> */}
        {/*       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"> */}
        {/*         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </div> */}
        {/*   <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"> */}
        {/*     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> */}
        {/*       Zip */}
        {/*     </label> */}
        {/*     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" /> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    )
  }
  return (
    <>
      {renderGroupInfo()}
      {renderLeadersSelection()}
    </>
  )
}

