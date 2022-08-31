import { Dimensions, StatusBar, ImageBackground } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { useFonts } from 'expo-font'

import { ZenItems, ZenItemType, ZenItemsType } from '../core/ZenItems'
import { ZenViewItems } from './ZenViewItems'
import { RandomItems } from '../helpers/HelperArray'

const {width, height} = Dimensions.get('window')

let loadData : boolean = false

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

export const ZenScroll: React.FC = () : JSX.Element => {

  const [data, setData] = React.useState<ZenItemType[]>([])
  const [randomData, setRandomData] = React.useState<ZenItemType[]>([])
  const y = useSharedValue(0)

  React.useEffect(() => {
    if(!loadData) {
      (async () => await ZenItems().then((items : ZenItemsType) : void => {
        const merged : ZenItemType[] = [...data]
        items._forEach((
          value : ZenItemType, index : number) => merged.push(value)    
        )
        setData(merged)
        setRandomData(RandomItems(merged, merged.length))
        loadData = true
      }))()
    }   
  }, [data])

  //const [clonedIndex, setClonedIndex] = React.useState<number[]>([])

  const onHidden : Function = (index : number) : void => {
      'worklet'
      /* if(index in clonedIndex) return
      const hiddenItem = data[index]
      setClonedIndex([...clonedIndex, index])
      let mergedList : ZenItemType[] = [...data, hiddenItem]
      setData(mergedList) */
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

  return (
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
        onScroll={onScroll}>
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
}