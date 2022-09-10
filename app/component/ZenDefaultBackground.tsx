import React, { memo } from 'react'
import { ImageBackground } from 'react-native'

const ZenDefaultBackground : React.FC<JSX.Element> = (props : any) : JSX.Element => {
    const {width, height, top} = props
    return <ImageBackground 
    style={ {
      position: 'absolute',
      left: 0, top: top,
      width: width,
      height: height,
      zIndex: 1,
    } } 
    resizeMode={'cover'}
    source={ require('../assets/background/pattern-1.jpg') } />
}

export default memo<JSX.Element>(ZenDefaultBackground)