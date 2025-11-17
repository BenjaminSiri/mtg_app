import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_cZNLqSwOk",
  client_id: "550bardua4qg3ndplcfq09joh2",
  redirect_uri: "https://master.d1ip0clgd67zj0.amplifyapp.com/",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
  root.render(
    <React.StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
