/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import propTypes from 'prop-types';
import moment from 'moment-timezone';

export default function WeeklyWeather({ weeklyWeather, timezone }) {
  return (
    <div className="weekly">
      <h3 className="weekly__title">
        Weekly
        {' '}
        <span>Weather</span>
      </h3>
      {weeklyWeather.length > 0 && weeklyWeather.map((weather, index) => {
        if (index > 0) {
          return (
            <div className="weekly__card" key={weather.dt}>
              <div className="weekly__inner">
                <div className="weekly__left-content">
                  <h3>{moment.unix(weather.dt).tz(timezone).format('dddd')}</h3>
                  <h4>
                    <span>
                      {weather.temp.max.toFixed(0)}
                      °C
                    </span>
                    <span>
                      {weather.temp.min.toFixed(0)}
                      °C
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

WeeklyWeather.propTypes = {
  weeklyWeather: propTypes.arrayOf(propTypes.object).isRequired,
  timezone: propTypes.string.isRequired,
};
