import React from 'react'
import { View } from 'react-native'
import { randomKey } from './UniqueKey'
import ZenWords from '../core/ZenWords'
import { ZC } from '../core/ZenContext'

interface WrapperStyle {
    wrapper: object
    quote: object
}

export const WordWrapper : Function = ( props : any ) : JSX.Element => { 
    
    const { customFontStyle } : any = React.useContext(ZC)

    const words : string = props?.words ?? ''

    const spllitedWords = (typeof words === 'string') ? words.split(' ') : undefined 
    const undefinedElement = <></>

    if(typeof spllitedWords === 'undefined') return undefinedElement
    
    return (
        <View key={randomKey()}>
            <ZenWords
                words={spllitedWords}
                styleWrap={customFontStyle}
                />
        </View>
    )
}
