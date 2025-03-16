import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ride } from '@/types/types'
import { icons } from '@/constants'
import { formatDate } from '@/lib/util'

const BioCard = ({ 
  ride: { destination_address, vehicle, destination_latitude, destination_longitude,ride_time, created_at, origin_address,driver:{first_name,last_name} } 
}: { ride: Ride}) => {
  
  const mapUri = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat%3A-122.29009844646316%2C47.54607447032754&zoom=14.3497&marker=lonlat%3A-122.29188334609739%2C47.54403990655936%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat%3A-122.29282631194182%2C47.549609195001494%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat%3A-122.28726954893025%2C47.541766557545884%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=fad3f517528a49d6930b9a3996782cf1`

  return (
    <View className="bg-[#101010]  w-full mt-5 py-6 rounded-lg px-4">
      <View className='flex flex-row justify-center gap-24 items-center' >
      <View>
        <Image
          source={{ uri: mapUri }}
          className="w-[90px] h-[90px] rounded-lg"
          resizeMode="cover"
        />
      </View>
       <View className='flex flex-col gap-5'>
           <View className='flex flex-row justify-center items-center gap-2'>
            <Image
             source={icons.point}
             className='h-8 w-8'
             resizeMode='contain'
            />
            <Text className='text-white' >{origin_address}</Text>
           </View>

           <View className='flex flex-row justify-center items-center gap-8'>
            <Image
             source={icons.to}
             className='h-8 w-8'
             resizeMode='contain'
            />
            <Text className='text-white' >{destination_address}</Text>
           </View>
       </View>
      </View>
      <View className='flex mt-5 px-3 py-4 rounded-lg gap-5 flex-col bg-[#000000]  '>
         <View className='flex flex-row justify-between items-center'>
            <Text className='text-white opacity-80 text-xl' >Date & Time</Text>
            <Text className='text-white opacity-75'>{formatDate(created_at)} </Text>
         </View>

         <View className='flex flex-row justify-between items-center'>
            <Text className='text-white opacity-80 text-xl' >Driver</Text>
            <Text className='text-white opacity-75'>{first_name} {last_name} </Text>
         </View>

         <View className='flex flex-row justify-between items-center'>
            <Text className='text-white opacity-80 text-xl' >Vehicle</Text>
            <Text className='text-white opacity-75'>{vehicle}</Text>
         </View>


      </View>
    </View>
  )
}

export default BioCard
