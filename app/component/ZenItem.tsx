import { StyleSheet, Dimensions, Text, View, TouchableOpacity,  } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'

import { ZenItemType } from '../core/ZenItems'
import { ZenImage } from '../component/ZenImage'
import { WordWrapper } from '../helpers/WordWrapper'
import { randomKey } from '../helpers/UniqueKey'

const {height, width} = Dimensions.get('window')

const MIN_HEIGHT : number = height
const MAX_HEIGHT : number = height
const TOUCH_SLOP : number = 5
const TIME_TO_ACTIVATE_PAN : number = 400

const FADE_HIDDEN : number = 0.25
const FADE_NEXT : number = 1 // it must be different than FADE_HIDDEN

const ZenItem : Function = (props: any) : JSX.Element => {

  const item : ZenItemType = props?.item ?? false

  const y : any = props.y 
  const index : number = props.index
  const itemStyle : object = props?.style ?? {} 
  const customFontStyle : any = props?.customFontStyle ?? {quote: {}, wrapper: {fontWeight: '600'}}
  const {zWords, setZWords} = props
 
  const touchStart = useSharedValue({x: 0, y: 0, time: 0})
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const rStyle = () => {
    return useAnimatedStyle(() => {
      const rHeight : number = interpolate(
        y.value,
        [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolate.CLAMP,
      )

      const transformStyle = {  
        transform: [ { perspective: 300 }, { rotateY: `${rotateY.value}deg` }
      ]}

      return {
        height: rHeight,
        ...transformStyle,
        opacity: 1,
      }
    })
  }

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
  }).onTouchesMove((e, state) => {
    if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
      state.activate()
    } else if (
      Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
      Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
    ) {
      state.fail()
    }
  }).onUpdate(event => {
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
  }).onFinalize(() => {
    rotateY.value = withTiming(0)
    rotateX.value = withTiming(0)
  })

  return (
    !item 
    ? <></>
    : <GestureDetector gesture={gesture}>
      <Animated.View style={rStyle()}>
        <ZenImage 
          source={ { uri: item.image , cache: 'only-if-cached'} } style={styles.image} />
          <View style={ styles.quoteContainer }>
              <TouchableOpacity style={ styles.quote }>
                  <WordWrapper 
                    zWords={zWords}
                    setZWords={setZWords}
                    words={item.quote} 
                    style={customFontStyle} />
                    {item?.author ? (<Text style={{...customFontStyle.quote, ...styles.author}}>{item.author}</Text>) : (<></>)}
              </TouchableOpacity>
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
    zIndex: 1,
    opacity: .5
  },
  quote: {
    backgroundColor: 'rgba(255,255,255,.4)',
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '100%',
    maxWidth: '90%',
    elevation: 1,
    textAlign: 'center',
    flexDirection: 'column',
    zIndex: 2,
  },
  quoteContainer: {
    backgroundColor: 'rgba(0, 0, 0,.25)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'rgba(255,255,255,.6)',
    marginTop: 15,
    padding: 4,
  
  }
})

export default ZenItem