import { Dimensions, StatusBar, ImageBackground, Image } from 'react-native'
import React, { memo } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { useFonts } from 'expo-font'

import ZenItems, { ZenItemType, ZenItemsType } from '../core/ZenItems'
import ZenViewItems from './ZenViewItems'
import ZenSplash from './ZenSplash'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Toast from 'react-native-root-toast'

const {width, height} = Dimensions.get('window')

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const ZenScroll: React.FC = () : JSX.Element => {

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

  const [items, setItems] = React.useState<any[]>([])
  React.useMemo(() => {
    let merged : ZenItemType[] = [] 
    merged = [...randomData, ...items]

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
    let secondsTimeout : number = initial ? 5 : 30

    setTimeout(() => {
      setRandomData(merged)
    }, secondsTimeout * 1000)
       
  }, [randomData,items]);

  React.useEffect(() => {
      const total : number = randomData.length

      if(total < 250) {
        let merged : ZenItemType[] = [] 
        ZenItems(30, total).forEach(  (item : any) => {
          Image.prefetch(item.image)
          merged.push(item)
        })
        setItems(merged)
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

export default memo<any>(ZenScroll)