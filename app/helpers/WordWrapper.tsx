import React from 'react'
import { Text } from 'react-native'
import { UniqueKey } from './UniqueKey'
import { ZenWords } from '../core/ZenWords'

interface WrapperStyle {
    wrapper: object
    quote: object
}

export const WordWrapper : Function = (words : string, style : WrapperStyle = {quote: {}, wrapper: {fontWeight: 600}} ) : JSX.Element => { 
    
    const spllitedWords = (typeof words === 'string') ? words.split(' ') : undefined 
    
    const undefinedKey : string = UniqueKey() 
    const undefinedElement = <Text key={undefinedKey}></Text>

    if(typeof spllitedWords === 'undefined') return undefinedElement
    
    const usedKeys : string[] = []
    const wordsWrapped : any[] = []

    spllitedWords.map(word => {
        const key = UniqueKey(usedKeys)
        usedKeys.push(key)
        const wrappedWord = ZenWords(word, key, style.wrapper)
        wordsWrapped.push(wrappedWord)
    })

    return <Text key={UniqueKey(usedKeys)} style={style.quote}>{wordsWrapped.map(w => w)}</Text>
}
