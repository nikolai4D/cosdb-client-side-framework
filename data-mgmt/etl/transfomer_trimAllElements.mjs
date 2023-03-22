export function transformer_trimAllElements(data, aKey) {
    return data.map((item) => {
        return item[aKey].trim()
      })
}