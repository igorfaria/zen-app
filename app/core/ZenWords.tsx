import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Toast from 'react-native-root-toast'
import { randomKey } from '../helpers/UniqueKey'


export const ZenWords : Function = ( props : any ) : JSX.Element => {

    const words : string[] = props?.words ?? []
    const styleWrap : any = props?.styleWrap ?? {quote: {}, wrapper: {}}
    const {zWords, setZWords} = props
    
    const createElement : Function = (word : string) : JSX.Element => {
      const [bold, setBold] = React.useState(0)
      
      const normalizedWord : string = word.toLowerCase().replace(/[\s\,\.]/, '')
      const aBold = (bold || zWords.includes(normalizedWord))

      const handlePress : Function = (word : string) => {
        const action : string = (!bold ? 'Adding' : 'Removing') + ` ${word}`
        Toast.show(`${action}`, {
          animation: true,
        })
        setZWords(word, aBold ? true : false)
        setBold(aBold?0:1)
      }     
 
      return (
        <TouchableOpacity 
          onPress={() => handlePress(word)} 
          key={randomKey()} >
          <Text style={ [styles.quote, (aBold ? styleWrap.wrapper : styleWrap.quote)] } 
            onPress={() => handlePress(word)}>{word} </Text>
        </TouchableOpacity>
      )
    }

    const initialElement : JSX.Element[] = words.map( (word : string) => createElement(word) )
     let wrappedWord : JSX.Element[] = initialElement


    /*const checkWord: Function =  (word : ) : Promise<JSX.Element> => {
        const zenWords : string[] = []
        if(zenWords && word.replace(/[\s\,\.]/, '') in zenWords){
            const props : object = {style: bold ? styleWrap : {}}
            return (<Text {...props}>{word}</Text>)
        }
        return initialElement
    }*/

    return <TouchableOpacity 
        key={randomKey()}
        style={ styles.container }
        >
          {wrappedWord}
      </TouchableOpacity>
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
  }
})