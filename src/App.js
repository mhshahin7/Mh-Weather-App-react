import { useState } from "react";
import { FaThermometerFull, FaThermometerEmpty, FaInstagram, FaTelegram } from "react-icons/fa";
import { WiHumidity, WiTornado } from "react-icons/wi";

function App() {
const api = {
  key: //'your api key',
  base: "https://api.openweathermap.org/data/2.5/"
}

const [query, setQuery] = useState('');
const [data, setData] = useState({});

const search = evt => {
  if (evt.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setQuery('');
        console.log(result);
       })
  }
}
  


  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year} `;
  }
  
  const today = new Date();
  const time = today.getHours() + ":"  + today.getMinutes();
 
  const instaurl = "https://www.instagram.com/mohamadreza__h7";
  const teleurl = "https://t.me/Mohamadreza_h7";

  return (
    <div className={(typeof data.main != "undefined") ? ((time > '18:0') ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Please Enter City Name ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof data.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{data.name}, {data.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="date time">{time}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(data.main.temp)}°c
            </div>
            
            {/* <img src={iconUrl} alt=""></img> */}
            <div className="dbox">
              <div className="weather des"><span>Feels Like </span>{data.weather[0].description}</div>
              <div className="weather hum">Humidity :  {data.main.humidity} % <WiHumidity size={23} /> </div>
              <div className="weather hum">Max Temperature : {Math.round(data.main.temp_max)}°c <FaThermometerFull size={23} /> </div>
              <div className="weather hum">Min Temperature : {Math.round(data.main.temp_min)}°c <FaThermometerEmpty size={23}/> </div>
              <div className="weather hum">Wind Speed : {Math.round( data.wind.speed * 1.6)} km/h <WiTornado  size={23}/></div>
            </div>
            <p className="foot">Designed By Mohamadreza ©</p>
            <p className="contact">
              <a className="insta" href={instaurl}><FaInstagram size={35}/></a>
              <a className="insta2" href={teleurl}><FaTelegram size={35}/></a>
            </p>
          </div>
        </div>
        ) : <div className="parent">
            <div className="date pre">{dateBuilder(new Date())}</div>
            <div className="date time pre">{time}</div>
            <footer>Designed By Mohamadreza ©</footer>
            <p className="contact">
              <a className="insta" href={instaurl} ><FaInstagram size={35}/></a>
              <a className="insta2" href={teleurl} ><FaTelegram size={35}/></a>
            </p>
            </div>}
      </main>
    </div>
  );
}

export default App;
