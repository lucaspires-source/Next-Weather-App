import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cities from '../lib/city.list.json';

export default function SearchBox() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const clearQuery = () => {
      setQuery('');
    };
    Router.events.on('routeChangeComplete', clearQuery);

    return () => {
      Router.events.off('routeChangeComplete', clearQuery);
    };
  }, []);
  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    const matchingCities = [];
    if (value.length > 3) {
      // eslint-disable-next-line no-restricted-syntax
      for (const city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());
        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, '-')}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      }
    }

    return setResults(matchingCities);
  };
  return (
    <div className="search">
      <input type="text" placeholder="Search for a city..." value={query} onChange={onChange} />
      {query.length > 3 && (
      <ul>
        {results.length > 0 ? (
          results.map((city) => (
            <li key={city.slug}>
              <Link href={`/location/${city.slug}`} passHref>
                <a href="dummy">
                  {city.name}
                  {city.state ? `,${city.state}` : '' }
                  <span>
                    (
                    {city.country}
                    )
                  </span>
                </a>
              </Link>
            </li>
          ))
        ) : (
          <li className="search__no-results"> No Results</li>
        ) }
      </ul>
      )}
    </div>
  );
}
