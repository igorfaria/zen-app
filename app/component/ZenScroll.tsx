import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font'
import React from 'react'
import { Dimensions } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import ZenItems, { ZenItemType } from '../core/ZenItems'
import ZenDefaultBackground from './ZenDefaultBackground'
import ZenSplash from './ZenSplash'
import ZenViewItems from './ZenViewItems'
import { ZenContext } from '../core/ZenContext'

const MAX_ITEMS = 250
const { width, height } = Dimensions.get('window')
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const ZenScroll : React.FC = () : JSX.Element => {

    const [quotes, setQuotes] = React.useState<ZenItemType[]>([])

    React.useMemo(() => {
        const total = quotes.length 
        if(total < MAX_ITEMS){
            let items : ZenItemType[] = [] 
            ZenItems( 250 , total ).forEach( ( item : any ) => {
               if(!quotes.includes( item )) items.push( item )
            })
            setTimeout( () => setQuotes( [...quotes, ...items] ), total ? 5000 : 1 )
        }
    }, [quotes])

    let [fontsLoaded] = useFonts({
        'Montserrat-Light': require('../assets/fonts/Montserrat/static/Montserrat-Light.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
    })
    
    const quoteFont : string = 'Montserrat-Light'
    const wrapperFont : string = 'Montserrat-Regular'  
    const customFontStyle : object = { fontFamily: fontsLoaded ? quoteFont : 'sans-serif' }
    const customWrapperFontStyle : object = {...customFontStyle, fontFamily: fontsLoaded ? wrapperFont : 'sans-serif'}
    const customFontValues : object = {quote: customFontStyle, wrapper: customWrapperFontStyle}
    const y = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler( e => y.value = e.contentOffset.y )

    return (
        (!fontsLoaded || quotes.length == 0 )
        ? <ZenSplash />
        : <GestureHandlerRootView style={{flex: 1}}>
            <ZenDefaultBackground 
                width={width} 
                height={height} 
                top={y.value} />
                <AnimatedScrollView
                    style={ { zIndex: 2 } }
                    scrollEventThrottle={2}
                    snapToInterval={height}
                    decelerationRate="normal" >
                        <ZenContext value={
                            {
                                customFontValues: customFontValues,
                            }
                        }>
                        <ZenViewItems 
                            y={y}
                            height={quotes.length * height}
                            data={quotes}
                         />
                        </ZenContext>
                </AnimatedScrollView>
          </GestureHandlerRootView>

        
    )
}

export default ZenScroll