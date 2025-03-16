import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { GarbageTruckLocation, useLocation } from '@/store';
import { calculateRegion, generateMarkersFromData } from '@/lib/map';
import { icons } from '@/constants';
import { MarkerData } from '@/types/types';

// ✅ Added latitude and longitude to mocktrucks
const mocktrucks = [
  {
    id: 1,
    first_name: "James",
    last_name: "Wilson",
    profile_image_url: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url: "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: "4.80",
    latitude: 37.78825,  // ✅ Add proper coordinates
    longitude: -122.4324
  },
];

const Map = () => {
  const { userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocation();
  const { selectedDriver } = GarbageTruckLocation();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

 const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  // ✅ Fix infinite loop by using `useEffect` correctly
  /* useEffect(() => {
    if (Array.isArray(mocktrucks)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: mocktrucks,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [mocktrucks, userLatitude, userLongitude]); */

  return (
    <MapView
      style={{
        width: 370,
        borderRadius: 10,
        height: 300
      }}
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}

      userInterfaceStyle="light"
    >
     {markers.map((marker) => (
        <Marker
          key={String(marker.id)} // ✅ Ensure key is always a string
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))} 
      
    </MapView>
  );
};

export default Map;
