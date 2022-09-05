import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

export const ZenSplash : Function = () : JSX.Element => {

    const maxWidth : number = 250
    const minWidth : number = 235
    const randomNumber = useSharedValue(maxWidth);

    const bounce : Function = (repeat : boolean = false) : void => {
        let value : number = (0.123 + Math.random()) * maxWidth
        if(value < minWidth) value = minWidth
        if(value > maxWidth) value = maxWidth
        randomNumber.value = Math.round(value)
        if(repeat) setTimeout(bounce, 1234)
    }

    setTimeout(() => bounce(true), 3354)

    const style = useAnimatedStyle(() => {
        return {
          margin: 20,
          maxWidth: '90%',
          width: withSpring(randomNumber.value),
          height: withSpring(randomNumber.value, { stiffness: 10 }),
        };
    })

    const icon : any = require('../assets/icon/ninja.png')
    return (
        <View style={
                {
                    flex: 1, 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    backgroundColor: 'rgba(0, 0, 0, .7)',
                }}>
            
                <TouchableOpacity 
                    style={ {  width: '100%', alignItems: 'center'} }
                    onPress={() => bounce(true)}>        
                    <Animated.Image source={ icon } 
                        resizeMode='contain'
                        style={style} />  
                </TouchableOpacity>

                <Text style={
                    {
                        fontSize: 16,
                        marginVertical: 40,
                        color: 'gray',
                    }
                }>Exercise your patiance :P</Text>
                <Text style={
                    {
                        color: 'silver'
                    }
                }>Loading...</Text>
        </View>
    )
}