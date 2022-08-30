
export const shuffleArray : Function = (items : object[]) : object[] => {
  let shuffled : object[] = []
  items.forEach(item => {
      if(Math.random() >= 0.5){
        shuffled = [...shuffled, item]
      } else {
        shuffled = [item, ...shuffled]
      }
  })  
  return shuffled
}

export  const randomizeArray : Function = (items : object[]) => {
    const usedIndex : number[] = []
    const randomItems : object[] = []
    for(let i = 0; i < items.length; i++){
       const randomIndex : number = randomNumber(0, items.length)
       if(randomIndex in usedIndex) continue
       usedIndex.push(randomIndex)
       const randomItem : object = items[randomIndex]
       randomItems.push(randomItem)
    }
    return randomItems
}

export const randomItems : Function = (items : object[], max : number) : object[] => {
    const shuffled : object[] = shuffleArray(items)
    const total = (items.length - max) < max ? max = items.length : max
    const randomized = randomizeArray(shuffled)
    return randomized.slice(0, total)
 }

export const randomNumber : Function = (min: number, max: number) : number  => {
    return  Math.floor(Math.random() * (max - min + 1)) + min
}