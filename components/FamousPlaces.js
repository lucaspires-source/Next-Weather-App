import Image from 'next/image';
import Link from 'next/link';

// import images
import LondonImage from '../public/images/london.jpg';
import RioImage from '../public/images/rio.jpeg';
import TokyoImage from '../public/images/tokyo.jpg';
import NewYorkImage from '../public/images/new-york.jpg';

const places = [
  {
    name: 'London',
    image: LondonImage,
    url: '/location/london-2643743',
  },
  {
    name: 'Rio',
    image: RioImage,
    url: '/location/rio-de-janeiro-3451189',
  },
  {
    name: 'Tokyo',
    image: TokyoImage,
    url: '/location/tokyo-1850147',
  },
  {
    name: 'New York',
    image: NewYorkImage,
    url: '/location/new-york-city-5128581',
  },
];

export default function FamousPlaces() {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0
          && places.map((place) => (
            <div className="places__box" key={place.name}>
              <Link href={place.url} passHref>
                <a href="dummy">
                  <div className="places__image-wrapper">
                    <Image
                      src={place.image}
                      alt={`${place.name} Image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <span>{place.name}</span>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}