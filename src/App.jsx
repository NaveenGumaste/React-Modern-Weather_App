import "./App.css";
import axios from "axios";
import { useState, useCallback } from "react";
import Weather from "../components/Weather";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function App() {
	const [data, setdata] = useState({});
	const [location, setLocation] = useState("");

	// Read API key from environment variable
	const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

	// Refactored search function
	const fetchWeatherData = () => {
		if (!location) return; // Don't search if location is empty
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
		axios
			.get(url)
			.then((response) => {
				setdata(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error fetching weather data:", error);
				// Optionally: Set an error state here
			});
		setLocation(""); // Clear input after search
	};

	// Handle Enter key press in input
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			fetchWeatherData();
		}
	};

	// tsParticles init function
	const particlesInit = useCallback(async (engine) => {
		await loadSlim(engine);
	}, []);

	// tsParticles loaded function (optional)
	const particlesLoaded = useCallback(async (container) => {}, []);

	return (
		<div className="w-full min-h-screen relative p-2 sm:p-4 overflow-hidden">
			{" "}
			{/* Adjusted padding for small screens */}
			{/* Particles Background */}
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					background: {
						color: {
							value: "#f1f5f9", // Slate-100 background
						},
					},
					fpsLimit: 60,
					particles: {
						color: {
							value: ["#fda4af", "#fecdd3", "#ffffff"], // Rose-300, Rose-200, White
						},
						collisions: {
							enable: false, // Disable collisions
						},
						move: {
							direction: "bottom", // Make particles fall downwards
							enable: true,
							outModes: {
								default: "out", // Particles disappear at the bottom
							},
							random: true, // Add some randomness to movement
							speed: 2, // Adjust speed
							straight: false,
							wobble: {
								// Add a slight wobble effect
								enable: true,
								distance: 5,
								speed: 5,
							},
						},
						number: {
							density: {
								enable: true,
								area: 800,
							},
							value: 250, // Increased particle count from 150 to 250
						},
						opacity: {
							value: { min: 0.2, max: 0.6 }, // Random opacity
							animation: {
								enable: true,
								speed: 0.5,
								minimumValue: 0.1,
								sync: false,
							},
						},
						shape: {
							type: "circle",
						},
						size: {
							value: { min: 1, max: 4 }, // Slightly larger max size
						},
					},
					detectRetina: true,
				}}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					zIndex: -1,
				}}
			/>
			{/* Content */}
			<div className="relative z-10">
				<div className="text-center mb-6 sm:mb-8 flex justify-center items-center gap-2">
					{" "}
					{/* Use flexbox for input and button */}
					<input
						type="text"
						className="py-2 px-4 sm:py-3 sm:px-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-base sm:text-lg rounded-full border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-md transition-all duration-300 ease-in-out" /* Adjusted max-width slightly */
						placeholder="Enter location" // Updated placeholder
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						onKeyDown={handleKeyDown} // Changed to onKeyDown
					/>
					<button
						onClick={fetchWeatherData} // Call fetchWeatherData on click
						className="py-2 px-4 sm:py-3 sm:px-5 text-base sm:text-lg rounded-full bg-rose-500 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 shadow-md transition-colors duration-300 ease-in-out">
						Search
					</button>
				</div>
				<Weather weatherData={data} />
			</div>
		</div>
	);
}

export default App;
