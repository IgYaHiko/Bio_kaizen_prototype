import { View, Text, Button, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useCallback } from 'react'
import CustomButtons from './CustomButtons'
import { icons } from '@/constants'
import { Link, router } from 'expo-router'
import { useOAuth, useSSO } from '@clerk/clerk-expo'
import { googleOAuth } from '@/lib/auth'

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists" || result.code === 'success') {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };
  return (
    <View className='flex justify-center items-center' >
      <CustomButtons
     
       onPress={handleGoogleSignIn}
       bgVariant='outline'
       title='Continue with google'
       className='text-[#131313] border-red-100'
       IconLeft={() => (
         <Image
          source={icons.google}
           resizeMode='contain'
           className='w-7 h-7 mx-4'
         />
       )}
      />
    </View>
  )
}

export default OAuth