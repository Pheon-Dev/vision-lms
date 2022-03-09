import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { BsArrowRight, BsBookmark, BsBookmarkFill, BsBookmarks, BsBookmarksFill, BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';
// import { products } from "../../utils/data";

const members = [
  {
    name: 'New Member',
    url: '/member/create-member',
  },
  {
    name: 'All Members',
    url: '/',
  }
];
const groups = [
  {
    name: 'New Group',
    url: '/group/create-group',
  },
  {
    name: 'All Groups',
    url: '/group/groups',
  }
];
const products = [
  {
    name: 'New Product',
    url: '/loan/new-product',
  },
  {
    name: 'All Products',
    url: '/loan/products',
  }
];

const loans = [
  {
    name: 'New Loan',
    url: '/loan/create-loan',
  },
  // {
  //   name: 'Preview Loans',
  //   url: '/loan',
  // },
  {
    name: 'Pending Approval',
    url: '/loan/approvals',
  },
  {
    name: 'Pending Disbursal',
    url: '/loan/disbursements',
  },
  {
    name: 'Payments',
    url: '/loan/payments',
  },
  {
    name: 'All Loans',
    url: '/loan/',
  },
]
const reports = [
  {
    name: 'PAR Report',
    url: '/report/par-report'
  },
  // {
  //   name: 'Statements',
  //   url: '/report/statements'
  // },
  {
    name: 'Schedules',
    url: '/report/schedule-report'
  },
  // {
  //   name: 'Yearly',
  //   url: '/report/yearly-report'
  // },
];

const isNotActiveStyle = 'dropdown-selection-text';
const isActiveStyle = 'dropdown-selection-text text-cyan-500';

export default function ChannelBar() {
  return (
    <div className='w-full h-full mr-0 m-0 ml-16 bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-lg'>
      <ChannelBlock />
      <div className='channel-container'>
        <MembersDropdown />
        <GroupsDropdown />
        <ProductsDropdown />
        <LoansDropdown />
        <ReportsDropdown />
        {/* <Dropdown header='Report' selections={reports} /> */}
      </div>
    </div>
  );
};

const ReportsDropdown = ({ closeToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };


  return (
    <div className='dropdown mr-2'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          Reports
        </h5>
        {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
        {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
      </div>
      {expanded && reports.slice(0, reports.length - 0).map((report) => (
        <div key={report.name} className="dropdown-selection">
          <BsArrowRight size='8' className="text-gray-400 m-2" />
          <NavLink
            to={report.url}
            onClick={handleCloseSidebar}
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          >
            {report.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const LoansDropdown = ({ closeToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };


  return (
    <div className='dropdown mr-2'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          Loans
        </h5>
        {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
        {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
      </div>
      {expanded && loans.slice(0, loans.length - 0).map((loan) => (
        <div key={loan.name} className="dropdown-selection">
          <BsArrowRight size='8' className="text-gray-400 m-2" />
          <NavLink
            to={loan.url}
            onClick={handleCloseSidebar}
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          >
            {loan.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const GroupsDropdown = ({ closeToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };


  return (
    <div className='dropdown mr-2'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          Groups
        </h5>
        {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
        {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
      </div>
      {expanded && groups.slice(0, groups.length - 0).map((group) => (
        <div key={group.name} className="dropdown-selection">
          <BsArrowRight size='8' className="text-gray-400 m-2" />
          <NavLink
            to={group.url}
            onClick={handleCloseSidebar}
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
          >
            {group.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const MembersDropdown = ({ closeToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };


  return (
    <div className='dropdown mr-2'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          Members
        </h5>
        {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
        {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
      </div>
      {expanded && members.slice(0, members.length - 0).map((member) => (
        <div key={member.name} className="dropdown-selection">
          <BsArrowRight size='8' className="text-gray-400 m-2" />
          <NavLink
            to={member.url}
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            {member.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const ProductsDropdown = ({ closeToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) return closeToggle(false);
  };


  return (
    <div className='dropdown mr-2'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          Products
        </h5>
        {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
        {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
      </div>
      {expanded && products.slice(0, products.length - 0).map((product) => (
        <div key={product.name} className="dropdown-selection">
          <BsArrowRight size='8' className="text-gray-400 m-2" />
          <NavLink
            to={product.url}
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            {product.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

// const ProductsDropdown = () => {
//   const [expanded, setExpanded] = useState(true);

//   return (
//     <div className='dropdown mr-2'>
//       <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
//         <ChevronIcon expanded={expanded} />
//         <h5
//           className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
//         >
//           Products
//         </h5>
//         {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
//         {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
//       </div>
//       <div className="dropdown-selection">
//         <BsArrowRight size='8' className="text-gray-400 m-2" />
//         <NavLink
//           to="/loan/new-product"
//           className="dropdown-selection-text"
//         >
//           New Product
//         </NavLink>
//       </div>
//       <div className="dropdown-selection">
//         <BsArrowRight size='8' className="text-gray-400 m-2" />
//         <NavLink
//           to="/loan/products"
//           className="dropdown-selection-text"
//         >
//           All Product
//         </NavLink>
//       </div>
//       {expanded && products.slice(0, products.length - 0).map((product) => (
//         <div key={product.name} className="dropdown-selection">
//           <BsArrowRight size='8' className="text-gray-400 m-2" />
//           <NavLink
//             to={`/product/${product.name}`}
//             className="dropdown-selection-text"
//           >
//             {product.name}
//           </NavLink>
//         </div>
//       ))}
//     </div>
//   );
// };

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown mr-2'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        {!expanded ? <BsBookmark size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' /> : <BsBookmarkFill size='12' className='text-gray-500 text-opacity-80 my-auto ml-auto' />}
        {/* <BsBookmarks size='12' className='text-cyan-500 text-opacity-80 my-auto ml-auto' /> */}
      </div>
      {expanded &&
        selections &&
        selections.map((selection, index) => <TopicSelection key={index} selection={selection} />)}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => (
  <div className='dropdown-selection'>
    <BsArrowRight size='8' className='text-gray-400 m-2' />
    <h5 className='dropdown-selection-text'>{selection}</h5>
  </div>
);

const ChannelBlock = () => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>Vision LMS</h5>
  </div>
);

