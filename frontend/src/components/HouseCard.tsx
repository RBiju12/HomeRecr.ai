import { HomeDocument } from '../typings/index.ts';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { updateHomePin } from '../helpers/updateHomePin.ts';

interface Props {
  house: HomeDocument;
  pinnedByUser: boolean;
}

export default function HouseCard({ house, pinnedByUser }: Props) {
  const [pinned, setPinned] = useState<boolean>(pinnedByUser);
  const [pins, setPins] = useState<number>(house.pins);
  const [icon, setIcon] = useState<string>(pinned ? 'tdesign:pin-filled' : 'tdesign:pin');

  useEffect(() => {
    if (pinned) {
      setIcon('tdesign:pin-filled');
    } else {
      setIcon('tdesign:pin');
    }
  }, [pinned]);

  return (
    <div className='flex flex-col bg-emerald-900 rounded-lg shadow-lg p-4 text-gray-200 relative'>
      <h2 className='text-2xl'>{house.address}</h2>
      <p className='text-lg'>${house.price.toLocaleString("en")}</p>
      <div className='flex text-left mt-4'>
        <div>
          <div className='flex flex-row items-center space-x-2'><Icon icon={'fa:bed'} /><p className='text-lg'>Bedrooms: {house.bedrooms}</p></div>
          <div className='flex flex-row items-center space-x-2'><Icon icon={'fa:bath'} /><p className='text-lg'>Bathrooms: {house.bathrooms}</p></div>
          <div className='flex flex-row items-center space-x-2'><Icon icon={'tdesign:measurement-1'} /><p className='text-lg'>Floor Area: {house.area} sq ft</p></div>
        </div>
        <div className='absolute top-1 right-2 text-2xl flex flex-row items-center justify-center space-x-2'>
          <p>{pins}</p>
          <button onClick={(): void => {
            setPinned(!pinned);
            setPins(pinned ? pins - 1 : pins + 1);
            updateHomePin(house.id, pinned);
          }}>
            <Icon icon={icon} className='text-gray-200 hover:text-3xl duration-300' />
          </button>
        </div>
      </div>
    </div>
  );
}
