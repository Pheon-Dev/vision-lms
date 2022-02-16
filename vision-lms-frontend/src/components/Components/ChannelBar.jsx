import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BsArrowRight, BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

const navigation = ['All', 'Registered', 'Prospects'];
const services = ['Products', 'Maintenance', 'Disbursement'];
const general = ['Monthly', 'Quarterly', 'Yearly'];

export default function ChannelBar() {
  return (
    <div className='w-50 h-full m-0 ml-16 bg-gray-200 dark:bg-gray-800 overflow-hidden shadow-lg'>
      <ChannelBlock />
      <div className='channel-container'>
        <Dropdown header='Dashboard' selections={navigation} />
        <Dropdown header='Loans' selections={services} />
        <Dropdown header='Report' selections={general} />
      </div>
    </div>
  );
};

const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' />
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
    <h5 className='channel-block-text'>Dashboard</h5>
  </div>
);

