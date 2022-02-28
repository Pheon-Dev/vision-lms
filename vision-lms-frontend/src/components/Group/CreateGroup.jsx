import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AiFillCheckSquare, AiFillDelete, AiFillPlusCircle, AiFillPlusSquare } from "react-icons/ai"

import { client } from '../../client';

export default function CreateGroup() {
  const [fields, setFields] = useState();
  const [memberList, setMemberList] = useState("");
  const [groupList, setGroupList] = useState("");
  const [groupsList, setGroupsList] = useState("");
  const [membersList, setMembersList] = useState([{ member: "", idNumber: "" }]);
  const [date, setDate] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupInitiatorId, setGroupInitiatorId] = useState('');
  const [groupInitiatorName, setGroupInitiatorName] = useState('');
  const [groupInitiatorPhone, setGroupInitiatorPhone] = useState('');
  const [groupLeaderId, setGroupLeaderId] = useState('');
  const [groupLeaderName, setGroupLeaderName] = useState('');
  const [groupLeaderPhone, setGroupLeaderPhone] = useState('');

  const [group, setGroup] = useState('');
  const [selected, setSelected] = useState(false);
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
    const mquery = '*[_type == "member" && group == "false"]'
    const gquery = `*[_type == "member"]`

    client.fetch(mquery).then((data) => {
      setMemberList(data);
    });

    client.fetch(gquery).then((data) => {
      setGroupsList(data);
    });

    return (() => console.log('unsubscribing'));
  }, [])

  useEffect(() => {
    // const mquery = '*[_type == "member" && personalDetails.group == "false"]'
    const gquery = `*[_type == "member" && group == '${groupName}']`

    client.fetch(gquery).then((data) => {
      setGroupList(data);
    });

    return (() => console.log('unsubscribing'));
  }, [groupName])

  console.log(groupList)

  const handleMemberChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...memberList];
    list[index][name] = value;
    setMembersList(list);
    console.log('change member')
  };
  // console.log(memberList)

  const handleMemberAdd = () => {
    setMembersList([...memberList, { member: "", idNumber: "" }]);
    console.log(membersList)
  };

  const handleDeleteGroupMember = (index) => {
    const list = [...memberList];
    list.splice(index, 1);
    setGroupList(list);
  };

  const handleDeleteMember = (index) => {
    const list = [...memberList];
    list.splice(index, 1);
    setMemberList(list);
  };

  const handleSelected = (index) => {
    <AiFillCheckSquare size="24" key={index} />
  }
  function handleAddMember() {
    client
      .patch(memberList[0]?._id)
      // .set({ group: groupName })
      .setIfMissing({ groupMembers: [] })
      .insert('after', 'groupMembers[-1]', [{
        groupMemberName: memberList[0]?.personalDetails.otherNames,
        groupMemberId: memberList[0]?.memberNumber
      }])
      .commit()
      .then((update) => console.log(update));
  }

  const handleGroupSave = () => {
    setGroupLeaderName(lead_names);
    setGroupLeaderId(lead_id);
    setGroupInitiatorName(init_names);
    setGroupInitiatorId(init_id);
    setGroup(groupName)
    if (
      date &&
      groupName &&
      group &&
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
        group,
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
        navigate('/');
      });
      // navigate('/group')
    } else {
      setFields(true);
      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
    // navigate("/create-group")
  };

  function renderMembersSelected() {
    return (
      <>
        {groupList && groupList.length !== 0 && (
          <label className="flex justify-center ml-auto mr-auto text-gray-700 text-xl font-bold mb-2">
            Selected Group Members
          </label>
        )}
        {groupList && groupList.map((singleMember, index) => (
          <div key={index}>
            <div className="flex flex-wrap -mx-3 mb-2">
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
                  value={singleMember?.memberNumber}
                  // value={singleMember.idNumber}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </div>
              {groupList.length !== 0 && groupName && (
                <>
                  <span>
                    <button
                      onClick={() => {
                        client
                          .patch(singleMember._id)
                          .set({ group: "false" })
                          .commit()
                          .then(() => { handleDeleteGroupMember(index) });
                      }}
                      type="button"
                      className="text-red-400 hover:text-red-600 p-2 mt-1 font-bold"
                    >
                      <AiFillDelete size="24" />
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </>
    )
  }

  function renderMemberSelection() {
    return (
      <>
        {memberList.length !== 0 ?
          <label className="flex justify-center ml-auto mr-auto text-gray-700 text-xl font-bold mb-2">
            Select Group Members
          </label>
          : null
        }
        {memberList && memberList.map((singleMember, index) => (
          <div key={index}>
            <div className="flex flex-wrap -mx-3 mb-2">
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
                  value={singleMember?.memberNumber}
                  // value={singleMember.idNumber}
                  onChange={(e) => handleMemberChange(e, index)}
                  required
                />
              </div>
              {memberList.length !== 0 && groupName && (
                <>
                  <span>
                    <button
                      onClick={() => {
                        client
                          .patch(singleMember._id)
                          .set({ group: groupName })
                          .commit()
                          .then(() => { handleDeleteMember(index) });
                      }}
                      type="button"
                      // className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      className="text-blue-500 hover:text-blue-700 p-2 mt-1 font-bold"
                    >
                      <AiFillPlusCircle onClick={() => handleSelected(index)} size="24" />
                    </button>
                  </span>
                  {/* <span> */}
                  {/*   <button */}
                  {/*     onClick={() => handleDeleteMember(index)} */}
                  {/*     type="button" */}
                  {/*     // className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
                  {/*     className="text-red-400 hover:text-red-600 p-2 mt-1 font-bold" */}
                  {/*   > */}
                  {/*     <AiFillDelete size="24" /> */}
                  {/*   </button> */}
                  {/* </span> */}
                </>
              )}
            </div>
            {/* {memberList.length - 1 === index && memberList.length < 10 && ( */}
            {/*   <div className="justify-center items-center ml-8"> */}
            {/*     <button */}
            {/*       // onClick={handleMemberSave} */}
            {/*       type="button" */}
            {/*       className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
            {/*     > */}
            {/*       « Save Member » */}
            {/*     </button> */}
            {/*     <button */}
            {/*       onClick={handleMemberAdd} */}
            {/*       type="button" */}
            {/*       className="bg-blue-500 m-2 w-1/3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" */}
            {/*     > */}
            {/*       + Add a Member + */}
            {/*     </button> */}
            {/*   </div> */}
            {/* )} */}
          </div>
        ))}
      </>
    )
  }

  function renderLeadersSelection() {
    return (
      <div className="flex flex-wrap ml-auto mr-auto mt-8 -mx-3 mb-9">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Select the Group Initiator
          </label>
          <div className="relative">
            <select value={groupInitiatorName} onChange={(e) => setGroupInitiatorName(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option
                className="text-gray-500"
              >Select ...</option>
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
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Select the Group Leader
          </label>
          <div className="relative">
            <select value={groupLeaderName} onChange={(e) => setGroupLeaderName(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option
                className="text-gray-500"
              >Select ...</option>
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
      </div>
    )
  }

  function renderGroupInfo() {
    return (
      <>
        <div className="flex flex-col uppercase text-2xl text-gray-700 mb-5 items-center sm:text-2xl font-semibold p-2">New Group</div>
        <div className="flex flex-wrap justify-center w-full ml-auto mr-auto -mx-0 mb-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/3 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Select the Group Name
              </label>
              <div className="relative">
                <select value={groupName} onChange={(e) => setGroupName(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option
                    className="text-gray-500"
                  >Select ...</option>
                  {groupsList && (
                    groupsList?.map((group, index) => (
                      <option key={index.toString()}>{group.group}</option>
                    )
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
            <div className="w-full md:w-1/3 px-3">
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
      </>
    )
  }

  return (
    <>
      {renderGroupInfo()}
      {renderLeadersSelection()}
      {renderMemberSelection()}
      {renderMembersSelected()}
      {
        !memberList ?
          <label className="flex justify-center ml-auto mr-auto text-gray-700 text-xl font-bold mb-2">
            <span className="text-red-500">
              All
            </span>
            <span className="text-gray-500 ml-1">
              members are already in a group.
            </span>
          </label>
          :
          <div className="flex justify-center ml-auto mr-auto w-full mt-9">
            <button
              onClick={handleGroupSave}
              type="button"
              className="bg-green-500 w-1/3 hover:bg-green-700 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Group
              {/* » Add Members ↓ */}
            </button>
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
          </div>
      }
    </>
  )
}

