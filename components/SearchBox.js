import React from 'react';
import cities from '../lib/city.list.json';

export default function SearchBox() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

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
          matchingCities.push(city);
        }
      }
    }

    return setResults(matchingCities);
  };
  return (
    <div className="search">
      <input type="text" placeholder="Search..." value={query} onChange={onChange} />
    </div>
  );
}
