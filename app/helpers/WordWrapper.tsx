import React from 'react'
import { View } from 'react-native'
import { randomKey } from './UniqueKey'
import ZenWords from '../core/ZenWords'

interface WrapperStyle {
    wrapper: object
    quote: object
}

export const WordWrapper : Function = ( props : any ) : JSX.Element => { 
    
    const words : string = props?.words ?? ''

    const spllitedWords = (typeof words === 'string') ? words.split(' ') : undefined 
    const undefinedElement = <></>

    if(typeof spllitedWords === 'undefined') return undefinedElement
    
    return (
        <View key={randomKey()}>
            <ZenWords words={spllitedWords} />
        </View>
    )
}
