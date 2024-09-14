import { Link } from 'react-router-dom';

export default function Navbar({ email }: { email: string; }) {
  return (
    <>
      <nav className='px-10 py-3 flex flex-row space-x-5 items-center justify-center h-10 text-gray-200 font-bold text-3xl'>
        <Link to="/" className='duration-300 hover:text-green-300'>Home</Link>

        <Link to="/search" className='duration-300 hover:text-green-300'>Search</Link>

        <Link to={`/dashboard`} className='duration-300 hover:text-green-300'>{email + ` - Dashboard`}</Link>
      </nav>
    </>
  );
}
