import React, { memo, useContext } from 'react'
import ZenItem from './ZenItem'
import Animated from 'react-native-reanimated'
import { ZenItemType } from '../core/ZenItems'
import { ZC } from '../core/ZenContext'

const ZenViewItems = (props: any) : JSX.Element => {

    const { data, height, y } = props
    const { customFontStyle } : any = React.useContext(ZC) 
    const zenItemProps : object = { y, customFontStyle }
    
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

export default memo<any>(ZenViewItems)