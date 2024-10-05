import { data } from "autoprefixer";
import { Component } from "react";

class APP extends Component {
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

    const apiKey = "cefd9f83a8a97e9c462aeafea60dba60";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch the Weather data for the city");
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

  render() {
    const { city, weather, error } = this.state;

    return <div></div>;
  }
}