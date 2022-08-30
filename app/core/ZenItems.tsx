import React from 'react'
import { ZenQuotes } from './ZenQuotes'
import { ZenImages } from './ZenImages'

export interface ZenItemType  {
    id: number
    image: string
    quote: string
} 

export interface ZenItemsType {
    _forEach: ( (fHandler : Function) => void ) | ( () => void )
    items: ZenItemType[]
}

export const ZenItems = async () => {

    const zenQuotes : any[] = []

    await ZenQuotes().then(async (data) => {
        if(data && data.length){
            let dataIndex = 0
            await ZenImages(data.length).then(images => {
                images.forEach((image : any) => {
                    const quote : string | false = data[dataIndex]?.q ?? false
                    const url : string | false = image?.url ?? false
                    if(quote && url){    
                        const zenItem : ZenItemType = {
                            id: dataIndex++,
                            image: url,
                            quote: quote
                        }
                        zenQuotes.push(zenItem)
                    }
                })
            })
        }
    })

    const zenReturn : ZenItemsType = {
        _forEach: (fHandler : Function) => {
            try {
                Object.entries(zenQuotes).forEach(function ([key, value], index) {
                    fHandler(value, index)
                })
                return true
            } catch(e) {
                return false
            }
        },
        items: zenQuotes
    }

    return zenReturn
}