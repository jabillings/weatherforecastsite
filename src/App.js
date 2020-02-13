import React from "react";
import logo from "./logo.svg";
import ForecastArea from "./components/ForecastArea.js";
import LocationInput from "./components/LocationInput.js";
import weatherRequest from "./api/WeatherRequest.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      data: null,
      failure: false,
      isFetching: true,
      fetchFailure: false
    };

    this.success = this.success.bind(this);
    this.failure = this.failure.bind(this);
    this.periodicFetch = this.periodicFetch.bind(this);
    this.updateCoordinatesAndFetch = this.updateCoordinatesAndFetch.bind(this);
  }

  success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat, long);
    this.updateCoordinatesAndFetch(lat, long);
  }

  failure() {
    this.setState({ failure: true });
  }

  updateCoordinatesAndFetch(lat, long) {
    this.setState({
      latitude: lat,
      longitude: long
    });
    this.fetchForecast(lat, long);
  }

  //this does the network fetching
  fetchForecast(lat, long) {
    const thisObject = this;

    this.setState({
      isFetching: true,
      data: null,
      fetchFailure: false
    });

    weatherRequest(lat, long)
      .then(function(response) {
        thisObject.setState({
          data: response.data,
          isFetching: false,
          fetchFailure: false
        });
      })
      .catch(function(error) {
        console.log("Error!");
        console.log(error);
        thisObject.setState({
          data: null,
          isFetching: false,
          fetchFailure: true
        });
      });
  }

  //just fetches based on whatever the current state is
  periodicFetch() {
    this.fetchForecast(this.state.latitude, this.state.longitude);
    //for testing purposes:
    console.log("fetching");
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.failure);
    //trigger a data refresh every 10 seconds
    setInterval(this.periodicFetch, 10000);
  }

  render() {
    return (
      <div className="App">
        <ForecastArea
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          failure={this.state.fetchFailure}
          data={this.state.data}
        />
        <LocationInput newCoordHandler={this.updateCoordinatesAndFetch} />
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
      </div>
    );
  }
}

export default App;
