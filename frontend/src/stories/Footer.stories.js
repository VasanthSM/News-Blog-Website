
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footers from './Footers';

export default {
  title: 'Blogs',
  component: Footers,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>]
};

const Template = (args) => <Footers {...args} />;

export const Footer = Template.bind({});

Footer.args = {
    title : 'MysticMemoirs', 
    About : 'About', 
    Contact : 'Contact', 
    PrivacyPolicy : 'Privacy Policy', 
    Rights : 'Blog Website. All Rights Reserved.'
};
