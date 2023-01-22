import Image from 'next/image';
import Link from 'next/link';
import { AllEvents } from '@/models/allEvents';

export async function getStaticPaths() {
  const data = await import('../../../data/data.json');
  const paths = data.events_categories.map((city) => ({
    params: { city: city.id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const data = await import('../../../data/data.json');
  const cityEvents = data.allEvents.filter(
    (event) => event.city === params.city,
  );

  return {
    props: {
      cityEvents,
      city: params.city,
    },
  };
}

interface CityProps {
  cityEvents: AllEvents[];
  city: string;
}

export default function City({ cityEvents, city }: CityProps): JSX.Element {
  return (
    <div>
      <h1 className="uppercase text-3xl font-bold">{city}</h1>

      {cityEvents.map((cityEvent) => (
        <Link href={`/events/${city}/${cityEvent.id}`}>
          <Image src={cityEvent.image} alt="evenImg" width={200} height={200} />
          <h1>{cityEvent.title}</h1>
        </Link>
      ))}
    </div>
  );
}
