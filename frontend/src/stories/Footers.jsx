import React from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';


const Footers = ({title, About, Contact, PrivacyPolicy, Rights  }) => {
  return (
    <footer class="footer">
    <div class="container">
      <div class="content">
        <div class="title">{title}</div>
        <div class="links">
          <a href="#" class="link">{About}</a>
          <a href="#" class="link">{Contact}</a>
          <a href="#" class="link">{PrivacyPolicy}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {Rights}</p>
      </div>
    </div>
  </footer>  
  );
};

export default Footers;
