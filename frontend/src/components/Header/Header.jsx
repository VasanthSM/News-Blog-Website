import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AvatarGroup from '@mui/material/AvatarGroup';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatarimg } from '../../assets/assets';
import { SiGooglegemini } from "react-icons/si";
import '../../index.css';
import Navbar from '../Navbar/Navbar';
import NewsBanner from '../NewsPage/NewsBanner';
import HeaderNews from '../NewsPage/HeaderNews';

// Left Sidebar Component
const LeftSideBar = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(() => {
    const apiKey = '2db57dc5193d416e95d51bec2df29c78'; 
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=40&apiKey=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch news articles');
      });
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className='bg-gray-100 p-4'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Top News</h2>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex-1 overflow-y-scroll'>
          <ul className='space-y-4'>
            {articles.map((article, index) => (
              <li key={index} className='flex gap-4 items-start border-b pb-4'>
                {article.urlToImage && 
                  <img src={article.urlToImage} alt={article.source.name} className='w-16 h-16 object-cover rounded-md shadow-md' />}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className='flex-1 text-sm text-gray-700 hover:text-blue-600'>
                  {truncateText(article.title, 100)}
                </a>
              </li>
            ))}
          </ul>
          {error && <p className='text-red-500 text-center py-4'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

// Right Sidebar Component
const RightSideBar = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(() => {
    const apiKey = '2db57dc5193d416e95d51bec2df29c78'; 
    const url = `https://newsapi.org/v2/top-headlines?language=en&page=1&pageSize=40&apiKey=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch news articles');
      });
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className='bg-gray-100 p-4'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Top News</h2>
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex-1 overflow-y-scroll'>
          <ul className='space-y-4'>
            {articles.map((article, index) => (
              <li key={index} className='flex gap-4 items-start border-b pb-4'>
                {article.urlToImage && 
                  <img src={article.urlToImage} alt={article.source.name} className='w-16 h-16 object-cover rounded-md shadow-md' />}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className='flex-1 text-sm text-gray-700 hover:text-blue-600'>
                  {truncateText(article.title, 100)}
                </a>
              </li>
            ))}
          </ul>
          {error && <p className='text-red-500 text-center py-4'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

const MainLayout = () => {
  // const [adsVisible, setAdsVisible] = useState(true);
  // const [isSubscribed, setIsSubscribed] = useState(false);

  // const checkSubscriptionStatus = () => {
  //   const mailId = localStorage.getItem('Email');
  //   if (mailId) {
  //     const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '{}');
  //     const userSubscriptions = subscriptions[mailId] || {};
  //     const now = new Date().toISOString();

  //     const validSubscription = Object.entries(userSubscriptions).find(([plan, subscription]) => {
  //       return new Date(subscription.endDate) > new Date(now);
  //     });

  //     if (validSubscription) {
  //       setIsSubscribed(true);
  //       setAdsVisible(false);
  //     } else {
  //       setIsSubscribed(false);
  //       setAdsVisible(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   checkSubscriptionStatus();
  //   const adTimeout = setInterval(() => {
  //     setAdsVisible(true);
  //   }, 10000);

  //   return () => clearInterval(adTimeout);
  // }, []);

  // const handleAdRemove = () => {
  //   setAdsVisible(false);
  // };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>   

      <div>
        <NewsBanner />
      </div>

      <div className="min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
          <div className="col-span-1 bg-gray-100 p-4">
            <LeftSideBar />
          </div>

          <div className="col-span-1 md:col-span-2 bg-gray-50">
            <div className='flex flex-col items-center justify-center py-10 bg-gray-100'>
              <div className='max-w-4xl w-full bg-white shadow-lg p-4 rounded-lg'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4 md:mb-6'>
                  Stay Informed with<br />
                  <span className='text-blue-600'>Our Latest News Updates</span>
                </h1>
                <p className='text-base md:text-lg text-gray-700 mb-6 text-center'>
                  Your ultimate source for breaking news and in-depth coverage of global events. Whether you're interested in technology, entertainment, or sports, our comprehensive news platform keeps you informed with accurate and timely updates.
                </p>
                <div className='flex flex-col md:flex-row justify-center gap-4 mb-6'>
                  <Link to='/top-headlines' className='bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition duration-300'>
                    Read Latest Articles
                  </Link>
                  <Link to='/' className='bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition duration-300'>
                    Explore Categories
                  </Link>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-center gap-4 mb-6'>
                  <AvatarGroup max={5}>
                    <Avatar alt="Reporter 1" src={Avatarimg.avatar1} />
                    <Avatar alt="Reporter 2" src={Avatarimg.avatar2} />
                    <Avatar alt="Reporter 3" src={Avatarimg.avatar3} />
                    <Avatar alt="Reporter 4" src={Avatarimg.avatar4} />
                    <Avatar alt="Reporter 5" src={Avatarimg.avatar5} />
                  </AvatarGroup>
                  <Link to='/chat' className='flex items-center'>
                    <SiGooglegemini className='text-blue-600 text-2xl md:text-3xl cursor-pointer hover:text-blue-500 transition duration-300' /> 
                    <h3 className='mt-1 ml-2 font-semibold'>GeminiAi</h3>
                  </Link>
                </div>
                <p className='text-base md:text-lg text-gray-700 text-center'>
                  Stay connected with our team of dedicated journalists and analysts, providing you with reliable news coverage and insightful perspectives.
                </p>
                <div className='flex flex-col md:flex-row justify-center gap-4 mt-6'>
                  <Fab variant="extended" className='bg-blue-600 text-white hover:bg-blue-500 transition duration-300'>
                    <ArrowCircleRightIcon sx={{ mr: 1 }} />
                    <Link to='/blogs' className='font-semibold'>Add Blogs</Link>
                  </Fab>
                  <Fab variant="extended" className='bg-blue-600 text-white hover:bg-blue-500 transition duration-300'>
                    <ArrowCircleRightIcon sx={{ mr: 1 }} />
                    <Link to='/View-blogs' className='font-semibold'>Blogs List</Link>
                  </Fab>
                </div>
              </div>
            </div>
            <div className='grid-cols-2'>
              <HeaderNews />
            </div>
          </div>
          <div className="col-span-1 bg-gray-100 p-4">
            <RightSideBar />
          </div>

          {/* <div className="col-span-1 sticky top-16 bg-gray-100 p-4">
            {adsVisible && !isSubscribed && (
              <div className='space-y-3'>
                <div className='bg-gray-300 rounded-lg shadow-md overflow-hidden'>
                  <div className='flex justify-between items-center px-2 py-1 bg-gray-400 text-gray-700'>
                    <p className='text-xs'>Advertisement</p>
                    <button onClick={handleAdRemove} className='text-xs text-red-500'>Remove</button>
                  </div>
                  <img src={Avatarimg.image1} alt="Ad 1" className='w-full h-full object-cover' />    
                </div>
                <div className='bg-gray-300 rounded-lg shadow-md overflow-hidden'>
                  <div className='flex justify-between items-center px-2 py-1 bg-gray-400 text-gray-700'>
                    <p className='text-xs'>Advertisement</p>
                    <button onClick={handleAdRemove} className='text-xs text-red-500'>Remove</button>
                  </div>
                  <img src={Avatarimg.image2} alt="Ad 2" className='w-full h-full object-cover' />    
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
