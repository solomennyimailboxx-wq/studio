"use client";

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

export default function LocationMap() {
  const position = { lat: 46.4825, lng: 30.7233 }; // Odesa, Ukraine
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-lg bg-muted text-center text-muted-foreground">
        <p>
          Ключ API Google Maps відсутній. <br />
          Будь ласка, встановіть NEXT_PUBLIC_GOOGLE_MAPS_API_KEY у вашому файлі .env.local.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={13}
        mapId="odesa-auto-map"
        className="h-full min-h-[400px] w-full rounded-lg"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <Marker position={position}>
            <MapPin className="h-8 w-8 text-red-600" />
        </Marker>
      </Map>
    </APIProvider>
  );
}
