async function getWeather() {
      const city = document.getElementById('citySelector').value;
      const loading = document.getElementById('loading');
      const card = document.getElementById('weatherCard');
      const cityName = document.getElementById('cityName');
      const weatherInfo = document.getElementById('weatherInfo');

      loading.style.display = 'block';
      card.style.display = 'none';
try {
        const response = await fetch(`https://your-flask-backend-url.com/api/weather?city=${city}`);
        const data = await response.json();

        cityName.textContent = city;
        weatherInfo.innerHTML = `
          Suhu: ${data.temperature} °C<br>
          Kelembaban: ${data.humidity}%<br>
          Cuaca: ${data.condition}<br>
          Waktu Update: ${data.updated}
        `;

        card.style.display = 'block';
      } catch (error) {
        alert("Gagal memuat data cuaca. Periksa koneksi atau backend.");
        console.error(error);
      } finally {
        loading.style.display = 'none';
      }
}
