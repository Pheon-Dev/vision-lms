import React from 'react';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { FaHashtag, FaMoon, FaRegBell, FaSearch, FaSun, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useDarkMode from '../../hooks/useDarkMode';
import logo from '../../assets/logo.svg'

export default function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();

  function renderNavTwo() {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ..."
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt="user-pic"
              className="w-14 h-12 rounded-lg"
            />
          </Link>
          <Link
            to="/create-member"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }
  function Search() {
    return (
      <div className="search w-1/2">
        {/* <IoMdSearch fontSize={21} className="ml-1" /> */}
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ..."
          value={searchTerm}
          onFocus={() => navigate('/search')}
          // className="p-2 w-full bg-gray-300 rounded-md outline-none"
          className="search-input"
        />
        <FaSearch size="18" className='text-secondary my-auto' />
      </div>
    );
  }
  const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun size='24' className='top-navigation-icon' />
        ) : (
          <FaMoon size='24' className='top-navigation-icon' />
        )}
      </span>
    );
  };

  const HashTagIcon = () => <FaHashtag size="20" className='title-hashtag' />;

  const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;
  const UserCircle = () => {
    return (
      <>
        {/* <FaUserCircle size='24' className='top-navigation-icon' /> */}
        <Link to={`user-profile/${user?._id}`} className="hidden md:block top-navigation-icon">
          <img
            src={user.image}
            alt="user-pic"
            className="w-12 h-12 rounded-full"
          />
        </Link>
      </>
    )
  };
  const HashtagIcon = () => <FaHashtag size='20' className='title-hashtag' />;
  const Title = () => <img src={logo} className='h-12 w-12 title-text' />;

  function renderNavBar() {
    return (
      <div className='top-navigation'>
        {/* <HashtagIcon /> */}
        <Title />
        {/* <ThemeIcon /> */}
        {Search()}
        <BellIcon />
        <UserCircle />
      </div>
    )
  }


  if (user) {
    return (
      <>
        {/* {renderNavOne()} */}
        {renderNavBar()}
      </>
    );
  }

  return null;
}
