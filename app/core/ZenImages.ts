import axios from 'axios'
import { imagesJSON } from './tmp/images'

export const ZenImages : Function = async (limit = 100) : Promise<object[] | void> =>{
    try {
/*      const PICSUM_URL = `https://picsum.photos/v2/list?page=1&limit=${limit}`
        const response = await axios.get(PICSUM_URL);
        return response.data; */
        return await imagesJSON
      }catch (error) {
        console.log(error) // catches both errors
      }
}