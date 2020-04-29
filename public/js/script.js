const address = document.getElementById("location");
const message = document.getElementById("message");

//The function fetches the weather for the user input location
document.getElementById("chk-wthr").addEventListener("click", (e) => {
  e.preventDefault();
  message.innerHTML = "Processing...";
  const location = address.value;
  if (!address.value) {
    message.innerHTML = "You must enter some address first.";
  } else {
    url = "/weather?address=" + location;

    fetch(url).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);

          message.innerHTML = data.error;
        } else {
          console.log(data);
          message.innerHTML = data.forecast;
        }
      });
    });
  }
});
