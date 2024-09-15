import { useEffect, useState } from 'react';
import HouseCard from '../components/HouseCard.tsx';

export default function Search() {

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('/houses').then((res) => res.json()).then((data) => setHouses(data.houses));
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Search</h1>
        <div className="flex justify-center mt-8">
          <input type="text" className="border-2 border-gray-300 p-2" placeholder="Search" />
          <button className="bg-blue-500 text-white p-2 ml-2">Search</button>
        </div>
        <div className='grid grid-cols-3 gap-5 py-5'>
          {houses.map((house) => {
            return <HouseCard house={house} />;
          })}
        </div>
      </div>
    </>
  );
}
