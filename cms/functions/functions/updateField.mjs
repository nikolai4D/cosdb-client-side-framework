export function updateField(json, id, newValue) {
  // Loop over all the objects in the JSON
  for (const prop in json) {
    if (typeof json[prop] === "object") {
      // If this is an object, recursively call the same function on it
      updateField(json[prop], id, newValue);
    } else if (prop === "atomId" && json[prop] === id) {
      // If this is an atom object, update the option value
      if (json.hasOwnProperty("option")) {
        json["option"] = newValue;
      }
    } else if (/^function\d+$/.test(prop) && typeof json[prop] === "object") {
      // If this is a function object, update the function on it
      updateField(json[prop], id, newValue);
    } else if (/^function\d+$/.test(prop)) {
      // If this is the function property we want to update, update the value
      json[prop] = newValue;
    } else if (prop.endsWith("Id") && json[prop] === id) {
      // If this is the object we want to update, update the specified value
      const updateKey = prop.replace("Id", "");
      json[updateKey] = newValue;
    }
  }
  return json;
}
