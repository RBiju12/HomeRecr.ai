import { HouseDocument } from '../typings/index.ts';

interface Props {
  house: HouseDocument;
}

export default function HouseCard({ house }: Props) {
  return (
    <div className='flex flex-col bg-emerald-600 rounded-lg shadow-lg p-4 text-gray-200'>
      <h2 className='text-lg'>{house.address}</h2>
      <p className='text-lg'>${house.price}</p>
      <div className='flex justify-between mt-4'>
        <div>
          <p className='text-lg'>Bedrooms: {house.bedrooms}</p>
          <p className='text-lg'>Bathrooms: {house.bathrooms}</p>
          <p className='text-lg'>Floor Area: {house.area} sq ft</p>
        </div>
        <button className='bg-red-400 text-white px-4 py-1 font-bold rounded-lg shadow-lg '>
          Pin
        </button>
      </div>
    </div>
  );
}
