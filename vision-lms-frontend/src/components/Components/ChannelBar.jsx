import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BsArrowRight,
  BsBookmark,
  BsBookmarkFill,
} from 'react-icons/bs';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const apps = [
  {
    name: 'Profit & Loss',
    url: '/apps/expenses',
  },
];
const members = [
  {
    name: 'New Member',
    url: '/member/create-member',
  },
  {
    name: 'All Members',
    url: '/member/',
  },
];
const groups = [
  {
    name: 'New Group',
    url: '/group/create-group',
  },
  {
    name: 'All Groups',
    url: '/group/groups',
  },
];
const products = [
  {
    name: 'New Product',
    url: '/loan/new-product',
  },
  {
    name: 'All Products',
    url: '/loan/products',
  },
];

const loans = [
  {
    name: 'New Loan',
    url: '/loan/create-loan',
  },
  {
    name: 'Approvals',
    url: '/loan/approvals',
  },
  {
    name: 'Disbursments',
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
];
const dashboard = [
  {
    name: 'Dashboard',
    url: '/',
  },
];
const reports = [
  {
    name: 'PAR Report',
    url: '/report/par-report',
  },
  {
    name: 'Schedules',
    url: '/report/schedule-report',
  },
];

const isNotActiveStyle = 'dropdown-selection-text';
const isActiveStyle = 'dropdown-selection-text text-cyan-500';

export default function ChannelBar() {
  return (
    <div className="w-full h-full mr-0 m-0 ml-16 bg-gray-800 dark:bg-gray-800 overflow-hidden shadow-lg">
      <ChannelBlock />
      <div className="channel-container">
        <Dropdown data={dashboard} title="Home" />
        <Dropdown data={members} title="Members" />
        <Dropdown data={groups} title="Groups" />
        <Dropdown data={products} title="Products" />
        <Dropdown data={loans} title="Loans" />
        <Dropdown data={apps} title="Apps" />
        <Dropdown data={reports} title="Reports" />
      </div>
    </div>
  );
}

const Dropdown = ({ closeToggle, data, title }) => {
  const [expanded, setExpanded] = useState(true);
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="dropdown mr-2">
      <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
        <ChevronIcon expanded={expanded} />
        <h5
          className={
            expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'
          }
        >
    {title}
        </h5>
        {!expanded ? (
          <BsBookmark
            size="12"
            className="text-gray-500 text-opacity-80 my-auto ml-auto"
          />
        ) : (
          <BsBookmarkFill
            size="12"
            className="text-gray-500 text-opacity-80 my-auto ml-auto"
          />
        )}
      </div>
      {expanded &&
        data.slice(0, data.length - 0).map((item) => (
          <div key={item.name} className="dropdown-selection">
            <BsArrowRight size="8" className="text-gray-400 m-2" />
            <NavLink
              to={item.url}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              {item.name}
            </NavLink>
          </div>
        ))}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size="14" className={chevClass} />
  ) : (
    <FaChevronRight size="14" className={chevClass} />
  );
};

const ChannelBlock = () => (
  <div className="channel-block">
    <h5 className="channel-block-text">Vision LMS</h5>
  </div>
);
