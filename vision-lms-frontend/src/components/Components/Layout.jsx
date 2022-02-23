import React from "react";
import Masonry from 'react-masonry-css';
import { Member } from '../Member';

const Layout = ({ members }) => {
  return (
    <div className="flex flex-col mt-5">
      <div className="font-bold flex justify-center w-full text-xl">
        All Registered Members
      </div>
      <br />
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 border-b-2 border-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th> */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  {/* <th scope="col" className="relative px-6 py-3"> */}
                  {/*   <span className="sr-only">Edit</span> */}
                  {/* </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members?.map((member) => <Member key={member._id} member={member} className="w-max" />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

