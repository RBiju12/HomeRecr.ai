import { Outlet } from "react-router-dom";
import Navbar from './navbar.tsx';
import { withAuthInfo } from '@propelauth/react';

const LayoutComponent = withAuthInfo(function Layout({ user }) {
  return (
    <div>
      <Navbar email={user!.email} />
      <hr className="h-[2px] mt-8 my-6 bg-white text-gray-200 w-full"></hr>

      <Outlet />
      <footer className='fixed bottom-0 left-0 w-full text-center text-gray-200 bg-gray-800 p-4'>Made by Rishan B., Joey C., Jaren G., and MIG</footer>
    </div>
  );
});

export default LayoutComponent;
