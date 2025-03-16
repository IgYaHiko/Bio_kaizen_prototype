import BioCard from '@/components/BioCard'
import CustomButtons from '@/components/CustomButtons'
import * as Location from 'expo-location'
import GoogleTextInput from '@/components/GoogleTextInput'
import Map from '@/components/Map'
import { icons, images } from '@/constants'
import { useLocation } from '@/store'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ActivityIndicatorBase, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { setUserLocation, setDestinationLocation } = useLocation();
  const [hasPermissions, setHasPermissions] = useState(false)
  const { user } = useUser()
  const router = useRouter()
  const loading = false;
  const logOut = () => {
     router.replace("/(auth)/welcome")
  }
const googleHandleChange = () => {
   
}
const mockData = [
  {"ride_id": "1",
    "user_email": "subhrokolay2@gmail.com",
    "origin_address": "Kathmandu, Nepal",
    "destination_address": "Pokhara, Nepal",
    "origin_latitude": "27.717245",
    "origin_longitude": "85.323961",
    "destination_latitude": "28.209583",
    "destination_longitude": "83.985567",
    "ride_time": 391,
    "fare_price": "19500.00",
    "vehicle": "Garbage Truck",
    "payment_status": "paid",
    "driver_id": 2,
    "user_id": "1",
    "created_at": "2024-08-12 05:19:20.620007",
    "driver": {
        "driver_id": "2",
        "first_name": "David",
        "last_name": "Brown",
        "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        "car_seats": 5,
        "rating": "4.60"}

}, {"ride_id": "1",
  "user_email": "subhrokolay2@gmail.com",
  "origin_address": "Kathmandu, Nepal",
  "destination_address": "Pokhara, Nepal",
  "origin_latitude": "27.717245",
  "origin_longitude": "85.323961",
  "destination_latitude": "28.209583",
  "destination_longitude": "83.985567",
  "ride_time": 391,
  "fare_price": "19500.00",
  "vehicle": "Garbage Truck",
  "payment_status": "paid",
  "driver_id": 2,
  "user_id": "1",
  "created_at": "2024-08-12 05:19:20.620007",
  "driver": {
      "driver_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"}

},
{"ride_id": "1",
  "user_email": "subhrokolay2@gmail.com",
  "origin_address": "Kathmandu, Nepal",
  "destination_address": "Pokhara, Nepal",
  "origin_latitude": "27.717245",
  "origin_longitude": "85.323961",
  "destination_latitude": "28.209583",
  "destination_longitude": "83.985567",
  "ride_time": 391,
  "fare_price": "19500.00",
  "vehicle": "Garbage Truck",
  "payment_status": "paid",
  "driver_id": 2,
  "user_id": "1",
  "created_at": "2024-08-12 05:19:20.620007",
  "driver": {
      "driver_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"}

}, {"ride_id": "1",
  "user_email": "subhrokolay2@gmail.com",
  "origin_address": "Kathmandu, Nepal",
  "destination_address": "Pokhara, Nepal",
  "origin_latitude": "27.717245",
  "origin_longitude": "85.323961",
  "destination_latitude": "28.209583",
  "destination_longitude": "83.985567",
  "ride_time": 391,
  "fare_price": "19500.00",
  "vehicle": "Garbage Truck",
  "payment_status": "paid",
  "driver_id": 2,
  "user_id": "1",
  "created_at": "2024-08-12 05:19:20.620007",
  "driver": {
      "driver_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"}

}, {"ride_id": "1",
  "user_email": "subhrokolay2@gmail.com",
  "origin_address": "Kathmandu, Nepal",
  "destination_address": "Pokhara, Nepal",
  "origin_latitude": "27.717245",
  "origin_longitude": "85.323961",
  "destination_latitude": "28.209583",
  "destination_longitude": "83.985567",
  "ride_time": 391,
  "fare_price": "19500.00",
  "vehicle": "Garbage Truck",
  "payment_status": "paid",
  "driver_id": 2,
  "user_id": "1",
  "created_at": "2024-08-12 05:19:20.620007",
  "driver": {
      "driver_id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"}

},
]

 useEffect(() => {
     const requestLocation  = async () => {
        let { status }  = await  Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
           setHasPermissions(false)
           return;
        }
        let location = await Location.getCurrentPositionAsync();
        const address = await Location.reverseGeocodeAsync({ 
           latitude: location.coords?.latitude!,
           longitude: location.coords?.longitude,

        });

        setUserLocation({
            latitude: location.coords?.longitude!,
            longitude: location.coords?.longitude!,
            address: `${address[0].name}, ${address[0].region}`
        })
        
     }
     requestLocation()
 },[])

  return (
    <SafeAreaView className="bg-[#191919] h-screen px-5">
      {/* <Text className="text-white font-bold text-2xl mt-8">
        Welcome, {user?.emailAddresses[0].emailAddress.slice(0, 6)} 👋
      </Text> */}
      <FlatList
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
          <View className='justify-center items-center  '>
            {
               !loading ? (
                <>
                <Image
                 source={images.noResult}
                 resizeMode='contain'
                 className='w-[200px] h-[200px]'
                />
                <Text className='text-center text-white text-3xl font-JakartaExtraBold'>No Results Yet...</Text>
                <Text className='text-white opacity-50 mt-2'>Book Your First Cleaning Ride</Text>
                </>
               ):(
                <>
                  <ActivityIndicator size="small" color="#ddd" />

                </>
               )
            }
          </View>
      )}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
         paddingBottom: 100
      }}
      
       data={[]}
       renderItem={({item}) => 
       <BioCard
          ride={item} 
       />}
       ListHeaderComponent={() => (
          <>
         <View className='w-full px-2 '>
         <View className='flex flex-row justify-between items-center mt-4'>
            <Text className='text-white capitalize font-JakartaExtraBold text-xl'>Welcome, {user?.firstName} 👋</Text> 
           <TouchableOpacity onPress={logOut} >
           <Image
             source={icons.out}
             className="w-8 h-8"
             resizeMode="contain"
             style={{ tintColor: 'white' }} // Change color to white (or any other color)
            />         
          </TouchableOpacity>
          </View>
          <GoogleTextInput
           icon={icons.search}
           containerStyle={""}
           handlePress={googleHandleChange}
           />

          <>
           <Text className='text-white text-2xl mt-4 font-JakartaExtraBold mb-5'>
            Your Current Location
           </Text>
           <View className='flex flex-row items-center justify-center h-[300px]  rounded-xl'>
              <Map/>
           </View>
          </>       
   
         <Text className='text-white text-2xl font-JakartaExtraBold mt-5'>Recent Schedules</Text>
         </View>
        
          </>
       )}
      />

    </SafeAreaView>
  )
}

export default Home
