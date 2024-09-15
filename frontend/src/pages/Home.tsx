import { withAuthInfo } from "@propelauth/react";

const Home = withAuthInfo(function HomeComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <>
        <div className='w-full animate-slide-up text-gray-200'>
          <div className='container'>
            <h1 className='text-5xl font-bold mb-5'>Welcome to HomeRecr.Ai</h1>
            <h2 className='text-2xl italic text-gray-300'>Redefining the investment space for real-estate through innovative technologies</h2>
            <div className='w-1/2 my-10'>
              <p className='w-1/2'>Use our AI powered tools to find the perfect home for you, no matter your financial background.</p>
              <img src='/findhouses.png' alt='Home' className='w-1/2  my-5' />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Not logged in</div>;
  }
});

export default Home;
