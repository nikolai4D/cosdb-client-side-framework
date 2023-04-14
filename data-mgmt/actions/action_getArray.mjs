export function action_getArray(parameters = null) {
  //add JSON.parse try catch here
  if (Array.isArray(parameters)) {
    return parameters;
  } else {
    return "no array";
  }
}
