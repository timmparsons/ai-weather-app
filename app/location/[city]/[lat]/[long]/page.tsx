import { getClient } from '../../../../../apollo-client';
import fetchWeatherQuery from '../../../../../graphql/queries/fetchWeatherQueries';
import CalloutCard from '../../../../../components/CalloutCard';
import StatCard from '../../../../../components/StatCard';
import InformationPanel from '../../../../../components/InformationPanel';

type Props = {
	params: {
		city: string;
		lat: string;
		long: string
	}
}

async function WeatherPage({params: { city, lat, long }}: Props) {
	const client = getClient();

	const { data } = await client.query({
		query: fetchWeatherQuery,
		variables: { 
			current_weather: "true",
			longitude: long,
			latitude: lat,
			timezone: 'GMT'
		}
	})

	const results: Root = data.myQuery;

	console.log('QQQ', results)
	return (
		<div>
			<InformationPanel 
				city={city}
				lat={lat}
				long={long}
				results={results}
			/>
			<div>
				<div className='p-5'>
					<div className='p-5'>
						<h2 className='text-xl font-bold'>Todday's Overview</h2>
						<p className='text-sm text-gray-400'>
							Last updated at:{" "}
							{new Date(results.current_weather.time).toLocaleString()}
							{results.timezone}
						</p>
					</div>

				<div className='m-2 mb-10'>
					<CalloutCard message='this is where gpt message will go' /></div>
				</div>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
					<StatCard 
						title='Maximum Temperature'
						metric={`${results.daily.temperature_2m_max[0].toFixed(1)}`}
						color='yellow'
					/>

					<StatCard 
						title='Minimum Temperature'
						metric={`${results.daily.temperature_2m_min[0].toFixed(1)}`}
						color='green'
					/>
					
					<div>
						<StatCard 
							title='UV Index'
							metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
							color='rose'
						/>
							{Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && ( 
								<CalloutCard
									message='The UV Index is high today'
									warning
								/>
							)}
					</div>

					<div className='flex space-x-3'>
						<StatCard 
							title='Wind Speed'
							metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
							color='cyan'
						/>

						<StatCard 
							title='Wind Direction'
							metric={`${results.current_weather.winddirection.toFixed(1)}`}
							color='violet'
						/>
					</div>
				</div>
				
				<hr className='mb-5' />

				<div className='space-y-3'>

				</div>
			</div>
		</div>
	)
}

export default WeatherPage;
