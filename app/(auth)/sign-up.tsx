import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import CustomInput from '@/components/CustomInput';
import CustomButtons from '@/components/CustomButtons';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err) {
      console.log(err);
      
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    // Check if the verification code is empty
    if (!verification.code.trim()) {
      setVerification({
        ...verification,
        state: 'failed',
        error: 'Please enter the verification code.',
      });
      return;
    }

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code.trim(),
      });

      if (signUpAttempt.status === 'complete') {
        await fetchAPI("/(api)/user",{
           method: 'POST',
           body: JSON.stringify({
             name: form.name,
             email: form.email,
             clerkId: signUpAttempt.createdUserId,
           })
        })
        await setActive({ session: signUpAttempt.createdSessionId });

        // Close the verification modal and show the success modal
        setVerification({ ...verification, state: 'default' });
       router.replace("/(root)/(tabs)/home") // Show success modal
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: 'Verification failed. Please check the code and try again.',
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        state: 'failed',
        error: 'An error occurred during verification. Please try again.',
      });
    }
  };

  return (
    <ScrollView className="flex-1 relative bg-[#171717] ">
      <View className="flex-1">
        <View className="w-full h-[300px]">
          <Image className="z-0 w-full h-[280px]" resizeMode="cover" source={images.Eco2} />
          <Text className="text-3xl absolute top-[70%] text-white left-[7%] right-2 font-JakartaBold text-center">
            Create an Account
          </Text>
        </View>
        <View className="flex-col gap-5" style={{ paddingLeft: 20, paddingRight: 20 }}>
          <CustomInput
            placeholder="Username"
            icon={icons.person}
            label="Name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <CustomInput
            placeholder="Email"
            icon={icons.email}
            label="Email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <CustomInput
            secureTextEntry={true}
            placeholder="Password"
            icon={icons.lock}
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButtons
            bgVariant="success"
            onPress={onSignUpPress}
            title="Register"
            className="mt-2"
            style={{ marginLeft: 20 }}
          />
          <Text className="text-center text-white">
            Already have an account?{' '}
            <Link href="/sign-in">
              <Text className="text-green-700 font-[600]">Login</Text>
            </Link>
          </Text>
          <OAuth />
        </View>

        {/* Verification Modal */}
        <ReactNativeModal isVisible={verification.state === 'pending'}>
          <View className="bg-white px-8 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-4xl font-JakartaBold">Verification</Text>
            <Text className="text-xl  mt-3 font-JakartaBold">
              We have sent a verification code to {form.email}
            </Text>
            <CustomInput
              label="Code"
              placeholder="******"
              labelStyle="mt-8 text-[6vw] font-JakartaBold"
              icon={icons.lock}
              onChangeText={(code) => setVerification({ ...verification, code })}
              keyboardType="numeric"
            />
            <CustomButtons
              title="Verify Email"
              bgVariant="success"
              style={{ marginTop: 30, marginLeft: 20 }}
              onPress={onVerifyPress}
            />
          </View>
        </ReactNativeModal>

        {/* Success Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-8 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
            <Text className="text-center font-JakartaBold text-4xl mt-4">
              You have successfully verified your account!
            </Text>
            <CustomButtons
              onPress={() => {
                setShowSuccessModal(false); // Close the success modal
               /*  router.replace("/(root)/(tabs)/home"); // Navigate to home */
              }}
              style={{ marginLeft: 20, marginTop: 30 }}
              title="Browse to Home"
              bgVariant="success"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;