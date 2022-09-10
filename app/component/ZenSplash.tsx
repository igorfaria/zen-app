import React, { memo } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

const ZenSplash : Function = () : JSX.Element => {

    const maxWidth : number = 250
    const minWidth : number = 200
    const randomNumber = useSharedValue(maxWidth * .9);

    let value : number = minWidth
    let setInt : any = null  
    let growing = true
    const bounce : Function = (repeat : boolean = false) : void => {
//        let value : number = Math.abs((0.123 + Math.random()) * maxWidth)
        //if(value < minWidth) value = minWidth
        //if(value > maxWidth) value = maxWidth
        value = growing ? value * 1.05 : value * 0.97
        randomNumber.value = Math.round(value)
        if(repeat) {
            if(value > maxWidth) {
                //clearTimeout(setInt)
                growing = false
            } else if (value < minWidth){ 
                growing = true
            }
            setInt = setTimeout(() => bounce(true), 1253)
        }
    }

    setTimeout(() => bounce(true), 1251)

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
            
                <TouchableWithoutFeedback 
                    style={ {  width: '100%', alignItems: 'center'} }
                    onPress={() => bounce()}>        
                    <Animated.Image source={ icon } 
                        resizeMode='contain'
                        style={style} />  
                </TouchableWithoutFeedback>

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

export default memo<any>(ZenSplash)