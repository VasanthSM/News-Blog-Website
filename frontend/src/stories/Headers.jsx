import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AvatarGroup from '@mui/material/AvatarGroup';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Avatarimg } from '../assets/assets';
import { SiGooglegemini } from "react-icons/si";
import "./header.css"

const Headers = ({heading1,heading2,content,AddBlogs,BlogsList,description,readArticles,ExploreCategories, Gemini} ) => {
  return (
    <div className='Header '>
      <h1 className='Heading'>{heading1}<br/> <span className='ml-0 md:ml-20'>{heading2}</span></h1>
      <p className='descrip'>{content}</p>
      <div className='articles'>
        <Link to='/top-headlines' onClick={onclick} className='art links'>{readArticles}</Link>
        <Link to='/' onClick={onclick} className='art links'>{ExploreCategories}</Link>
      </div>
      <div className='avatar'>
        <AvatarGroup max={6}>
          <Avatar alt="Reporter 1" src={Avatarimg.avatar1} />
          <Avatar alt="Reporter 2" src={Avatarimg.avatar2} />
          <Avatar alt="Reporter 3" src={Avatarimg.avatar3} />
          <Avatar alt="Reporter 4" src={Avatarimg.avatar4} />
          <Avatar alt="Reporter 5" src={Avatarimg.avatar5} />
          <Avatar alt="Reporter 6" src={Avatarimg.avatar6}/>
        </AvatarGroup>
        <div className='geminiai'>
          <Link to='/chat' className='links gemini'><SiGooglegemini className='Gemini'/>{Gemini}</Link>
        </div>
      </div>
      <p className='lab'>{description}</p>
      <div className='blogs'>
        <Fab variant="extended">
          <ArrowCircleRightIcon sx={{ mr: 1 }} />
          <Link to='/blogs' className='font-semibold links'>{AddBlogs}</Link>
        </Fab>
        <Fab variant="extended">
          <ArrowCircleRightIcon sx={{ mr: 1 }} />
          <Link to='/View-blogs' className='font-semibold links'>{BlogsList}</Link>
        </Fab>
      </div>
    </div>
  );
}

export default Headers;
