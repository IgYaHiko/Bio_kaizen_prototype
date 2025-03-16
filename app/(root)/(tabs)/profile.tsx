import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/constants'
import { useUser } from '@clerk/clerk-expo'
import CustomInput from '@/components/CustomInput'

const profile = () => {
  const { user } = useUser();
  return (
   <SafeAreaView className='bg-[#171717] flex-1 h-screen'>
    <ScrollView className='px-5' contentContainerStyle={{paddingBottom: 20}}>
      <Text className='text-white font-JakartaExtraBold mt-7 text-4xl '>My Profile 😇</Text>
      <View className='justify-center w-30 h-30 m-auto mt-10 bg-white rounded-full items-center flex flex-row'>
        <Image
         className='w-40 h-40 rounded-full'
         source={{
           uri: user?.externalAccounts[0]?.imageUrl ?? user ?.imageUrl
         }}
         resizeMode='contain'
        />

      </View>
      <View className='mt-10 bg-[#000000] pb-20 px-5 flex flex-col gap-10 rounded-xl py-5 '>
        <CustomInput
        label='first Name'
        icon={icons.profile}
        placeholder={
          user?.firstName || 'not found'
        }
        className='text-xs'
        editable={false}
        
        />

      <CustomInput
        label='Email'
        icon={icons.proEmail}
        placeholder={
          user?.emailAddresses[0].emailAddress || 'not found'
        }
        className='text-xs'
        editable={false}
        
        />

      <CustomInput
        label='Phone'
        icon={icons.phone}
        placeholder={
           '91 + 7980240457'
        }
        className='text-xs'
        editable={false}
        
        />
      </View>
     </ScrollView>

   </SafeAreaView>
  )
}

export default profile