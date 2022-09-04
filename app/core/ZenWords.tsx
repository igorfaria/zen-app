import React from 'react'
import { Text } from 'react-native'
import { UniqueKey } from '../helpers/UniqueKey'

export const ZenWords : Function = (word : string, key : string = '', styleWrap: any = {}) : JSX.Element => {
    if(key.length == 0) key = UniqueKey()
    word = `${word} ` 
    let wrappedWord : JSX.Element | string = <Text key={key}>{word}</Text>
    switch(word.replace(/[\s\,\.]/, '')) {
        case 'you': case 'love': 
        case 'believe': case 'heart':
        case 'live': case 'life':
        case 'success': case 'care':
        case 'positive': case 'truth':
        case 'truly': case 'best':
        case 'future': case 'dream':
        case 'power': case 'liberty':
        case 'present': case 'potential': 
        case 'emotion': case 'precious': 
        case 'secret': case 'work': 
        case 'heal': case 'time': case 'health':
        case 'mind': case 'action': case 'information' : 
        case 'wise': case 'good':
        case 'decision': case 'decisions': 
          const props : object = {style: styleWrap, key: key}
          wrappedWord = <Text {...props}>{word}</Text>
        break
      }
    return <>wrappedWord</>
}