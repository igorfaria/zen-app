import { Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import { ZenItems, ZenItemType, ZenItemsType } from '../core/ZenItems'
import { ZenViewItems } from './ZenViewItems'
import { randomItems } from '../helpers/HelperArray'

// import Toast from 'react-native-root-toast'

const {height} = Dimensions.get('window')

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
        setRandomData(randomItems(merged))
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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar hidden />
      <AnimatedScrollView
        scrollEventThrottle={32}
        snapToInterval={height}
        decelerationRate="normal"
        onScroll={onScroll}>
        <ZenViewItems 
          y={y}
          height={randomData.length * height}
          data={randomData}
          onHidden={onHidden}
        />
      </AnimatedScrollView>
    </GestureHandlerRootView>
  )
}