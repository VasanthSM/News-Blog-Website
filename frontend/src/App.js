import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import NewsPage from './components/NewsPage/NewsPage';
import TopHeadlines from './components/Categories/TopHeadlines';
import Business from './components/Categories/Business';
import Sports from './components/Categories/Sports';
import ViewBlogs from './components/Blogs/ViewBlogs';
import Entertainment from './components/Categories/Entertainment';
import Blog from './components/Blogs/Blogs';
import Likes from './components/Blogs/Likes';
import Chatbot from './components/chatbot/Chatbot';
import SignUp from './components/Pages/Signin/Signin';
import LogIn from './components/Pages/Login/Login';
import ProtectedRoute from './ProtectedRoutes';
import Subscription from './components/Pages/premium/Subscription';
import Technology from './components/Categories/Technology';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/all-news' element={<NewsPage />} />
        <Route path='/top-headlines' element={<TopHeadlines />} />
        <Route path='/business' element={<Business />} />
        <Route path='/entertainment' element={<Entertainment />} />
        <Route path='/technology' element={<Technology />} />
        <Route path='/sports' element={<Sports />} />
        <Route path='/blogs' element={
          <ProtectedRoute>
            <Blog Add='Add' AddBlogs='Add Blogs' Name='Name' Author='Author' Title='Title' Description='Description' Category='Category' />
          </ProtectedRoute>
        } />
        <Route path='/view-blogs' element={
          <ProtectedRoute>
            <ViewBlogs />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<LogIn />} />
        <Route path='/blogs/:id' element={<Likes />} />
        <Route path='/chat' element={<Chatbot />} />
        <Route path='/signin' element={<SignUp />} />
        <Route path='/subscription' element={<Subscription />} />
      </Routes>
    </div>
  );
}

export default App;
