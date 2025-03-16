import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import "../global.css";
import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import { tokenCache } from '@/lib/auth'
const _layout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
    const [loaded] = useFonts({
        "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
        "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
        "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });


if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
    <ClerkLoaded>
   <Stack>
    <Stack.Screen name='index'  options={{headerShown: false}} />
    <Stack.Screen name='(auth)' options={{headerShown: false}}  />
    <Stack.Screen name='(root)' options={{headerShown: false}} />
    
   </Stack>
   </ClerkLoaded>
   </ClerkProvider>
  )
}

export default _layout