import React from "react";

export default function CreateGroup() {
  return (
    <div className="mt-5 w-full">
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
            // value={date}
            // onChange={(e) => setDate(e.target.value)}
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
            // value={branchName}
            // onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-wrap -mx-3 mb-6"> */}
      {/*   <div className="w-full px-3"> */}
      {/*     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password"> */}
      {/*       Password */}
      {/*     </label> */}
      {/*     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" /> */}
      {/*     <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block tracking-wide text-xs mb-2">
            <span className="uppercase text-gray-700 font-bold text-md">Role</span>
            <span className="text-red-500 italic">*</span>
          </label>
          <label className="appearance-none block w-full text-gray-700 font-bold rounded py-3 leading-tight focus:outline-none bg-white">
            Group Initiator
          </label>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block tracking-wide text-xs mb-2">
            <span className="uppercase text-gray-700 font-bold text-md">ID Number</span>
            <span className="text-red-500 italic">*</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="initiatorIdNumber"
            type="text"
            placeholder="Initiator ID ..."
          // value={branchName}
          // onChange={(e) => setBranchName(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block tracking-wide text-xs mb-2">
            <span className="uppercase text-gray-700 font-bold text-md">Mobile Phone Number</span>
            <span className="text-red-500 italic">*</span>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="initiatorNumber"
            type="tel"
            placeholder="+254 123 456 789"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="appearance-none block w-full text-gray-700 font-bold rounded py-3 leading-tight focus:outline-none bg-white">
            Group Leader
          </label>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="leaderIdNumber"
            type="text"
            placeholder="Leader ID ..."
          // value={branchName}
          // onChange={(e) => setBranchName(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="leaderNumber"
            type="tel"
            placeholder="+254 123 456 789"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center w-full flex-wrap -mx-3 mt-9">
        <div className="flex flex-col uppercase text-xl text-gray-700 mb-5 items-center sm:text-xl font-semibold p-2">Group Members</div>
        <div className="flex flex-wrap -mx-3">
          <div className="ml-6 px-3 md:mb-0">
          </div>
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
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="px-3 mb-6 md:mb-0">
          <label className="appearance-none block text-gray-700 font-bold rounded py-3 leading-tight focus:outline-none bg-white">
            1
          </label>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="memberNameOne"
            type="text"
            list="1"
            placeholder="Surname Other Names"
          // value={date}
          // onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="memberIdOne"
            type="text"
            placeholder="ID Number ..."
          // value={branchName}
          // onChange={(e) => setBranchName(e.target.value)}
          />
        </div>
      </div>
      <div className="justify-center flex">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >+ Add Member</button>
      </div>
      {/* <div className="flex flex-wrap -mx-3 mb-2"> */}
      {/*   <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"> */}
      {/*     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> */}
      {/*       Location */}
      {/*     </label> */}
      {/*     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Group Location ..." /> */}
      {/*   </div> */}
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
