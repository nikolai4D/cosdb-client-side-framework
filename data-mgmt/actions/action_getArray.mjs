export function action_getArray(parameters = null) {
  console.log(parameters);
  const getParams = JSON.parse(parameters);
  if (Array.isArray(getParams)) {
    return getParams;
  } else {
    return "no array";
  }
}
