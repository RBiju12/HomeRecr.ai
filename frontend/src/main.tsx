import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RequiredAuthProvider, RedirectToLogin } from "@propelauth/react";
import Loading from './components/loading.tsx';
import { BrowserRouter } from 'react-router-dom';

const authUrl = import.meta.env.VITE_AUTH_URL;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RequiredAuthProvider authUrl={authUrl} displayWhileLoading={<Loading />} displayIfLoggedOut={<RedirectToLogin />}>
        <App />
      </RequiredAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
