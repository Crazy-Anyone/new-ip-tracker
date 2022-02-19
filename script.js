let inputIp = document.getElementById('id-input-box')
let userIsp = document.getElementById('user-ip-isp')
let userip = document.getElementById('user-ip-address')
let userLocation = document.getElementById('user-ip-location')
let userZone = document.getElementById('user-ip-timezone')
let apiKey = 'at_sR5pDM5jFYEqMw6rVCf43mZ3pWpRq'
var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


var map = L.map('map').setView([40.74409, -73.98776], 4);
const titlrurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tiles = L.tileLayer(titlrurl, { attribution });
tiles.addTo(map);

const marker = L.marker([40.74409, -73.98776]);
marker.addTo(map)

updatemarker = (update_marker = [40.74409, -73.98776]) => {
  map.setView(update_marker, 5)
  L.marker(update_marker).addTo(map)
}

function nextsearch() {

  if (!inputIp.value.match(ipformat)) {
    alert('You Entred incorrect ip address.')
    return
  } else {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${inputIp.value}`)
      .then(response => response.json())
      .then(data => {
        userip.innerHTML = data.ip
        userIsp.innerHTML = data.isp
        userLocation.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}, ${data.location.postalCode}`
        userZone.innerHTML = `UTC${data.location.timezone}`
        updatemarker([data.location.lat, data.location.lng])
      });
  }
}

