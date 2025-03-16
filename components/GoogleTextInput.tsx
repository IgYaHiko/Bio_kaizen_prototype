import 'react-native-get-random-values';
import { View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GoogleInputProps } from '@/types/types';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from '@/constants';

const GoogleTextInput = ({
    icon,
    handlePress,
    containerStyle,
    initialLocation,
    textInputBackgroundColor,
}: GoogleInputProps) => {
  const googleApi = process.env.EXPO_PUBLIC_KRUTIM_API_KEY;
  const [key, setKey] = useState(0);

  useEffect(() => {
    console.log("Google API Key:", googleApi);
    setKey(prev => prev + 1);
  }, []);

  return (
    <View className={`${containerStyle} bg-white shadow-neutral-300 py-2 flex px-4 gap-3 flex-row items-center rounded-full mt-3`}>
      <GooglePlacesAutocomplete
        key={key}
        placeholder="Schedule Your Garbage Pickup..."
        fetchDetails={true}
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            position: 'relative',
            shadowColor: "#d4d4d4"
          },
          textInput: {
            fontSize: 14,
            fontWeight: "400",
            marginTop: 5,
            backgroundColor: textInputBackgroundColor || 'white',
            width: '100%',
            borderRadius: 200  
          },
          listView: {
            backgroundColor: textInputBackgroundColor || 'white',
            position: 'relative',
            top: 0,
            width: '100%',
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99
          }
        }}
        onPress={(data, details) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description
          });
        }}
        query={{
          key: googleApi,
          language: 'en'
        }}
        renderLeftButton={() => (
          <View className="w-8 h-6 justify-center items-center">
            <Image
              source={icon ? icon : icons.search}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "black",

          placeholder: initialLocation ?? "Schedule Your Garbage Truck...."
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
