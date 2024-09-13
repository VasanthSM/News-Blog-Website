import React, { useState, useEffect } from 'react';
import Logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionValidity, setSubscriptionValidity] = useState('');

  useEffect(() => {
    const mailId = localStorage.getItem('Email');
    setIsLoggedIn(!!mailId);

    if (mailId) {
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '{}');
      const userSubscriptions = subscriptions[mailId] || {};
      const now = new Date().toISOString();

      const validSubscription = Object.entries(userSubscriptions).find(([plan, subscription]) => {
        return new Date(subscription.endDate) > new Date(now);
      });

      if (validSubscription) {
        setIsSubscribed(true);
        const [plan, subscription] = validSubscription;
        const endDate = new Date(subscription.endDate).toLocaleDateString();
        setSubscriptionValidity(`Subscription ${endDate}`);
      } else {
        setIsSubscribed(false);
        setSubscriptionValidity('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Email');
    setIsLoggedIn(false);
    setIsSubscribed(false);
    setSubscriptionValidity('');
    setShowLogout(false);
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <>
      <div className='h-16 py-8 flex items-center justify-between px-4 md:px-8 shadow-md'>
        <div className='flex items-center'>
          <img src={Logo} alt="Logo" className='w-12 h-12' />
          <h1 className='ml-3 text-2xl font-semibold'>MysticMemoirs</h1>
        </div>
        <div className='hidden md:flex items-center space-x-6 font-semibold text-lg'>
          <Link to="/all-news" className='hover:text-gray-600 transition-colors'>News</Link>
          <Link to="/top-headlines" className='hover:text-gray-600 transition-colors'>Top-Headlines</Link>
          <Link to="/all-news" className='hover:text-gray-600 transition-colors'>General</Link>
          <Link to="/entertainment" className='hover:text-gray-600 transition-colors'>Entertainment</Link>
          <Link to="/business" className='hover:text-gray-600 transition-colors'>Business</Link>
          <Link to="/technology" className='hover:text-gray-600 transition-colors'>Technology</Link>
          <Link to="/sports" className='hover:text-gray-600 transition-colors'>Sports</Link>
          <Link to="/top-headlines" className='hover:text-gray-600 transition-colors'>Health</Link>
          <Link to="/technology" className='hover:text-gray-600 transition-colors'>Science</Link>
        </div>
        <div className='flex items-center space-x-4'>
          {isLoggedIn ? (
            <>
              <div className="relative flex items-center">
                <CgProfile className='text-3xl cursor-pointer' onClick={toggleLogout} />
                {showLogout && (
                  <button onClick={handleLogout} className="absolute top-10 right-0 bg-gray-800 text-white py-2 px-4 rounded-md shadow-lg z-20">
                    Logout
                  </button>
                )}
              </div>
              {isSubscribed ? (
                <span className='font-semibold text-sm p-2 rounded-md bg-gray-400'>
                  {subscriptionValidity}
                </span>
              ) : (
                <Link to='/subscription' className='bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-800 transition-colors'>
                  Subscription
                </Link>
              )}
            </>
          ) : (
            <Link to='/signin' className='text-lg hover:text-gray-600 transition-colors'>Signin</Link>
          )}
        </div>
      </div>
      <hr className='border-gray-300' />
    </>
  );
}

export default Navbar;
