
export const ArrayShuffle : Function = (items : object[]) : object[] => {
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

export  const ArrayRandomize : Function = (items : object[]) => {
    const usedIndex : number[] = []
    const randomItems : object[] = []
    while(randomItems.length != items.length){
       const randomIndex : number = NumberRandom(0, items.length-1)
       if(randomIndex in usedIndex) continue
       usedIndex.push(randomIndex)
       const randomItem : object = items[randomIndex]
       if(typeof randomItem != 'undefined') randomItems.push(randomItem)
    }
    return randomItems
}

export const RandomItems : Function = (items : object[], max : number) : object[] => {
    const shuffled : object[] = ArrayShuffle(items)
    const total = (items.length - max) < max ? max = items.length : max
    const randomized = ArrayRandomize(shuffled)
    return randomized.slice(0, total)
 }

export const NumberRandom : Function = (min: number, max: number) : number  => {
    return  Math.floor(Math.random() * (max - min + 1)) + min
}