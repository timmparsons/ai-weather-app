'use client';

import { Country, State, City }  from 'country-state-city';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlobeIcon } from '@heroicons/react/solid';

type option = {
	value: {
		latitude: string;
		longitude: string;
		isoCode: string;
	},
	label: string;
} | null;

type cityOption = {
	value: {
		name: string;
    countryCode: string;
    stateCode: string;
    latitude: string;
    longitude: string;
	},
	label: string;
} | null;

const options = Country.getAllCountries().map(country => ({
	value: {
		latitude: country.latitude,
		longitude: country.longitude,
		isoCode: country.isoCode
	},
	label: country.name
}));

function CityPicker() {
	const [selectedCountry, setSelectedcountry] = useState<option>(null)
	const [selectedCity, setSelectedCity] = useState<cityOption>(null)
	const router = useRouter();

	useEffect(() => {

	}, [selectedCountry])

	const handleSelectedCountry = (option: option) => {
		setSelectedcountry(option);
		setSelectedCity(null);
	}

	const handleSelectedCity = (option: cityOption) => {
		setSelectedCity(option);
		router.push(`/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`)
	}

	return (
		<div className='space-y-4'>
			<div className='space-y-2'>
				<div className='flex items-center space-x-2 text-white/80'>
					<GlobeIcon className='h-5 w-5 text-white' />
					<label htmlFor='country'>Country</label>
				</div>
				<Select
					className='text-black'
					value={selectedCountry}
					onChange={handleSelectedCountry}
					options={options} />
			</div>

		{selectedCountry && (
			<div className='space-y-2'>
				<div className='flex items-center space-x-2 text-white/80'>
					<GlobeIcon className='h-5 w-5 text-white' />
					<label htmlFor='country'>City</label>
				</div>
				<Select
					className='text-black'
					value={selectedCity}
					onChange={handleSelectedCity}
					options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(city => ({
						value: {
							countryCode: city.countryCode,
							stateCode: city.stateCode,
							latitude: city.latitude,
							name: city.name,
							longitude: city.longitude
						},
						label: city.name
					}))} />
			</div>
		)}
		</div>
	)
}

export default CityPicker;