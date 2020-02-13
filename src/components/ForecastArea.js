import React from "react";

const mapOfDataNameToDisplayName = {
  summary: "Summary",
  precipProbability: "Chance of Precipitation",
  precipType: "Precipitation Type",
  temperature: "Temperature",
  apparentTemperature: "Feels like ",
  humidity: "Humidity",
  windSpeed: "Wind Speed"
};

class ForecastArea extends React.Component {
  generateWeatherData(frequency, index) {
    //handle errors
    if (this.props.failure) {
      return (
        <p>There was a network failure, weather data could not be retrieved</p>
      );
    } else if (!this.props.data) {
      return <p>Loading...</p>;
    }

    //this is the variable that will hold the object we will actually get data from
    let actualData;
    switch (frequency) {
      case "currently":
        actualData = this.props.data.currently;
        break;
      default:
        actualData = this.props.data.currently;
    }
    let weatherData = [];
    let key;
    for (key in actualData) {
      weatherData.push(this.generateWeatherDatum(key, actualData[key]));
    }
    return weatherData;
  }

  generateWeatherDatum(key, value) {
    //we are only going to show a subset of the information for now
    if (key in mapOfDataNameToDisplayName) {
      return (
        <li className="Weather-datum" key={key}>
          <b>{mapOfDataNameToDisplayName[key] + ": "}</b>
          <i>{value}</i>
        </li>
      );
    }
  }

  render() {
    return (
      <div className="Forecast-area">
        <h1> Here is today's weather for the following location: </h1>
        <p>Latitude: {this.props.latitude}</p>
        <p>Longitude: {this.props.longitude}</p>
        <ul>{this.generateWeatherData(this.props.data)}</ul>
      </div>
    );
  }
}

export default ForecastArea;
