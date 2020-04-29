const request = require("request");
const chalk = require("chalk");

const forecast = (latitude, longitude, name, callback) => {
  const url =
    "https://api.darksky.net/forecast/7b671ac3436df0bd6f95d415b202a2bb/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
      //console.log(chalk.red("Unable to connect to weather services."))
    } else if (body.error) {
      callback("Unable to find Location.", undefined);
    } else {
      const data = body.currently;

      //console.log(data.currently)
      callback(
        undefined,
        "It is currently " +
          data.temperature +
          " celcius in " +
          name +
          ". There is a " +
          data.precipProbability * 100 +
          "% chance of rain."
      );
    }
  });
};
module.exports = forecast;
