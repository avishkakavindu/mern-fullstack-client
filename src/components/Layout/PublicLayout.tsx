import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* Navbar */}
      <div className="bg-slate-200">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold">Auth App</h1>
          </Link>
          <ul className="flex gap-4">
            <Link to="/sign-in">
              <li>SignIn</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* --- END: Navbar --- */}
      <div className="content">
        <h1>Public layout</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
