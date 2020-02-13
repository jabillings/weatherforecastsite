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
    const inputInvalid = isInputInvalid(latitude, longitude);
    this.setState({
      invalid: inputInvalid
    });
    //send coordiantes off to the parent component if valid
    if (!inputInvalid) {
      this.props.newCoordHandler(parseInt(latitude), parseInt(longitude));
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
    console.log(this.state.invalid);
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

function isInputInvalid(latitude, longitude) {
  //make sure we can use numbers
  if (isNaN(latitude) || isNaN(longitude)) {
    return true;
  }

  //be safe
  latitude = parseInt(latitude);
  longitude = parseInt(longitude);

  return (
    latitude < -90 || latitude > 90 || (longitude < -180 || longitude > 180)
  );
}

export { isInputInvalid };
export default LocationInput;
