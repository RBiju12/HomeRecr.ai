import { useEffect, useState } from 'react';
import HouseCard from '../components/HouseCard.tsx';
import {Button} from "@nextui-org/button";
import homes from '../../homes.json'


export default function Search() {

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('/houses').then((res) => res.json()).then((data) => setHouses(data.houses));
  }, []);

  let temp: any[] = []
  for (let i = 0; i < 5; i++)
  {
    const index = Math.floor(Math.random() * (50 - 1)) + 1
    const getHouse: any = homes[index]?.house
    temp.push(getHouse)
  }
  

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Search</h1>
        <div className="flex justify-center mt-8">
          <div className='ml-10'>
          <input type="text" className="h-10 border-2 border-gray-300 p-2" placeholder="Search" />
          <Button color='primary' className="h-10 w-20 bg-blue-500 text-white p-2 ml-2">Search</Button>
          </div>
          {houses.length === 0 && <div className='absolute mt-40 mr-20 flex flex-col space-y-5 pb-20'>{temp.map((element) => <HouseCard house={element} pinnedByUser={true} />)}</div>
          }
        </div>
        <div className='grid grid-cols-3 gap-5 py-5'>
          {houses.map((house) => {
            return <HouseCard house={house} pinnedByUser={true}/>;
          })}
        </div>
      </div>
    </>
  );
}
