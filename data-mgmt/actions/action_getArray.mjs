export function action_getArray(parameters = null) {
  console.log(parameters);

  if (Array.isArray(parameters)) {
    return parameters;
  } else {
    return "no array";
  }
}
