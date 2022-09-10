import React, { memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-root-toast'
import { randomKey } from '../helpers/UniqueKey'
import { ZC } from './ZenContext'


const ZenWords : Function = ( props : any ) : JSX.Element => {

    const {zenWords, setZenWord} : any = React.useContext(ZC)

    const words : string[] = props?.words ?? []
    const styleWrap : any = props?.styleWrap ?? {quote: {}, wrapper: {}}
    
    const createElement : Function = (word : string) : JSX.Element => {
      const [bold, setBold] = React.useState(0)
      const normalizedWord : string = word.toLowerCase().replace(/[\s\,\.]/, '')
      const aBold = (bold || zenWords.includes(normalizedWord))

      const handlePress : Function = (word : string) => {
        const action : string = (!aBold ? 'Adding' : 'Removing') + ` ${word}`
        console.log(action)
        Toast.show(`${action}`, { animation: true })
        setZenWord(word, aBold ? true : false)
        setBold(aBold?1:0)
      }     
 
      return ( 
        <TouchableOpacity 
          key={randomKey()} 
          onPress={() => handlePress(word)}
          >
          <Text 
            style={ [styles.quote, (aBold ? styleWrap.wrapper : styleWrap.quote)] } >
              {word} 
          </Text>
        </TouchableOpacity>)
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
    marginRight: 5,
  }
})

export default memo<any>(ZenWords)