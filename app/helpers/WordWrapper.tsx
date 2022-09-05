import React from 'react'
import { View } from 'react-native'
import { randomKey } from './UniqueKey'
import { ZenWords } from '../core/ZenWords'

interface WrapperStyle {
    wrapper: object
    quote: object
}

export const WordWrapper : Function = ( props : any ) : JSX.Element => { 
    
    const words : string = props?.words ?? ''
    const style : WrapperStyle = props?.style ?? {quote: {}, wrapper: {fontWeight: 600}}
    const {zWords, setZWords} = props

    const spllitedWords = (typeof words === 'string') ? words.split(' ') : undefined 
    const undefinedElement = <></>

    if(typeof spllitedWords === 'undefined') return undefinedElement
    
    return (
        <View key={randomKey()}>
            <ZenWords
                zWords={zWords}
                setZWords={setZWords} 
                words={spllitedWords}
                styleWrap={style}
                />
        </View>
    )
}
