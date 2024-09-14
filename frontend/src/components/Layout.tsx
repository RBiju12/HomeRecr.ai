import { Outlet } from "react-router-dom";
import Navbar from './navbar.tsx';
import { withAuthInfo } from '@propelauth/react';

export default withAuthInfo(function Layout({ isLoggedIn, user }) {
  return (
    <>
      <Navbar email={user?.email} />
      <hr className="h-[2px] mt-2 my-5 bg-white text-gray-200 w-full"></hr>

      <Outlet />
    </>
  );
});
