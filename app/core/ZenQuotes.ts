import axios from 'axios'
import { quotesJSON } from './tmp/quotes'
import { ArrayRandomize } from '../helpers/HelperArray'

export const ZenQuotes : Function = /* async */ (quantity : number = 30, start : number = 0) : object[] =>{
    try {
/*      const ZEN_URL = 'https://zenquotes.io/api/quotes/'
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const response = await axios.get(proxy + ZEN_URL)
        return response.data */
        const sliced : any[] = quotesJSON.slice(start, start + quantity)
        return ArrayRandomize(sliced)
      }catch (error) {
        console.log(error) // catches both errors
      }
    return []
}