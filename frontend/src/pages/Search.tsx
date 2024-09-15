import {useState } from 'react';
import HouseCard from '../components/HouseCard.tsx';
import { Button } from "@nextui-org/button";
import homes from '../homes.json';


export default function Search() {

  const [houses, setHouses] = useState<any>([]);
  const [userData, setuserData] = useState<string>('')

  // useEffect(() => {
  //   fetch('/houses').then((res) => res.json()).then((data) => setHouses(data.houses));
  // }, []);

  async function getSearchResults(input: string): Promise<any>
  {
     if (!input.includes(","))
     {
        throw new Error("Needs comma")
     }

     let inputs = input.split(',').map((value) => value.trim())

     const [address, zip, area, bedrooms, bathrooms, price] = inputs

     
     const addresses = address.split(' ')

     const encodedAddress = encodeURIComponent(addresses.join())

     const otherQuery = `&bathrooms=${Number(bathrooms)}&price=${Number(price)}`

     const bedroomAmount = Number(bedrooms)


     const response = fetch(`http://localhost:8000/api/recommendation?address=${encodedAddress}&zip=${Number(zip)}&area=${Number(area)}&bedrooms=${bedroomAmount}` + otherQuery
      , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
     });

     const data: any = await response;

     const jsonData = await data.json();

     const recommendationAddress = jsonData?.address

     setHouses([...houses, recommendationAddress])
  }

  let temp: any[] = [];

  for (let i = 0; i < 90; i++) {
    const index = Math.floor(Math.random() * (50 - 1)) + 1;
    const getHouse: any = homes[index]?.house;

    temp.push(getHouse);
  }

  let data: any[] = homes
  const filteredData = data.filter((element) => element?.house?.address.split(' ').join('') === houses.join(''))
  return (
      <div className="container text-gray-200">
        <h1 className="text-4xl font-bold text-center mt-8">Find the home for you</h1>
        <div className="flex justify-center mt-8">
          <div className='ml-10'>
          <input type="text" className="text-black h-10 border-2 border-gray-300 p-2" placeholder="Search" onChange={(e) => setuserData(e.target.value)}/>
          <Button onClick={(e: any) => getSearchResults(userData)} color='primary' className="h-10 w-20 bg-blue-500 text-white p-2 ml-2">Search</Button>
        </div >
        {houses.length === 0 && <div className=' grid grid-cols-3 gap-8 my-10'>{temp.map((element) => <HouseCard house={element} pinnedByUser={false} />)}</div>}
        < div className='mx-auto grid grid-cols-3 gap-5 py-5' >
          {
            filteredData.length > 0 && filteredData.map((element) => {
              return <HouseCard house={element?.house} pinnedByUser={true}/>
            })
            
          }
        </div>
      
      </div>
    </div>
  );
}
