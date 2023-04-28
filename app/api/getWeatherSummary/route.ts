import openai from '../../../openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const { weatherData } = await request.json();

	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		temperature: 0.8,
		n: 1,
		stream: false,
		messages: [
			{
				role: "system",
				content: `Pretend you're a weather news presenting LIVE on television. Be energetic and fill of charisma. Introduce yourself with a funny name. State the city you are prooviding weather for and then give a summary of today's weather.`
			},
			 {
				 role: 'user',
				content: `Hi there, can I get a summart of todays weather, use the following information to the weather data: ${JSON.stringify(weatherData)}`
			 }
		]
	})
	const data = response;
	console.log('DATA IS: ', response)

	return NextResponse.json(data.choices[0].message)
}

