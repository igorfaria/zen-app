import axios from 'axios'

export const ZenImages = async (limit = 100)=>{
    try {
        const PICSUM_URL = `https://picsum.photos/v2/list?page=1&limit=${limit}`
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const response = await axios.get(proxy + PICSUM_URL);
        return response.data;
      }catch (error) {
        console.log(error);; // catches both errors
      }
}