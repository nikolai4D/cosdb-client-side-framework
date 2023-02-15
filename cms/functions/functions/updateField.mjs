export function updateObjectById(json, id, newValue) {
  const stack = [json];
  while (stack.length > 0) {
    const obj = stack.pop();
    for (const [key, value] of Object.entries(obj)) {
      if (key.endsWith("Id") && value === id) {
        const targetKey = key.replace("Id", "");
        obj[targetKey] = newValue;
      } else if (typeof value === "object") {
        stack.push(value);
      }
    }
  }
  return json;
}
