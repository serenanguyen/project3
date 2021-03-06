import React, { useEffect, useState } from "react";

const Weather = () => {
  const [data, setData] = useState();

  const fetchWeather = async () => {
    const response = await fetch("/api/weather");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

    // passing empty array as second arg treats this similarly to componentDidMount
  useEffect(() => {
    fetchWeather()
      .then(res => {
        const response = res.response;
        setData({
          temp: response.main.temp,
          condition: response.weather[0].description,
          img: response.weather[0].icon
        });
      })
      .catch(err => console.log(err));
  }, []);

  const imgUrl = data && `http://openweathermap.org/img/wn/${data.img}@2x.png`;

  return (
    <div className="weather">
      <h2>Current Weather in Austin, TX</h2>
      <div className="weather-info">
        <img src={imgUrl} className="weather-icon" alt="weather-icon" />
        <p>{data && data.temp} F</p>
      </div>
    </div>
  );
};

export default Weather;
