import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images, onboarding } from '@/constants'
import { LinearGradient } from 'expo-linear-gradient';
import CustomInput from '@/components/CustomInput';
import CustomButtons from '@/components/CustomButtons';
import { Link, useRouter } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignIn } from '@clerk/clerk-expo';

const signIn = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  

  const onSignInPress = async () => {
    if (!isLoaded) return;
  
    try {
      // Start the sign-in process
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });
  
      if (signInAttempt.status === "complete") {
        // Check if a session already exists before setting a new one
        const existingSession = signInAttempt.createdSessionId;
        
        if (existingSession) {
          await setActive({ session: existingSession });
          router.replace("/(root)/(tabs)/home");
        }
      } else {
        console.error("Sign-in not complete. Additional steps required:", JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // Handle the session_exists error specifically
       if (err.errors && err.errors.some(e => e.code === "session_exists")) {
        console.warn("A session is already active. Redirecting...");
        router.replace("/(root)/(tabs)/home"); // Redirect instead of re-setting session
      } else {
        console.error("Sign-in error:", JSON.stringify(err, null, 2));
      } 
    }
  };
  
  
  return (
    <ScrollView className="flex-1 bg-[#171717]">
    <View className="flex-1 ">
      <View className="w-full h-[300px]">
        <Image className="z-0 w-full h-[330px]" resizeMode='cover' source={images.login} />
        <Text className='text-4xl z-10 right-2 font-JakartaBold text-center text-white '>Welcome Back!</Text>
      </View>
      <View className='flex-col gap-5 mt-28' style={{paddingLeft:20, paddingRight: 20}}>
      <CustomInput
            placeholder="Username"
            icon={icons.person}
            label="Name"
            value={form.name}
            onChangeText={(value) => setform({ ...form, name: value })}
          />
         {/* <CustomInput  placeholder='Email' icon={icons.email} label='Email' labelStyle='' value={form.email} onChangeText={(value) => setform({...form, email:value})} />  */}
        <CustomInput secureTextEntry={true} placeholder='Password' icon={icons.lock} label='Password' labelStyle='' value={form.password} onChangeText={(value) => setform({...form, password:value})} />
 
       <CustomButtons bgVariant='success' onPress={onSignInPress} title='SignIn'className='mt-2' style={{marginLeft: 20}} /> 

       <Text className='text-center text-white' >
        Don't have an account ? <Link href="/sign-up" >
        <Text className='text-green-600 font-[600]' >Register!</Text>
        </Link>
       </Text>
       <OAuth/>
      </View>
      
    </View>
  </ScrollView>
   
  )
}

export default signIn