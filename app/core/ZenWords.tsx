import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BoldWords } from '../helpers/BoldWords'
import { randomKey } from '../helpers/UniqueKey'
import { ZC } from './ZenContext'


const ZenWords : React.FC = ( props : any ) : JSX.Element => {

    const {customFontValues} : any = React.useContext(ZC)
    
    const words : string[] = props?.words ?? []
    const styleWrap : any = customFontValues ? customFontValues : {quote: {}, wrapper: {}}
    
    const createElement : Function = (word : string) : JSX.Element => {
      const normalizedWord : string = word.toLowerCase().replace(/[^A-Za-z0-9]/g, '')
      const aBold = BoldWords.includes(normalizedWord)

      return (
        <TouchableOpacity key={randomKey()} >
          <Text 
            style={ [styles.quote, (aBold ? styleWrap.wrapper : styleWrap.quote)] } >
              {word} 
          </Text>
        </TouchableOpacity>
      )
    }

    const initialElement : JSX.Element[] = words.map( (word : string) => createElement(word) )
    let wrappedWord : JSX.Element[] = initialElement

    return <View key={randomKey()} style={styles.container}>{wrappedWord}</View>
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%', 
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  quote: {
    color: 'black',
    fontWeight: '300',
    fontSize: 32,
    marginRight: 8,
  }
})

export default memo<JSX.Element>(ZenWords)