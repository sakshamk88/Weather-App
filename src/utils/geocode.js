const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2Frc2hhbTg4IiwiYSI6ImNrNHF4ZG8wNjJtejUzbG5zaWt1NjV1NWgifQ.wTuF38iEiLVdIbVgFQN17A&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to location services. Please check your internet connection.",
        undefined
      );
    } else if (body.features.length === 0) {
      callback(
        "Entered location is not valid. Please try another term.",
        undefined
      );
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
