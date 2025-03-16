import { View, Text, TouchableOpacity, Image, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import Swiper from "react-native-swiper";
import { onboarding } from '@/constants';
import CustomButtons from '@/components/CustomButtons';

const welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex,setActiveIndex] = useState(0);
  const LastSlide = activeIndex === onboarding.length - 1;
  return (
   <SafeAreaView className='h-full pb-[5vw] flex items-center justify-between bg-[#171717]'>
     <View className='justify-end items-end  w-full flex  px-8 py-5'>
     <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')}  >
      <Text className='font-[600] text-green-600 text-[4vw]'>Skip</Text>
     </TouchableOpacity>
     </View>
     <Swiper ref={swiperRef}
      loop={false}
      dot={<View className='w-[32px] h-[4px] mx-1 bg-[#000000] rounded-full' />}
      activeDot={<View className='w-[32px] h-[4px] mx-1 bg-white rounded-full' />}
      onIndexChanged={(index) => setActiveIndex(index)}
     >
     {
      onboarding.map((data,i) => {
        return (
         <View key={data.id} className=' flex-col items-center   w-full ' >
           <View className='w-full py-[5vw] justify-center items-center' >
           <Image className='w-[450px] h-[450px]' resizeMode='contain' source={data.image} />
           </View>
          <View className='w-full px-[2vw]  flex-col justify-center items-center' >
             <Text className='text-[7vw] text-white text-center font-JakartaBold'>{data.title}</Text>
             <Text className='mt-5 text-center w-[60%] text-white  opacity-50'>{data.description}</Text>
          </View>
 
         </View>
        )
      })
     }

     </Swiper>
     <CustomButtons
     bgVariant='success'
     onPress={() => LastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1) } 
     title={LastSlide ? 'Get Started' : "Next"}  />
   </SafeAreaView>
  )
}

export default welcome