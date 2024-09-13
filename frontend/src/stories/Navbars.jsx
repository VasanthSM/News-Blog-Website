import React, { useState, useEffect } from 'react';
import logo1 from "../../src/assets/assets"
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CgProfile } from "react-icons/cg";
import "./Navbar.css"

const Navbar = ({
  initialDarkMode = true,
  initialIsLoggedIn = false,
  initialShowLogout = false,
}) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [showLogout, setShowLogout] = useState(initialShowLogout);

  useEffect(() => {
    const mailId = localStorage.getItem('Email');
    setIsLoggedIn(!!mailId);  
  }, []);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('Email'); 
    setIsLoggedIn(false);
    setShowLogout(false);
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <>
      <div className={`bg-${darkMode ? 'black' : 'white'} h-24 flex items-center font-sans Navbar`}>
        <img src={logo1} alt="Logo" className='w-16 h-12 ml-8'/>
        <h1 className={`ml-2 text-${darkMode ? 'white' : 'slate-900'} font-semibold text-3xl`}>MysticMemoirs</h1>
        <div className='Navbar-list flex items-center font-semibold gap-12 text-black text-lg mx-auto'>
          <Link to="/all-news" className={`text-${darkMode ? 'white' : 'slate-900'} hover:text-gray-600`}>News</Link>
          <Link to="/top-headlines" className={`text-${darkMode ? 'white' : 'slate-900'} head1 hover:text-gray-600`}>Top-Headlines</Link>
          <Link to="/entertainment" className={`text-${darkMode ? 'white' : 'slate-900'} head1 hover:text-gray-600`}>Entertainment</Link>
          <Link to="/business" className={`text-${darkMode ? 'white' : 'slate-900'} hover:text-gray-600`}>Business</Link>
          <Link to="/technology" className={`text-${darkMode ? 'white' : 'slate-900'} hover:text-gray-600`}>Technology</Link>
          <Link to="/sports" className={`text-${darkMode ? 'white' : 'slate-900'} head hover:text-gray-600`}>Sports</Link>
        </div>
        {isLoggedIn ? (
          <div 
            onClick={toggleLogout} 
            className="relative"
          >
            <CgProfile className={`text-${darkMode ? 'white' : 'slate-900'} h-6 w-6 mt-1 mr-4 cursor-pointer`} />
            {showLogout && (
              <button 
                onClick={handleLogout} 
                className="absolute top-full mt-2 right-0 bg-gray-800 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <Link to='/login' className={`text-${darkMode ? 'white' : 'slate-900'} signin Navbar-list flex font-semibold mr-4 text-black text-lg hover:text-gray-600`}>Signin</Link>
        )}
        <FormGroup className='mr-7'>
          <FormControlLabel
            control={<MaterialUISwitch  sx={{ m: 1 }} checked={darkMode} onChange={handleDarkModeToggle} />}
          />
        </FormGroup>
      </div>
      <hr className='Navbar-line'/>
    </>
  );
}

export default Navbar;
