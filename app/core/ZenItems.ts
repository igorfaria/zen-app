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

export const ZenItems = async () : Promise<ZenItemsType> => {

    const zenQuotes : any[] = []

    await ZenQuotes().then(async (data : object[]) => {
        if(data && data.length){
            let dataIndex = 0
            await ZenImages(data.length).then(async (images : object[]) => {
                if(typeof images === 'undefined') return
                images.forEach((image : any) => {
                    const item : any = data[dataIndex] || false
                    let quote : string | false = (item && 'q'in item) ? item.q : false
                    const url : string | false = image?.download_url ?? false
                    if(quote && quote.length > 0 && url){
                        if(quote.slice(-1) == '.'){
                            quote = quote.substring(0, quote.length - 1)
                        }
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
        _forEach: (fHandler : Function) : boolean => {
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