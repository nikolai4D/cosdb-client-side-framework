export async function getComponentsHierarchy(path) {
  try {
    let getPath = "";
    if (path) {
      getPath = "?path=" + path;
    }
    const response = await fetch("componentsdir" + getPath);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}
