const form = document.querySelector("form");
const input = document.getElementById("name");
const result = document.querySelector(".result");
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    // Update UI
    document.querySelector(".name figcaption").textContent = data.name;
    document.querySelector(".name img").src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    document.querySelector(".temperature img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.querySelector(".temperature span").textContent = Math.round(data.main.temp);
    document.querySelector(".description").textContent = data.weather[0].description;
    document.getElementById("clouds").textContent = data.clouds.all;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("pressure").textContent = data.main.pressure;
  } catch (err) {
    alert(err.message);
  }
});
