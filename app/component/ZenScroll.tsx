import { Dimensions, StatusBar } from 'react-native'
import React from 'react'
import Item from './Item'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

import { ZenItems, ZenItemType, ZenItemsType } from '../core/ZenItems'

const {height} = Dimensions.get('window')

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

let loadData = true

export const ZenScroll: React.FC = () => {

  const [data, setData] = React.useState<any[]>(['lorem'])

  React.useEffect(() => {
    if(loadData) {
      (async () => await ZenItems().then((items : ZenItemsType) => {
        const merged = [...data]
        items._forEach((value : ZenItemType, index : number) => {
          if(id in value) merged.push(value)    
        })
        setData([...merged])
      }))()
      loadData = false
    } 
  }, [data])

  const y = useSharedValue(0)
  
  const [ animatedViewHeight, setAnimatedViewHeight ] = React.useState(0)
  
  const onScroll = useAnimatedScrollHandler(event => {
    y.value = event.contentOffset.y
    setAnimatedViewHeightValue()
  })

  const [clonedIndex, setClonedIndex] = React.useState<number[]>([])

  const onHidden = (index : number) => {
      if(index in clonedIndex) return
      const hiddenItem = data[index]
      setClonedIndex([...clonedIndex, index])
      let mergedList : ZenItemType[] = [...data, hiddenItem]
      setData(mergedList)
  }

  const setAnimatedViewHeightValue = () => {
    console.log('setAniVieVal', data)
    setAnimatedViewHeight(data.length * height)
  }
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar hidden />
      <AnimatedScrollView
        scrollEventThrottle={16}
        snapToInterval={height / 1.15}
        decelerationRate="fast"
        style={{backgroundColor: 'black'}}
        onScroll={onScroll}>
        <Animated.View style={{
          height: animatedViewHeight
        }}>
          {data.map((item : ZenItemType, index : number) => (
            <Item 
              y={y} 
              onHidden={(index: number) => onHidden(index)}
              index={index} 
              item={item} 
              key={index} />
          ))}
        </Animated.View>
      </AnimatedScrollView>
    </GestureHandlerRootView>
  )
}

