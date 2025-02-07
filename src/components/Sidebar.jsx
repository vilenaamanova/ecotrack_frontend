import React, { useState } from "react";

import aqi1 from "../assets/aqi-1.png";
import aqi2 from "../assets/aqi-2.png";
import aqi3 from "../assets/aqi-3.png";
import aqi4 from "../assets/aqi-4.png";
import aqi5 from "../assets/aqi-5.png";

import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import thunderstorm from "../assets/thunderstorm.png";
import wind from "../assets/wind.png";

const getAQIStyles = (aqi) => {
  switch (aqi) {
    case 1:
      return { image: aqi1, color: "bg-green-100", verdict: "Хорошо" };
    case 2:
      return { image: aqi2, color: "bg-yellow-100", verdict: "Умеренно" };
    case 3:
      return { image: aqi3, color: "bg-orange-100", verdict: "Вредно для уязвимых групп" };
    case 4:
      return { image: aqi4, color: "bg-red-100", verdict: "Вредно" };
    case 5:
      return { image: aqi5, color: "bg-purple-100", verdict: "Опасно" };
    default:
      return { image: null, color: "bg-gray-100", verdict: "Неизвестно" };
  }
};

const getWeatherImage = (precipitation) => {
  switch (precipitation) {
    case "Rain":
      return rain;
    case "Snow":
      return snow;
    case "Clouds":
      return cloud;
    case "Clear":
      return clear;
    case "Thunderstorm":
      return thunderstorm;
    default:
      return clear;
  }
};

const Sidebar = ({ city, weatherData, airQualityData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Проверка наличия данных
  if (!city || !weatherData || !airQualityData) {
    return (
      <aside className="fixed top-[96px] left-4 w-64 bg-white shadow-lg p-6 rounded-xl z-40">
        <p className="text-red-500">Данные не загружены</p>
      </aside>
    );
  }

  const aqiStyles = getAQIStyles(airQualityData.aqi);

  const pollutants = [
    { name: "PM2.5", description: "Твердые частицы диаметром ≤2.5 мкм", value: airQualityData.pm2_5, standard: 25 },
    { name: "PM10", description: "Твердые частицы диаметром ≤10 мкм", value: airQualityData.pm10, standard: 50 },
    { name: "NO2", description: "Диоксид азота", value: airQualityData.no2, standard: 200 },
    { name: "SO2", description: "Диоксид серы", value: airQualityData.so2, standard: 20 },
    { name: "CO", description: "Оксид углерода", value: airQualityData.co, standard: 10000 },
    { name: "O3", description: "Озон", value: airQualityData.o3, standard: 120 },
  ];

  const recommendations = {
    1: "Качество воздуха удовлетворительное, загрязнение воздуха представляет небольшой риск или вообще не представляет риска.",
    2: "Качество воздуха приемлемое, однако для некоторых загрязнителей может существовать умеренная проблема для здоровья очень небольшого числа людей, которые необычно чувствительны к загрязнению воздуха.",
    3: "Дети и взрослые, которые активны на открытом воздухе, и люди с респираторными заболеваниями, такими как астма, должны ограничить длительные физические нагрузки на открытом воздухе.",
    4: "Каждый может начать испытывать последствия для здоровья; члены чувствительных групп могут испытывать более серьезные последствия для здоровья.",
    5: "Предупреждение о чрезвычайной ситуации в области здравоохранения: более высокая вероятность того, что все население будет затронуто."
  };

  return (
    <aside className={`fixed top-[96px] left-4 ${isExpanded ? 'w-96' : 'w-64'} bg-white shadow-lg p-6 rounded-xl z-40 transition-all duration-300 max-h-screen overflow-y-auto`}>
      <h2 className="text-xl font-bold mb-4">{city}</h2>

      <div className="border-t border-gray-200 mb-4"></div>

      <div className={`${aqiStyles.color} p-4 rounded-lg mb-4 flex items-center`}>
        <img src={aqiStyles.image} alt="AQI" className="w-12 h-12 mr-4" />
        <div className="flex-grow">
          <p className="text-lg font-semibold">AQI: {airQualityData.aqi}</p>
          <p className="text-sm text-gray-600">UK AQI</p>
        </div>
        <p className="text-lg font-semibold">{aqiStyles.verdict}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-4">
          <img
            src={getWeatherImage(weatherData.precipitation)}
            alt="Weather"
            className="w-16 h-16 mr-4"
          />
          <div>
            <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-sm text-gray-600">Ощущается как {weatherData.feels_like}°C</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <div className="flex items-center">
            <img src={wind} alt="Wind" className="w-6 h-6 mr-2" />
            <p>{weatherData.wind_speed} м/с</p>
          </div>
          <div className="flex items-center">
            <img src={humidity} alt="Humidity" className="w-6 h-6 mr-2" />
            <p>{weatherData.humidity}%</p>
          </div>
          <div className="flex items-center">
            <img src={pressure} alt="Pressure" className="w-6 h-6 mr-2" />
            <p>{weatherData.pressure} гПа</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-4"></div>

      {!isExpanded && (
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          Подробнее
        </button>
      )}

      {isExpanded && (
        <>
          <div className="mb-4">
            {pollutants.map((pollutant, index) => (
              <div
                key={index}
                className={`mb-2 p-2 ${pollutant.value > pollutant.standard ? 'bg-red-100' : 'bg-gray-100'} rounded-lg`}
              >
                <p className="text-sm font-semibold">{pollutant.name} ({pollutant.description})</p>
                <p className="text-sm">Значение: {pollutant.value} µg/m³</p>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold">Рекомендации:</p>
            <p className="text-sm">{recommendations[airQualityData.aqi]}</p>
          </div>

          <button
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => setIsExpanded(false)}
          >
            Скрыть
          </button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;