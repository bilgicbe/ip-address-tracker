var mymap = L.map('map', {zoomControl:false}).setView([51.505, -0.09], 13);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmlsZ2ljYmUiLCJhIjoiY2t2bnkzOG1yNW8xdzJxb2tzcWZ6NjFicCJ9.kllmHH9M6W4PKjI0m6daWQ'
}).addTo(mymap);


const mapIcon = L.icon({
    iconUrl: 'images/icon-location.svg'
})

function mapMarker(lat,lng) {
    L.marker([lat,lng],{icon:mapIcon}).addTo(mymap)
    mymap.panTo(new L.LatLng(lat,lng),animate=true)
}

const apiKey = 'at_hpWR0kCUJUdwgv4kF64QZD6lqj4KO'

//`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${address}`

function fetchApi(address) {
    const regexIp = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
    const regexDomain = /^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/;
    if (regexIp.test(String(address))) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${address}`)
        .then(res => res.json())
        .then((data) => {
        document.getElementById("ip-address").innerText = data.ip
        document.getElementById("location").innerText = data.location.city + ', '+ data.location.region + ' ' + String(data.location.postalCode)
        document.getElementById("timezone").innerText = 'UTC' + data.location.timezone
        document.getElementById("isp").innerText = data.isp
        mapMarker(data.location.lat,data.location.lng)
    })
    } else if (regexDomain.test(String(address).toLowerCase())) {
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${address}`)
        .then(res => res.json())
        .then((data) => {
        document.getElementById("ip-address").innerText = data.ip
        document.getElementById("location").innerText = data.location.city + ', '+ data.location.region + ' ' + data.location.postalCode
        document.getElementById("timezone").innerText = 'UTC' + data.location.timezone
        document.getElementById("isp").innerText = data.isp
        mapMarker(data.location.lat,data.location.lng)
    })
    }
    
}

document.querySelector('#input').addEventListener('keypress', (e) => {
    if (e.key == 'Enter'){
        fetchApi(document.querySelector('#input').value)
    }
})

document.querySelector('.arrow-container').addEventListener('click', () => {
    fetchApi(document.querySelector('#input').value)
})

fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=`)
        .then(res => res.json())
        .then((data) => {
        document.getElementById("ip-address").innerText = data.ip
        document.getElementById("location").innerText = data.location.city + ', '+ data.location.region + ' ' + String(data.location.postalCode)
        document.getElementById("timezone").innerText = 'UTC' + data.location.timezone
        document.getElementById("isp").innerText = data.isp
        mapMarker(data.location.lat,data.location.lng)
        })