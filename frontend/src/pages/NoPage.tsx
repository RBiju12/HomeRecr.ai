import React from 'react';
import { Link } from 'react-router-dom';

const NoPage: React.FC = () => {
  return (
    <div className='text-center text-gray-200 my-5'>
      <h1 className='font-bold text-5xl my-5'>Page Not Found</h1>
      <p className='text-2xl my-5'>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className='text-2xl duration-300 hover:text-green-300'>Go to Home</Link>
    </div>
  );
};

export default NoPage;
