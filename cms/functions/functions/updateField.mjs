export function updateField(json, id, newValue) {
  // Loop over all the objects in the JSON
  for (const prop in json) {
    if (typeof json[prop] === "object") {
      // If this is an object, recursively call the same function on it
      updateField(json[prop], id, newValue);
    } else if (prop.endsWith("Id") && json[prop] === id) {
      // If this is the object we want to update, update the specified value
      const updateKey = prop.replace("Id", "");
      if (updateKey === "atom" && json.hasOwnProperty("option")) {
        // If this is an atom object, update the option value
        json["option"] = newValue;
      } else if (updateKey === "function" && json.hasOwnProperty("option")) {
        // If this is a function object, update the option value
        json["option"] = newValue;
      } else if (prop === "option") {
        // If this is the option property, update the value
        json[prop] = newValue;
      } else {
        // Update the specified value for any other property
        json[updateKey] = newValue;
      }
    }
  }
  return json;
}
