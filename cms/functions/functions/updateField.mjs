export function updateField(json, idKey, idValue, newValue) {
  // Loop over all the objects in the JSON
  for (const prop in json) {
    if (typeof json[prop] === "object") {
      // If this is an object, recursively call the same function on it
      updateField(json[prop], idKey, idValue, newValue);
    } else if (prop === idKey && json[prop] === idValue) {
      // If this is the object we want to update, update the specified key
      if (idKey === "option" && prop === "atomId") {
        json[prop] = newValue;
      } else if (prop === "option") {
        json[prop] = newValue;
      }
    } else if (prop.startsWith("function") && typeof json[prop] === "object") {
      // If this is a function object, recursively call the function on it
      updateField(json[prop], idKey, idValue, newValue);
    }
  }
  return json;
}
