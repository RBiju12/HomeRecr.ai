import { HomeDocument } from '../typings/index.ts';
import { Icon } from '@iconify/react';

interface Props {
  house: HomeDocument;
}

export default function HouseCard({ house }: Props) {
  return (
    <div className='flex flex-col bg-emerald-900 rounded-lg shadow-lg p-4 text-gray-200 relative'>
      <h2 className='text-lg'>{house.address}</h2>
      <p className='text-lg'>${house.price}</p>
      <div className='flex justify-between mt-4'>
        <div>
          <p className='text-lg'>Bedrooms: {house.bedrooms}</p>
          <p className='text-lg'>Bathrooms: {house.bathrooms}</p>
          <p className='text-lg'>Floor Area: {house.area} sq ft</p>
        </div>
        <button className='absolute top-2 right-2'>
          <Icon icon='akar-icons:pin' className='text-gray-200 text-2xl hover:text-3xl duration-300' />
        </button>
      </div>
    </div>
  );
}
