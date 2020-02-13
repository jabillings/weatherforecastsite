const API_BASE_URL =
  "http://outdoorbargains-dev.us-east-1.elasticbeanstalk.com/products/weather/";

//returns forecast object for a given latitude and longitude
function weatherRequest(latitude, longitude, key) {
  //if I have time I'll construct this URL with the JS URL class
  let url = API_BASE_URL + latitude + "/" + longitude;
  console.log(url);

  const axios = require("axios");
  return axios.get(url);
}

export default weatherRequest;
