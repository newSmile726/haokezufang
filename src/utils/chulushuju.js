export const resolveIndex = (arr) => {
  const newArr = []
  arr.forEach((item) => {
    newArr.push(item.short.substr(0, 1).toUpperCase())
  })
  return Array.from(new Set(newArr)).sort()
}
export const resolveData = (arr1, arr2) => {
  const newArr = []
  arr1.forEach((item) => {
    newArr.push(
      arr2.filter((ele) => ele.short.substr(0, 1).toUpperCase() === item)
    )
  })
  return newArr
}
