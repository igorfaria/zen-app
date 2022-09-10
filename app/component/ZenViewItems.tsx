import React, { memo, useContext } from 'react'
import ZenItem from './ZenItem'
import Animated from 'react-native-reanimated'
import { ZenItemType } from '../core/ZenItems'

const ZenViewItems = (props: any) : JSX.Element => {

    const { data, height, y } = props
    
    return (
    <Animated.View style={{
        height: height
      }}>
        {data.map((item : ZenItemType, index : number) => (
          <ZenItem 
            y={ y }
            index={ index } 
            item={ item } 
            key={ index } 
            />
        ))}
      </Animated.View>
    )
}

export default memo<any>(ZenViewItems)