import "./App.css";
import axios from "axios";
import { useState } from "react";
import Weather from "../components/Weather";

function App() {
	const [data, setdata] = useState({});
	const [location, setLocation] = useState("");

	// Read API key from environment variable
	const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

	const searchLocation = (event) => {
		if (event.key === "Enter") {
			axios
				.get(url)
				.then((response) => {
					setdata(response.data);
					console.log(response.data);
				})
				.catch((error) => {
					console.error("Error fetching weather data:", error);
					// Optionally: Set an error state here to display a message to the user
				});
			setLocation("");
		}
	};
	return (
		<div className="w-full min-h-screen relative bg-gradient-to-b from-slate-100 to-slate-200 p-4">
			<div className="text-center mb-8">
				<input
					type="text"
					className="py-3 px-6 w-full max-w-[700px] text-lg rounded-full border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-md transition-all duration-300 ease-in-out"
					placeholder="Enter location and press Enter"
					value={location}
					onChange={(event) => setLocation(event.target.value)}
					onKeyDownCapture={searchLocation}
				/>
			</div>
			<Weather weatherData={data} />
		</div>
	);
}

export default App;
