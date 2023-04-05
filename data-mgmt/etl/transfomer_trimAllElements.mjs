export function transformer_trimAllElements(data, aKey) {
    return data.map((item) => {
        item[aKey].trim()
        console.log(item[aKey].trim())
        return item
      })
}