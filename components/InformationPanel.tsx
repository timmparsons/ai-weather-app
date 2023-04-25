import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import CityPicker from './CityPicker';


type Props = {
	city: string;
	results: Root;
	lat: string;
	long: string
}

function InformationPanel({city, results, lat, long}: Props) {
	return (
		<div className='bg-gradient-to-br from-[#394F68] to-[#18387E] text-white p-10'>
			<div className='pb-5'>
				<h1 className='text-6xl font-bold'>{decodeURI(city)}</h1>
				<p className='text-xs text-gray-400'>Long/Lat: {long}. {lat}</p>
			</div>
		</div>
	)
}

export default InformationPanel
