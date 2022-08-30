import React from 'react'
import ZenItem from './ZenItem'
import Animated from 'react-native-reanimated'
import { ZenItemType } from '../core/ZenItems'

export const ZenViewItems = (props: any) : JSX.Element => {

    const {data, height, onHidden, y} = props

    return (
    <Animated.View style={{
        height: height
      }}>
        {data.map((item : ZenItemType, index : number) => (
          <ZenItem 
            y={y} 
            onHidden={onHidden}
            index={index} 
            item={item} 
            key={index} 
            />
        ))}
      </Animated.View>
    )
}