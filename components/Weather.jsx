import React from "react";

const Weather = ({ weatherData }) => {
	const iconCode = weatherData.weather ? weatherData.weather[0].icon : null;
	const iconUrl = iconCode
		? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
		: null;

	return (
		<div>
			{weatherData.weather ? (
				<div className="w-full max-w-xs sm:max-w-[500px] h-auto bg-white border border-rose-200 shadow-lg rounded-xl m-auto relative p-4 sm:p-6 top-[5%] sm:top-[10%] flex flex-col justify-between items-center text-center text-rose-900">
					<div className="flex justify-between w-full items-start mb-3 sm:mb-4">
						<div>
							<p className="text-xl sm:text-2xl font-semibold text-slate-800">
								{weatherData.name}, {weatherData.sys.country}
							</p>
							<p className="text-base sm:text-lg capitalize text-rose-600">
								{weatherData.weather[0].description}
							</p>
						</div>
						{iconUrl && (
							<img
								src={iconUrl}
								alt={weatherData.weather[0].description}
								className="w-12 h-12 sm:w-16 sm:h-16"
							/>
						)}
					</div>
					<div className="my-3 sm:my-4">
						<div className="text-6xl sm:text-7xl font-bold text-slate-900">
							{weatherData.main.temp.toFixed()}°C
						</div>
						<p className="text-sm sm:text-md text-rose-700 mt-1">
							Feels like {weatherData.main.feels_like.toFixed()}°C
						</p>
					</div>
					<div className="w-full flex flex-wrap justify-around mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-rose-200 gap-y-2">
						<div className="text-center w-1/3">
							<p className="font-semibold text-base sm:text-lg text-slate-700">
								{weatherData.main.humidity}%
							</p>
							<p className="text-xs sm:text-sm text-rose-600">Humidity</p>
						</div>
						<div className="text-center w-1/3">
							<p className="font-semibold text-base sm:text-lg text-slate-700">
								{weatherData.wind.speed.toFixed()} KPH
							</p>
							<p className="text-xs sm:text-sm text-rose-600">Wind Speed</p>
						</div>
						<div className="text-center w-1/3">
							<p className="font-semibold text-base sm:text-lg text-slate-700">
								{weatherData.main.pressure} hPa
							</p>
							<p className="text-xs sm:text-sm text-rose-600">Pressure</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Weather;
