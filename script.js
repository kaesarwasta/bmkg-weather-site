async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const province = document.getElementById("province").value;

  const res = await fetch(`https://YOUR_RENDER_URL.onrender.com/weather?city=${encodeURIComponent(city)}&province=${encodeURIComponent(province)}`);
  const data = await res.json();

  const result = document.getElementById("result");
  if (data.error) {
    result.innerHTML = `<p style="color:red;">${data.error}</p>`;
    return;
  }

  result.innerHTML = `
    <p><strong>City:</strong> ${data.location}</p>
    <p><strong>Province:</strong> ${data.province}</p>
    <p><strong>Weather:</strong> ${data.weather}</p>
    <p><strong>Temperature:</strong> ${data.temperature} °C</p>
    <p><strong>Time:</strong> ${data.datetime}</p>
  `;
}
