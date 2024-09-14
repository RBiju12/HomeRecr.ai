import { withAuthInfo } from "@propelauth/react";

export default withAuthInfo(function Home({ isLoggedIn, user }) {
  if (isLoggedIn) {
    return (
      <>
        <div className='w-full animate-slide-up'>
          <div className='container'>
            <h1 className='text-5xl text-gray-200 font-bold mb-5'>Welcome to HomeRecr.Ai</h1>
            <h2 className='text-2xl italic text-gray-300'>Redefining the investment space for real-estate through innovative technologies</h2>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Not logged in</div>;
  }
});
