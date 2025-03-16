import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ButtonProps } from '@/types/types'

const getVerient = (varient: ButtonProps['bgVariant']) => {
     switch(varient) {
        case 'secondary':
        return 'bg-grey-500';
        case 'danger':
        return 'bg-red-500';
        case 'success':
        return 'bg-green-900';
        case 'outline':
        return 'bg-transparent border-black border-[1px]';
         
     }
}

const CustomButtons = ({
    title,
    onPress,
    bgVariant="primary",
    textVariant="default",
    IconLeft,
    IconRight,
    className,
    ...props
    
}:ButtonProps) => {
  return (
    <TouchableOpacity className={`bg-black w-[90%] py-[3vw] flex-row justify-center items-center rounded-full ${getVerient(bgVariant)}  ${className}`} {...props} onPress={onPress} >
        {IconLeft && <IconLeft/>} 
        <Text className={`text-white ${className}  text-xl`}>{title}</Text>
        {IconRight && <IconRight/>}

    </TouchableOpacity>
  )
}

export default CustomButtons