import {useState } from 'react';
import HouseCard from '../components/HouseCard.tsx';
import { Button } from "@nextui-org/button";
import homes from '../homes.json';


export default function Search() {

  const [houses, setHouses] = useState<any>([]);

  // useEffect(() => {
  //   fetch('/houses').then((res) => res.json()).then((data) => setHouses(data.houses));
  // }, []);

  async function getSearchResults(input: string)
  {
     if (!input.includes("/"))
     {
        throw new Error("Needs comma")
     }

     let inputs = String(input.split(','))
     let obj = JSON.parse(inputs)

     const response = fetch('http://localhost:8000/api/recommendation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(obj)
     });

     const data: any = await response;

     setHouses([...houses, data])
  }

  let temp: any[] = [];

  for (let i = 0; i < 90; i++) {
    const index = Math.floor(Math.random() * (50 - 1)) + 1;
    const getHouse: any = homes[index]?.house;

    temp.push(getHouse);
  }


  return (
    <>
      <div className="container text-gray-200">
        <h1 className="text-4xl font-bold text-center mt-8">Find the home for you</h1>
        <div className="flex justify-center mt-8">
<<<<<<< HEAD
          <div className='ml-10'>
          <input type="text" className="h-10 border-2 border-gray-300 p-2" placeholder="Search" onChange={(e) => getSearchResults(e.target.value)}/>
=======
          <input type="text" className="w-1/2 rounded-md h-10 ring-1 ring-white bg-emerald-900 text-gray-200 border-gray-300 p-2" placeholder="1200 appleapplepie ln, Blacksburg, VA, 2 bedrooms, 2 baths" />
>>>>>>> 9e61c0c9859317712bc452be4d5b115c6085a036
          <Button color='primary' className="h-10 w-20 bg-blue-500 text-white p-2 ml-2">Search</Button>
        </div >
        {houses.length === 0 && <div className=' grid grid-cols-3 gap-8 my-10'>{temp.map((element) => <HouseCard house={element} pinnedByUser={false} />)}</div>}
        < div className='mx-auto grid grid-cols-3 gap-5 py-5' >
          {
            houses.map((house) => {
              return <HouseCard house={house} pinnedByUser={true} />;
            })
          }
<<<<<<< HEAD
        </div>
        <div className='grid grid-cols-3 gap-5 py-5'>
          {houses.map((house: any) => {
            return <HouseCard house={house} pinnedByUser={true}/>;
          })}
        </div>
      </div>
=======
        </div >
      </div >
>>>>>>> 9e61c0c9859317712bc452be4d5b115c6085a036
    </>
  );
}
