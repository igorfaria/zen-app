import { ZenQuotes } from './ZenQuotes'
import { ZenImages } from './ZenImages'
import { Dimensions } from 'react-native'

export interface ZenItemType  {
    id: number
    image: string
    quote: string
    author?: string
} 

export interface ZenItemsType {
    _forEach: ( (fHandler : Function) => void ) | ( () => void )
    items: ZenItemType[]
}

const {width, height} = Dimensions.get('window')

const ZenItems = (quantity : number = 30, start : number = 0) : object[] => {

    let zenQuotes : object[] = []
    const data = ZenQuotes(quantity, start)
    if(data && data.length){
        let dataIndex = 0 
        ZenImages(Math.floor(data.length * 1.1), start).forEach( ( image : any ) => {
        const item : any = data[dataIndex] || false
        let quote : string = (item && 'q'in item) ? item.q : ''

        //const url : string | false = image?.download_url ?? false
        const url : string = `https://picsum.photos/id/${image.id}/${width}/${height}/`
        if(quote && quote.length > 0 && url){
            const author : string = item.a ?? 'Unkown' 
            if(quote.slice(-1) == '.'){
                quote = quote.substring(0, quote.length - 1)
            }
            const zenItem : ZenItemType = {
                id: dataIndex,
                image: url,
                quote: quote,
                author: author,
            }
            zenQuotes.push(zenItem)
        } 
        dataIndex++
        
    })
}

    return zenQuotes
}

export default ZenItems