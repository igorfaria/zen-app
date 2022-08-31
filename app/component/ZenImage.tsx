import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { ZenCache } from '../core/ZenCache'
import md5 from 'md5'

export interface ZenImageType {
    source: any,
    cacheKey?: string | number,
    style?: object
}

export const ZenImage = (props: any) : JSX.Element => {
    
    const [sourceUri, setSourceUri] = useState<string>('')

    const configs : ZenImageType = {
        source: props?.source,
        cacheKey: props?.cacheKey ?? md5(JSON.stringify(props)),
        style: props?.style ?? {}
    }
    useEffect(()=>{
        if(configs?.source?.uri ?? false){
            ZenCache(
                configs.source.uri,
                configs?.cacheKey ?? configs.source.uri,
            ).then(file => {
                if(file) setSourceUri(file)
            })            
        }
    }, [])
    
    return (
        sourceUri 
        ? <Image {...configs} />
        : <View style={{ ...configs.style, alignItems: "center", justifyContent: "center" }} >
        <ActivityIndicator size={33} />
      </View>
    )
}