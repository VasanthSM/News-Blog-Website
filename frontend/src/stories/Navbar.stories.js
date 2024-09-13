import React from 'react';
import Navbars from './Navbars';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Blogs',
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>]
};

const Template = (args) => <Navbars {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialDarkMode: false,
  initialIsLoggedIn: false,
  initialShowLogout: false,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  initialDarkMode: true,
  initialIsLoggedIn: false,
  initialShowLogout: false,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  initialDarkMode: false,
  initialIsLoggedIn: true,
  initialShowLogout: false,
};

export const LoggedInDarkMode = Template.bind({});
LoggedInDarkMode.args = {
  initialDarkMode: true,
  initialIsLoggedIn: true,
  initialShowLogout: false,
};

export const ShowLogout = Template.bind({});
ShowLogout.args = {
  initialDarkMode: false,
  initialIsLoggedIn: true,
  initialShowLogout: true,
};
