import React from 'react'
import ZenItem from './ZenItem'
import Animated from 'react-native-reanimated'
import { ZenItemType } from '../core/ZenItems'

export const ZenViewItems = (props: any) : JSX.Element => {

    const {data, height, onHidden, y, customFontStyle} = props

    const zenItemProps : object = {
      onHidden,
      y,
      customFontStyle,
    }
   
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