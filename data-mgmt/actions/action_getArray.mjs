export function action_getArray(parameters = null) {
  if (Array.isArray(parameters)) {
    return parameters;
  } else {
    return [];
  }
}
