export function action_getArray(parameters) {
  if (Array.isArray(parameters)) {
    return parameters;
  } else {
    return [];
  }
}
