import React from 'react'
import ZenItem from './ZenItem'
import Animated from 'react-native-reanimated'
import { ZenItemType } from '../core/ZenItems'

export const ZenViewItems = (props: any) : JSX.Element => {

    const {data, height, y, customFontStyle, zWords, setZWords} = props

    console.log(zWords)

    const zenItemProps : object = { y, customFontStyle, zWords, setZWords }
    
    return (
    <Animated.View style={{
        height: height
      }}>
        {data.map((item : ZenItemType, index : number) => (
          <ZenItem 
            {...zenItemProps}
            index={index} 
            item={item} 
            key={index} 
            />
        ))}
      </Animated.View>
    )
}