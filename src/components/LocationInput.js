import React from "react";

class LocationInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      invalid: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeLat = this.handleChangeLat.bind(this);
    this.handleChangeLong = this.handleChangeLong.bind(this);
  }

  handleClick() {
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    //validate values
    if (
      latitude < -90 ||
      latitude > 90 ||
      (longitude < -180 || longitude > 180)
    ) {
      this.setState({
        invalid: true
      });
    } else {
      this.setState({
        invalid: false
      });
      this.props.newCoordHandler(latitude, longitude);
    }
  }

  //THESE TWO SHOULD BE COMBINED INTO ONE FUNCTION WITH A SWITCH
  //WILL DO IF TIME PERMITS
  handleChangeLat(e) {
    const lat = e.target.value;
    this.setState({
      latitude: lat
    });
  }

  handleChangeLong(e) {
    const long = e.target.value;
    this.setState({
      longitude: long
    });
  }

  render() {
    //ONLY DIFFERENCE HERE IS THE ERROR MESSAGE FOR INVALID INPUTS,
    //WOULD LIKE TO CLEAN UP TO REDUCE HTML JSX BUT
    //ONLY IF I HAVE TIME
    if (!this.state.invalid) {
      return (
        <div className="Latitude-input">
          <p>Latitude: </p>
          <input
            id="lat"
            type="text"
            value={this.state.latitude}
            onChange={this.handleChangeLat}
          />
          <p>Longitude: </p>
          <input
            id="long"
            type="text"
            value={this.state.longitude}
            onChange={this.handleChangeLong}
          />
          <p>Hit "Enter" to see the weather at the coordinates you entered!</p>
          <input type="submit" value="Enter" onClick={this.handleClick} />
        </div>
      );
    } else {
      return (
        <div className="Latitude-input">
          <p>Latitude: </p>
          <input
            id="lat"
            type="text"
            value={this.state.latitude}
            onChange={this.handleChangeLat}
          />
          <p>Longitude: </p>
          <input
            id="long"
            type="text"
            value={this.state.longitude}
            onChange={this.handleChangeLong}
          />
          <p>Hit "Enter" to see the weather at the coordinates you entered!</p>
          <input type="submit" value="Enter" onClick={this.handleClick} />
          <b>
            You must enter a latitude between -90 and 90 and a longitude between
            -180 and 180
          </b>
        </div>
      );
    }
  }
}

export default LocationInput;
