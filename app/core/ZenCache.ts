import * as FileSystem from 'expo-file-system'
import { Platform } from 'react-native'

const CACHE_DIR = `${FileSystem.cacheDirectory}/cache/`

export const ZenCache =  async (uri : string, cacheKey : string | number) : Promise<string | undefined> => {
    // If it is the web app, the cache it's not supported right now - only the browser cache policy will handle it    
    if(Platform.OS == 'web') return uri

    const loadFile : Function = async () : Promise<string> => {

        let ext = getExtension(uri)
        if(Array.isArray(ext)) ext = ext[0]

        const cacheFileUri = `${CACHE_DIR}${cacheKey}.${ext}`
        
        let fileXistsInCache = await findFileInCache(cacheFileUri)

        if (fileXistsInCache.exists) {
            return cacheFileUri
        } else {
            let cached = await cacheFile(uri, cacheFileUri, () => {})
            return cached?.path ?? uri
        }
    }
     
   const getExtension : Function = (uri : string) : string | RegExpExecArray => {
        const basename : string | undefined = uri.split(/[\\/]/).pop()
        const noExt : string = '.noext'
        return (
            (typeof basename == 'string' && /[.]/.exec(basename))
            ? /[^.]+$/.exec(basename) ?? noExt
            : noExt
        )
   }

   const findFileInCache : Function = async (uri : any) : Promise<object> => {
    try {
      let info = await FileSystem.getInfoAsync(uri)
      return { ...info, err: false }
    } catch (error) {
      return {
        exists: false,
        err: true,
        msg: error,
      }
    }
  }

  const cacheFile : Function = async (uri : string, cacheUri : string, callback : any) : Promise<object> => {
    try {
      const downloadFile = FileSystem.createDownloadResumable(
        uri,
        cacheUri,
        {},
        callback
      )

      const downloaded = await downloadFile.downloadAsync();
      return {
        cached: true,
        err: false,
        path: downloaded?.uri,
      }
    } catch (error) {
      return {
        cached: false,
        err: true,
        msg: error,
      }
    }
  }

  const deleteCache : Function = async () : Promise<void> => {
    await FileSystem.deleteAsync(CACHE_DIR);
  }

  return await loadFile()
}   