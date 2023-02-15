export function updateField(json, id, newValue) {
  // Loop over all the objects in the JSON
  for (const prop in json) {
    if (typeof json[prop] === "object") {
      // If this is an object, recursively call the same function on it
      updateObjectById(json[prop], id, newValue);
    } else if (prop.endsWith("Id") && json[prop] === id) {
      // If this is the object we want to update, update the specified value
      const updateKey = prop.replace("Id", "");
      json[updateKey] = newValue;
    } else if (prop.startsWith("function") && typeof json[prop] === "object") {
      // If this is a function object, recursively call the function on it
      updateObjectById(json[prop], id, newValue);
    } else if (prop === "option" && json["atomId"] === id) {
      // If this is an atom object, update the option value
      json[prop] = newValue;
    }
  }
  return json;
}
