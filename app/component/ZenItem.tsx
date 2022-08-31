import { StyleSheet, Dimensions, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming, ZoomIn } from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'

import { ZenItemType } from '../core/ZenItems'
import { ZenImage } from '../component/ZenImage'
import md5 from 'md5'

const {height, width} = Dimensions.get('window')

const MIN_HEIGHT : number = height
const MAX_HEIGHT : number = height
const TOUCH_SLOP : number = 5
const TIME_TO_ACTIVATE_PAN : number = 400

const FADE_HIDDEN : number = 0.45
const FADE_NEXT : number = 0.65 // it must be different than FADE_HIDDEN

const ZenItem : Function = (props: any) : JSX.Element => {

  const item : ZenItemType = props?.item ?? false

  const y : any = props.y 
  const index : number = props.index
  const onHidden : Function = props?.onHidden ?? (() => null)
  const itemStyle : object = props?.styke ?? {} 
 
  const touchStart = useSharedValue({x: 0, y: 0, time: 0})
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)

  const rStyle = (itemContainer : boolean = false) => {
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
        [FADE_NEXT, 0.8, FADE_HIDDEN],
        Extrapolate.CLAMP,
      )

      if(opacity == FADE_HIDDEN) onHidden(index)

      const transformStyle = itemContainer 
      ? {} 
      : {  opacity: opacity, transform: [
        { perspective: 300 },
       // { rotateY: `${rotateY.value}deg` }
      ]}

      return {
        height: rHeight,
        ...transformStyle
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


  let [fontsLoaded] = useFonts({
    'Montserrat-Thin': require('../assets/fonts/Montserrat/static/Montserrat-Thin.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
  })
 
  const quoteFont : string = 'Montserrat-Light'
  const wrapperFont : string = 'Montserrat-Regular'

  const customFontStyle : object = { paddingHorizontal: 5, fontFamily: fontsLoaded ? quoteFont : 'sans-serif' }

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
      spllitedWords.map(word => {
          word = `${word} `
          let styleYou = { ...customFontStyle }
          let wrappedWord : string | JSX.Element = word
          switch(word.toLocaleLowerCase().trim()) {
            case 'you': case 'love': 
            case 'believe': case 'heart':
            case 'live': case 'life':
            case 'success': case 'care':
            case 'positive': case 'truth':
            case 'truly': case 'best':
            case 'future': case 'dream':
            case 'power': case 'liberty':
            case 'present': 
              const wrapperFontStyle : object = (fontsLoaded) 
              ? { fontFamily: wrapperFont }  
              : { fontWeight: '700' }
              styleYou = {...styleYou, ...wrapperFontStyle }
              const props : object = {style: styleYou, key: uniqueKey()}
              wrappedWord = <Text {...props}>{word}</Text>
            break
          }
          wordsWrapped.push(wrappedWord)
      })

      return <Text key={uniqueKey()} style={customFontStyle}>{wordsWrapped.map(w => w)}</Text>
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={rStyle(true)}>

      <ImageBackground 
        style={ {
          position: 'absolute',
          left: 0, top: 0,
          width: '100%',
          height: height,
          zIndex: 1,
        } } 
        resizeMode={'cover'}
        source={ require('../assets/background/pattern-1.jpg') } />

        <Animated.View style={[rStyle(false), {zIndex: 2, backgroundColor: 'black'}]}>
          <ZenImage source={ { uri: item.image } } style={styles.image} />
        </Animated.View>
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
    backgroundColor: 'rgba(0, 0, 0,.5)',
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