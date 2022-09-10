import React, { useState, memo, useEffect } from 'react'
import { View, Image } from 'react-native'
import { ZenCache } from '../core/ZenCache'
import md5 from 'md5'


export interface ZenImageType {
    source: any,
    cacheKey?: string | number,
    style?: object,
}

const ZenImage = (props: any) : JSX.Element => {

    const [sourceUri, setSourceUri] = useState<string>('')
    
    const configs : ZenImageType = {
        source: props?.source,
        cacheKey: props?.cacheKey ?? md5(JSON.stringify(props)),
        style: props?.style ?? {},
    }

    useEffect(()=>{
        if(configs?.source?.uri ?? false){
            ZenCache(
                configs.source.uri,
                configs?.cacheKey ?? configs.source.uri,
            ).then(file => {
                if(file) {
                    setSourceUri(file)
                }
            })            
        }
    }, [])

    if(sourceUri.length > 0){
        configs.source.uri = sourceUri
    }

    return (
        sourceUri 
        ? ( 
        <>
        <Image {...configs} style={ configs.style } resizeMode={'cover'} />
        <View style={
           { 
            position: 'absolute',
            top: 0, left: 0, bottom: 0, right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        } 
        }></View>
        </>
        )
        : <></>

    )
}

export default memo<any>(ZenImage)