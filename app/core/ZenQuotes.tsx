import axios from 'axios'
import { quotesJSON } from './tmp/quotes'

export const ZenQuotes = async ()=>{
    try {
/*         const ZEN_URL = 'https://zenquotes.io/api/quotes/'
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const response = await axios.get(proxy + ZEN_URL)
        return response.data */
        return await quotesJSON
      }catch (error) {
        console.log(error) // catches both errors
      }
}