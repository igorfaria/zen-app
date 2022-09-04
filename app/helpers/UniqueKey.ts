import md5 from 'md5'

export const UniqueKey : Function = (usedKeys : string[] = []) : string => {
  let finalKey : string[] | string = []

  while(finalKey.length != 5){
    finalKey.push(
      Math.random().toString(36).substr(2, 9) + Date.now().toString()
    )
  }

  if(Math.random () >= 0.5) finalKey.reverse()
  finalKey = finalKey.join((Date.now()).toString())
  finalKey = md5(finalKey)
  
  if(finalKey in usedKeys) return UniqueKey(usedKeys)
  usedKeys.push(finalKey)
  
  return finalKey
}