import axios from 'axios';
import cities from '../../lib/city.list.json';

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
export async function getServerSideProps(context) {
  const city = getCity(context.params.city);
  if (!city) {
    return {
      notFound: true,
    };
  }
  const { lon, lat } = city.coord;

  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.apiKey}&units=metric&exclude=minutely`);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default function City({ data }) {
  console.log(data);
  return (
    <div>Oi</div>
  );
}
