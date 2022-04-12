import axios from 'axios';
import Head from 'next/head';
import propTypes from 'prop-types';
import moment from 'moment-timezone';
import TodaysWeather from '../../components/TodaysWeather';
import cities from '../../lib/city.list.json';
import HourlyWeather from '../../components/HourlyWeather';

const getCity = (param) => {
  const splitCity = param.trim().split('-');
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  // eslint-disable-next-line no-shadow
  const city = cities.find((city) => city.id.toString() === id);

  if (city) {
    return city;
  }
  return null;
};
const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf('day').valueOf();
  const endTimeStamp = Math.floor(endOfDay / 1000);
  const todaysData = hourlyData.filter((data) => data.dt < endTimeStamp);

  return todaysData;
};

export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  if (!city) {
    return {
      notFound: true,
    };
  }
  const { lon, lat } = city.coord;

  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.apiKey}&units=metric&exclude=minutely`);

  if (!data) {
    return {
      notFound: true,
    };
  }
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
  return {
    props: {
      city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather,
    },
  };
}

export default function City({
  hourlyWeather, city, currentWeather, dailyWeather, timezone,
}) {
  console.log(currentWeather);
  return (
    <div>
      <Head>
        <title>
          {city.name}
          {' '}
          Weather
        </title>
      </Head>
      <div className="page-wrapper">
        <div className="container">
          <TodaysWeather city={city} weather={dailyWeather[0]} timezone={timezone} />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
}

City.propTypes = {
  hourlyWeather: propTypes.arrayOf(propTypes.object).isRequired,
  city: propTypes.shape({ name: propTypes.string.isRequired }).isRequired,
  currentWeather: propTypes.arrayOf(propTypes.object).isRequired,
  dailyWeather: propTypes.arrayOf(propTypes.object).isRequired,
  timezone: propTypes.string.isRequired,
};
