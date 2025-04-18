import React from "react";

const Weather = ({ weatherData }) => {
	const iconCode = weatherData.weather ? weatherData.weather[0].icon : null;
	const iconUrl = iconCode
		? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
		: null;

	return (
		<div>
			{weatherData.weather ? (
				<div className="w-[500px] h-auto bg-white border border-rose-200 shadow-lg rounded-xl m-auto relative p-6 top-[10%] flex flex-col justify-between items-center text-center text-rose-900">
					<div className="flex justify-between w-full items-start mb-4">
						<div>
							<p className="text-2xl font-semibold text-slate-800">
								{weatherData.name}, {weatherData.sys.country}
							</p>
							<p className="text-lg capitalize text-rose-600">
								{weatherData.weather[0].description}
							</p>
						</div>
						{/* Display weather icon */}
						{iconUrl && (
							<img
								src={iconUrl}
								alt={weatherData.weather[0].description}
								className="w-16 h-16"
							/>
						)}
					</div>
					<div className="my-4">
						<div className="text-7xl font-bold text-slate-900">
							{weatherData.main.temp.toFixed()}°C
						</div>
						<p className="text-md text-rose-700 mt-1">
							Feels like {weatherData.main.feels_like.toFixed()}°C
						</p>
					</div>
					<div className="w-full flex justify-around mt-4 pt-4 border-t border-rose-200">
						<div className="text-center">
							<p className="font-semibold text-lg text-slate-700">
								{weatherData.main.humidity}%
							</p>
							<p className="text-sm text-rose-600">Humidity</p>
						</div>
						<div className="text-center">
							<p className="font-semibold text-lg text-slate-700">
								{weatherData.wind.speed.toFixed()} KPH
							</p>
							<p className="text-sm text-rose-600">Wind Speed</p>
						</div>
						<div className="text-center">
							<p className="font-semibold text-lg text-slate-700">
								{weatherData.main.pressure} hPa
							</p>
							<p className="text-sm text-rose-600">Pressure</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Weather;
