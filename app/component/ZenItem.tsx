import { StyleSheet, Dimensions, Text, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'

import { ZenItemType } from '../core/ZenItems'
import { ZenImage } from '../component/ZenImage'

const {height, width} = Dimensions.get('window')

const MIN_HEIGHT : number = height
const MAX_HEIGHT : number = height
const TOUCH_SLOP : number = 5
const TIME_TO_ACTIVATE_PAN : number = 400

const FADE_HIDDEN : number = 0.25
const FADE_NEXT : number = 0.35 // it must be different than FADE_HIDDEN

const ZenItem : Function = (props: any) : JSX.Element => {

  const item : ZenItemType = props?.item ?? false

  const y : any = props.y 
  const index : number = props.index
  const onHidden : Function = props?.onHidden ?? (() => null)
  const itemStyle : object = props?.styke ?? {} 
 
  const touchStart = useSharedValue({x: 0, y: 0, time: 0})
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const rStyle = useAnimatedStyle(() => {
    const rHeight : number = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [MIN_HEIGHT, MAX_HEIGHT],
      Extrapolate.CLAMP,
    )

    const opacity : number = interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT, (index + 1) * MAX_HEIGHT],
      [FADE_NEXT, 0.5, FADE_HIDDEN],
      Extrapolate.CLAMP,
    )

    if(opacity == 0.25){
        onHidden(index)
    }

    return {
      height: rHeight,
      opacity: opacity,
      transform: [
        {
          perspective: 300,
        },
        {
          rotateY: `${rotateY.value}deg`,
        },
      ]
    }
  })

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateY.value = withTiming(
        interpolate(event.x, [0, MAX_HEIGHT], [-8, 8], Extrapolate.CLAMP),
      )
    })
    .manualActivation(true)
    .onTouchesDown(e => {
      touchStart.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        time: Date.now(),
      }
    })
    .onTouchesMove((e, state) => {
      if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
        state.activate()
      } else if (
        Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
        Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
      ) {
        state.fail()
      }
    })
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, MAX_HEIGHT],
        [5, -5],
        Extrapolate.CLAMP,
      )
      rotateY.value = interpolate(
        event.x,
        [0, MAX_HEIGHT],
        [-5, 5],
        Extrapolate.CLAMP,
      )
    })
    .onFinalize(() => {
      rotateY.value = withTiming(0)
      rotateX.value = withTiming(0)
    })


  let [fontsLoaded] = useFonts({
    'Montserrat-Thin': require('../assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
  })
 
  const quoteFont : string = 'Montserrat-Light'

  const customFontStyle : object = { paddingHorizontal: 5, fontFamily: fontsLoaded ? quoteFont : 'sans-serif' }

  const usedKeys : object = []
  const uniqueKey : Function = () : string => {
    const generatedKey : string = '_' + Math.random().toString(36).substr(2, 9)
    if(generatedKey in usedKeys) return uniqueKey()
    return generatedKey
  }

  const youWrapper : Function = (words : string) : JSX.Element[] => {
      const undefinedElement = [<></>] 
      const wordsWrapped : JSX.Element[] = []
      const spllitedWords = words?.split(' ') ?? undefined
      if(typeof spllitedWords === 'undefined') return undefinedElement
      const key : string = uniqueKey()
      spllitedWords.map(word => {
          let styleYou = {...customFontStyle}
          if(word.toLocaleLowerCase().trim() == 'you') styleYou = {...styleYou, fontWeight: '600'}
          const props : object = {style: styleYou, key: key}
          wordsWrapped.push(<Text {...props}>{word}</Text>)
      })
      return wordsWrapped
  }


  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.imageContainer, rStyle]}>
        <ZenImage source={ { uri: item.image } } style={ styles.image } />
        <View style={ styles.quoteContainer }>
          <Text style={ styles.quote }>
              {youWrapper(item.quote)}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    height: MAX_HEIGHT,
    width: width,
  },
  image: {
    height: undefined,
    width: undefined,
    flex: 1,
  },
  quote: {
    backgroundColor: 'rgba(255,255,255,.55)',
    color: 'black',
    fontWeight: '300',
    fontSize: 32,
    padding: 30,
    maxWidth: '90%',
    elevation: 1,
    textAlign: 'center',
    flexDirection: 'row',
  },
  quoteContainer: {
    backgroundColor: 'rgba(39, 122, 225,.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ZenItem