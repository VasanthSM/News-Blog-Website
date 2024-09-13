import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <GoogleOAuthProvider clientId="657188290658-jcb2nc4d0gmigp3ifu812eb7hdnela24.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
    
);
