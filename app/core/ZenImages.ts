import axios from 'axios'
import { imagesJSON } from './tmp/images'
import { ArrayRandomize } from '../helpers/HelperArray'

export const ZenImages : Function = /* async */  (quantity : number = 30, start : number = 0) : object[] =>{
    try {
/*      const PICSUM_URL = `https://picsum.photos/v2/list?page=1&limit=${limit}`
        const response = await axios.get(PICSUM_URL);
        return response.data; */
        const sliced : any[] = ArrayRandomize(imagesJSON).slice(start, start + quantity)
        return sliced
      }catch (error) {
        console.log(error) // catches both errors
      }
    return []
}