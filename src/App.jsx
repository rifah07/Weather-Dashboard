import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weather: null,
      error: null,
    };
  }

  fetchWeatherData = () => {
    const { city } = this.state;
    if (!city) return;

    const apiKey = process.env.REACT_APP_API_KEY;

    if (!apiKey) {
      console.error("API key is undefined!");
      this.setState({ error: "API key not found. Check your .env file." });
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch the Weather data for the city. Check if the city name is correct.");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ weather: data, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message, weather: null });
      });
  };

  handleCityNameInputChange = (event) => {
    this.setState({ city: event.target.value });
  };

  handleWeatherDataSubmit = (event) => {
    event.preventDefault();
    this.fetchWeatherData();
  };

  /*  getWeatherEmoji = (weatherMain) => {
    const emojiMap = {
      Clear: "☀️",
      Clouds: "☁️",
      Rain: "🌧️",
      Snow: "❄️",
      Thunderstorm: "⛈️",
      Drizzle: "🌦️",
      Mist: "🌫️",
      Fog: "🌫️",
    };
    return emojiMap[weatherMain] || "🌤️";
  }; */

  render() {
    const { city, weather, error } = this.state;

    return (
      <div className="animated-background">
        {/* Animated Background Elements */}
        <div className="background-animation">
          <div className="floating-cloud cloud1"></div>
          <div className="floating-cloud cloud2"></div>
          <div className="floating-cloud cloud3"></div>
          <div className="floating-leaves">
            <div className="leaf leaf1">🍃</div>
            <div className="leaf leaf2">🍂</div>
            <div className="leaf leaf3">🌿</div>
            <div className="leaf leaf4">🍃</div>
            <div className="leaf leaf5">🍂</div>
          </div>
          <div className="sunshines">
            <div className="sunshine sun1">☀️</div>
            <div className="sunshine sun2">🌤️</div>
            <div className="sunshine sun3">🌥️</div>
            <div className="sunshine sun4">🌦️</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
          <div className="max-w-md w-full glass-card shadow-2xl rounded-2xl p-8 backdrop-blur-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
              🌤️ Weather Dashboard
            </h1>
            <form className="mb-6">
              <input
                type="text"
                value={city}
                placeholder="Enter the city name"
                className="glass-input border-0 rounded-xl py-3 px-4 w-full mb-4 text-white placeholder-white/70"
                onChange={this.handleCityNameInputChange}
              />
              <button
                type="submit"
                className="glass-button text-white py-3 px-6 rounded-xl w-full font-semibold transition-all duration-300 hover:scale-105"
                onClick={this.handleWeatherDataSubmit}
              >
                Get Weather Information
              </button>
            </form>
            {error && (
              <p className="text-red-300 text-center bg-red-500/20 p-3 rounded-lg backdrop-blur-sm">
                {error}
              </p>
            )}
            {weather && (
              <div className="text-center weather-info">
                <h2 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
                  📍{weather.name} 🌍
                </h2>

                <div className="space-y-2">
                  <p className="text-white/90 text-lg">
                    🌡️ Temperature:{" "}
                    <span className="font-bold">{weather.main.temp}°C</span>
                  </p>
                  <p className="text-white/90 text-lg capitalize">
                    🌤️ Weather:{" "}
                    <span className="font-bold">
                      {weather.weather[0].description}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
