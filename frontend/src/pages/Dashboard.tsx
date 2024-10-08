import { withAuthInfo } from '@propelauth/react';
import HouseCard from '../components/HouseCard.tsx';
import { useEffect, useState } from 'react';
import { HomeDocument } from '../typings/index.ts';

const Dashboard = withAuthInfo(function Dashboard({ user }) {

  const [houses, setHouses] = useState<HomeDocument[]>([]);

  useEffect(() => {
    fetch(`/users/${user!.userId}`).then((res) => res.json()).then((data) => setHouses(data.houses));
    console.log(houses);
  }, [houses]);

  return (
    <>
      <div className='w-full animate-slide-up'>
        <div className='container'>
          <h1 className='text-5xl text-gray-200 font-bold my-5'>Navigate your favorite places saved</h1>
          <div className='grid grid-cols-3 gap-5 py-5'>
            {houses.map((house) => {
              return <HouseCard house={house} pinnedByUser={true} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
});

export default Dashboard;

