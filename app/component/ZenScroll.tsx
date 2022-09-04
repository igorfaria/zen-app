import { Dimensions, StatusBar, ImageBackground, Image } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { useFonts } from 'expo-font'

import { ZenItems, ZenItemType, ZenItemsType } from '../core/ZenItems'
import { ZenViewItems } from './ZenViewItems'
import { ZenSplash } from './ZenSplash'

import Toast from 'react-native-root-toast' 

const {width, height} = Dimensions.get('window')

let loadData : boolean = false

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

export const ZenScroll: React.FC = () : JSX.Element => {

  const [data, setData] = React.useState<ZenItemType[]>([])
  const [randomData, setRandomData] = React.useState<ZenItemType[]>([])
  const [startIndex, setStartIndex] = React.useState<number>(0)
  const y = useSharedValue(0)
  let prefecthedImages = 0
  const prefecthed : Function = (url : string) : void => {
    prefecthedImages++
  }

  React.useEffect(() => {
      const total : number = randomData.length
      if(total < 200) {
        (async () => await ZenItems(50, total + 1).then((items : ZenItemsType) : void => {

          let merged : ZenItemType[] = []
          items._forEach((
            value : ZenItemType, index : number) => {
              Image.prefetch(value.image).then(status => {
                const res : string = status ? 'OK' : 'NOPE'
                prefecthed(`${res}: ${value.image}`)
              })
              return merged.push(value)
            }    
          )

          merged = [...randomData, ...merged]
          const uniqueQuotes : any[] = [];
          merged = merged.filter((item : ZenItemType) => {
            const isDuplicate = uniqueQuotes.includes(item.quote)
            if (!isDuplicate) {
              uniqueQuotes.push(item.quote)
              return true
            }
            return false
          })
          
          const initial : boolean = randomData.length == 0
          let secondsTimeout : number = initial ? 15 : 25
          let toastMessage : string = initial ? '' : `New quotes added (${merged.length})` 

          if(toastMessage.length) {
            Toast.show(toastMessage)
          }

          setTimeout(() => {
            setRandomData(merged)
          }, secondsTimeout * 1000)
          
        }))()   
      }
  }, [randomData])


  //const [clonedIndex, setClonedIndex] = React.useState<number[]>([])
  const onHidden : Function = (index : number) : void => {
      'worklet'
      /* 
      if(index in clonedIndex) return
      const hiddenItem = data[index]
      setClonedIndex([...clonedIndex, index])
      let mergedList : ZenItemType[] = [...data, hiddenItem]
      setData(mergedList) 
      */
  }

  const onScroll = useAnimatedScrollHandler( event => y.value = event.contentOffset.y )

  let [fontsLoaded] = useFonts({
    'Montserrat-Thin': require('../assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
  })
 
  const quoteFont : string = 'Montserrat-Light'
  const wrapperFont : string = 'Montserrat-Regular'

  const customFontStyle : object = { paddingHorizontal: 5, fontFamily: fontsLoaded ? quoteFont : 'sans-serif' }
  const customWrapperFontStyle : object = {...customFontStyle, fontFamily: fontsLoaded ? wrapperFont : 'sans-serif'}
  const customFontValues : object = {quote: customFontStyle, wrapper: customWrapperFontStyle}

  /* onScroll={onScroll} */
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
          onHidden={onHidden}
          customFontStyle={ customFontValues }
        />
      </AnimatedScrollView>
    </GestureHandlerRootView>
    )
  )
}