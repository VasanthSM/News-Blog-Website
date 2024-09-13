import React from 'react';
import { action } from '@storybook/addon-actions';
import Addblogs from './Addblogs';

export default {
  title: 'Blogs',
  component: Addblogs,
};

const Template = (args) => <Addblogs {...args} />;

export const Navbar = Template.bind({});
Navbar.args = {
  Add: 'Add', 
  AddBlogs: 'Add Blogs', 
  Author: 'Author', 
  Title: 'Title', 
  Description: 'Description',
  Category: 'Category', 
  onSubmit: action('submit'), 
};
