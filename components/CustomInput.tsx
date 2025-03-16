import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, TouchableWithoutFeedbackComponent, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { InputFieldProps } from '@/types/types'
import { icons, images } from '@/constants'
const CustomInput = ({
    label,
    labelStyle,
    icon,
    secureTextEntry=false,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    placeholder,
    ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
           <View  className='w-full '>
            <Text style={{ color: '#ddd'}} className={`text-[3vw] font-JakartaBold  text-left ${labelStyle}`}>{label}</Text>
           <View style={{backgroundColor: '#131313',height: 70,}} className='mt-3 flex    flex-row  relative    items-center rounded-full'>
            <Image source={icon} style={{width:30,height:30,marginLeft:20}} />
            <TextInput 
            placeholder={placeholder}
            placeholderTextColor='grey'
            style={{height: 70}} secureTextEntry={secureTextEntry} {...props}  className='text-white px-5 text-xl font-JakartaExtraBold flex-1 rounded-full'/>
           </View>
           </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CustomInput