import { StyleSheet, Dimensions, Text, View,  } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'

import { ZenItemType } from '../core/ZenItems'
import { ZenImage } from '../component/ZenImage'
import md5 from 'md5'

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
  const customFontStyle : any = props?.customFontStyle ?? {quote: {}, wrapper: {fontWeight: '600'}}
 
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

      const opacity : number = interpolate(
        y.value,
        [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT, (index + 1) * MAX_HEIGHT],
        [FADE_NEXT, 1, FADE_HIDDEN],
        Extrapolate.CLAMP,
      )

      if(opacity == FADE_HIDDEN) onHidden(index)

      const transformStyle = {  
        opacity: opacity, transform: [
        { perspective: 300 },
        { rotateY: `${rotateY.value}deg` }
      ]}

      return {
        height: rHeight,
        ...transformStyle,
        backgroundColor: 'black'
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

  const usedKeys : string[] = []
  const uniqueKey : Function = () : string => {
    const generatedKey : string = Math.random().toString(36).substr(2, 9)
    const generatedKey2 : string = Math.random().toString(36).substr(2, 9)
    let finalKey : string[] | string = [generatedKey, generatedKey2]
    if(Math.random () >= 0.5) finalKey.reverse()
    finalKey = finalKey.join((Date.now()).toString())
    finalKey = md5(finalKey)
    if(finalKey in usedKeys) return uniqueKey()
    usedKeys.push(finalKey)
    return finalKey
  }

  const wordWrapper : Function = (words : string) : JSX.Element => {
      const spllitedWords = (typeof words === 'string') ? words.split(' ') : undefined 
      
      const undefinedElement = <Text key={uniqueKey()}></Text>

      if(typeof spllitedWords === 'undefined') return undefinedElement

      const wordsWrapped : any[] = []

      const replaceSignal : Function = (w : string, undo : boolean = false, substitue : string | boolean = false) : string => {
          const dotReplace : string = typeof substitue !== 'boolean' ? substitue : '___'
          const commaReplace : string = typeof substitue !== 'boolean' ? substitue : '|||'
          return (
            undo
            ? w.replace(dotReplace, '.').replace(commaReplace, ',')
            : w.replace('.', dotReplace).replace(',', commaReplace)
          ) 
      } 
      spllitedWords.map(word => {
          word = `${word} `
          let wrappedWord : string | JSX.Element = replaceSignal(word, true)
          const switchWord : string = replaceSignal(word.toLocaleLowerCase(), false, '')
          console.log(switchWord)
          switch(switchWord.replace(/\s/, '')) {
            case 'you': case 'love': 
            case 'believe': case 'heart':
            case 'live': case 'life':
            case 'success': case 'care':
            case 'positive': case 'truth':
            case 'truly': case 'best':
            case 'future': case 'dream':
            case 'power': case 'liberty':
            case 'present': case 'potential': 
            case 'emotion': case 'precious': 
            case 'secret': case 'work': 
            case 'heal': case 'time': case 'health':
            case 'mind': case 'action': case 'information' : 
            case 'wise': 
              const styleWrap = {...customFontStyle.quote, ...customFontStyle.wrapper }
              const props : object = {style: styleWrap, key: uniqueKey()}
              wrappedWord = <Text {...props}>{replaceSignal(word, true)}</Text>
            break
          }
          wordsWrapped.push(wrappedWord)
      })

      return <Text key={uniqueKey()} style={customFontStyle.quote}>{wordsWrapped.map(w => w)}</Text>
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={rStyle()}>
        <ZenImage source={ { uri: item.image } } style={styles.image} />
        <View style={ styles.quoteContainer }>
          <Text style={ styles.quote }>
              {wordWrapper(item.quote)}
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
    zIndex: 1,
  },
  quote: {
    backgroundColor: 'rgba(255,255,255,.6)',
    color: 'black',
    fontWeight: '300',
    fontSize: 32,
    padding: 30,
    maxWidth: '90%',
    elevation: 1,
    textAlign: 'center',
    flexDirection: 'row',
    zIndex: 2
  },
  quoteContainer: {
    backgroundColor: 'rgba(0, 0, 0,.7)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ZenItem