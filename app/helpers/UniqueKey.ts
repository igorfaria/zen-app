import md5 from 'md5'

export const randomKey : Function = () : string => {
  return Math.random().toString(36).substr(Math.random() >= 0.5 ? 0 : 2, Math.random() >= 0.5 ? 9 : 12) + md5(Date.now().toString())
}

export const UniqueKey : Function = (quantity : number = 1, usedKeys : string[] = []) : string | string[] => {
 
  let finalKey : string[] | string = []

  while(finalKey.length != 10) finalKey.push(randomKey()) 

  if(Math.random() >= 0.5) {
    finalKey.reverse()
    finalKey = md5(finalKey.join(md5(Date.now().toString())))
  } else {
    finalKey = md5(finalKey.join(randomKey()))
  }
  
  if(finalKey in usedKeys) return UniqueKey(usedKeys)
  usedKeys.push(finalKey)

  const multipleKeys : string[] = []
  if(quantity > 0){
     multipleKeys.push(finalKey)
     return UniqueKey(quantity--, multipleKeys)
  }

  if(multipleKeys.length) return multipleKeys

  return finalKey
}