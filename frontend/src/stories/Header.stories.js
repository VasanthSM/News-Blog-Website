// Headers.stories.js
import React from 'react';
import Headers from './Headers';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Blogs',
  component: Headers,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>]
};

const Template = (args) => <Headers {...args} />;

export const Header = Template.bind({});

Header.args = {
  heading1: 'Welcome to the News Portal',
  heading2: 'Stay Updated',
  content: 'Your ultimate source for breaking news and in-depth coverage of global events. Whether youre interested in politics, technology, entertainment, or sports, our comprehensive news platform keeps you informed with accurate and timely updates.',
  readArticles: 'Read Articles',
  ExploreCategories: 'Explore Categories',
  description: 'Join our community of avid readers and stay informed about the latest trends and stories.',
  AddBlogs: 'Add Blogs',
  BlogsList: 'Blogs List',
  Gemini : 'Gemini AI'
};
