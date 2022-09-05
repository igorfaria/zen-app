import { Dimensions, StatusBar, ImageBackground, Image } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { useFonts } from 'expo-font'

import { ZenItems, ZenItemType, ZenItemsType } from '../core/ZenItems'
import { ZenViewItems } from './ZenViewItems'
import { ZenSplash } from './ZenSplash'
import AsyncStorage from '@react-native-async-storage/async-storage'



const {width, height} = Dimensions.get('window')

let loadData : boolean = false

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

export const ZenScroll: React.FC = () : JSX.Element => {

  const [randomData, setRandomData] = React.useState<ZenItemType[]>([])

  const getZenWords : Function = async () : Promise<[] | []> => {
    try {
      const zenWords = await AsyncStorage.getItem('_zenWords')
      if(typeof zenWords == 'string') {
        const json = JSON.parse(zenWords)
        return (json && json.length) ? json : []
      }
    } catch(e) {
      // fail :(
    }
    return []
  }
  
  const setZenWord : Function = async (word : string, remove : boolean = false) : Promise<boolean> => {
      
      if(word.length == 0) return false
      const zenWords = await getZenWords()
      if(typeof zenWords != 'object') return false
  
      word = word.replace(/[\s\,\.]/, '').toLowerCase() 
  
      console.log('remove', remove)

      const zenIndex = zenWords.indexOf(word)
      if(remove){
        if(zenIndex !== -1) zenWords.splice(zenIndex, 1)
      } else {
        if(!zenWords.includes(word)) {
          zenWords.push(word)
        }
      }
      setZWords(zenWords)
      await AsyncStorage.setItem('_zenWords', JSON.stringify(zenWords))
      return true
  }
  const [zWords, setZWords] = React.useState<string[]>([])
  
  const y = useSharedValue(0)

  React.useEffect(() => {
      const total : number = randomData.length

      if(total < 50) {

        (async () => await ZenItems(10, total).then((items : ZenItemsType) : void => {

          let merged : ZenItemType[] = []
          items._forEach((
            value : ZenItemType, index : number) => {
              Image.prefetch(value.image)
              return merged.push(value)
            }    
          )

          merged = [...randomData, ...merged]
          const uniqueQuotes : any[] = []
          merged = merged.filter((item : ZenItemType) => {
            const isDuplicate = uniqueQuotes.includes(item.quote)
            if (!isDuplicate) {
              uniqueQuotes.push(item.quote)
              return true
            }
            return false
          })
          
          const initial : boolean = randomData.length == 0
          let secondsTimeout : number = initial ? 5 : 15

          setTimeout(() => {
            setRandomData(merged)
          }, secondsTimeout * 1000)
          
        }))()   
      }

      (async () => {
          const zw = await getZenWords()
          setZWords(zw) 
      })()

  }, [randomData])

  const onScroll = useAnimatedScrollHandler( event => y.value = event.contentOffset.y )

  let [fontsLoaded] = useFonts({
    'Montserrat-Thin': require('../assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
  })
 
  const quoteFont : string = 'Montserrat-Light'
  const wrapperFont : string = 'Montserrat-Regular'

  const customFontStyle : object = { fontFamily: fontsLoaded ? quoteFont : 'sans-serif' }
  const customWrapperFontStyle : object = {...customFontStyle, fontFamily: fontsLoaded ? wrapperFont : 'sans-serif'}
  const customFontValues : object = {quote: customFontStyle, wrapper: customWrapperFontStyle}

  return (
    randomData.length == 0 || !fontsLoaded
    ? <ZenSplash />
    : (
    <GestureHandlerRootView style={{flex: 1}}>

      <ImageBackground 
        style={ {
          position: 'absolute',
          left: 0, top: y.value,
          width: width,
          height: height,
          zIndex: 1,
        } } 
        resizeMode={'cover'}
        source={ require('../assets/background/pattern-1.jpg') } />

      <StatusBar hidden />
      <AnimatedScrollView
        style={ { zIndex: 2 } }
        scrollEventThrottle={1}
        snapToInterval={height}
        decelerationRate="normal"
        >
        <ZenViewItems 
          y={y}
          height={randomData.length * height}
          data={randomData}
          customFontStyle={ customFontValues }
          setZWords={setZenWord}
          zWords={zWords}
        />
      </AnimatedScrollView>
    </GestureHandlerRootView>
    )
  )
}