// app.js

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".navbar nav a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });

  if (path === "forecast.html") {
    fetchForecast();
  } else if (path === "cities.html") {
    fetchCities();
  }
});

function fetchForecast() {
  const container = document.getElementById("forecast-data");
  if (!container) return;

  fetch("https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast.xml")
    .then(res => res.text())
    .then(xml => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");

      const area = xmlDoc.querySelector("area[name]");
      const tempParams = area?.querySelectorAll("parameter[id='t'] timerange") || [];

      let output = `<h3>${area?.getAttribute("description") || "City"} Forecast</h3>`;
      output += '<div class="cards">';
      tempParams.forEach(timerange => {
        const value = timerange.querySelector("value");
        const datetime = timerange.getAttribute("datetime");

        const date = new Date(datetime.slice(0, 4), datetime.slice(4, 6) - 1, datetime.slice(6, 8), datetime.slice(8, 10));
        const formatted = date.toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit" });

        output += `
          <div class="card">
            <strong>${formatted}</strong>
            <p>${value?.textContent || "-"} °C</p>
          </div>
        `;
      });
      output += '</div>';

      container.innerHTML = output;
    })
    .catch(err => {
      container.innerHTML = "<p>Failed to load forecast data.</p>";
    });
}

function fetchCities() {
  const container = document.getElementById("cities-list");
  if (!container) return;

  fetch("https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast.xml")
    .then(res => res.text())
    .then(xml => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      const areas = xmlDoc.querySelectorAll("area[name]");

      let output = '<ul class="city-list">';
      areas.forEach(area => {
        output += `<li>${area.getAttribute("description")}</li>`;
      });
      output += '</ul>';

      container.innerHTML = output;
    })
    .catch(err => {
      container.innerHTML = "<p>Failed to load cities.</p>";
    });
}
