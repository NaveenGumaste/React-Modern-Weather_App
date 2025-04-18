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

	// tsParticles init function
	const particlesInit = useCallback(async (engine) => {
		await loadSlim(engine);
	}, []);

	// tsParticles loaded function (optional)
	const particlesLoaded = useCallback(async (container) => {}, []);

	return (
		<div className="w-full min-h-screen relative p-4 overflow-hidden">
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
				<div className="text-center mb-8">
					<input
						type="text"
						className="py-3 px-6 w-full max-w-[700px] text-lg rounded-full border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-md transition-all duration-300 ease-in-out"
						placeholder="Enter location"
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						onKeyDownCapture={searchLocation}
					/>
				</div>
				<Weather weatherData={data} />
			</div>
		</div>
	);
}

export default App;
