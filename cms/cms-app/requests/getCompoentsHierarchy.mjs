export async function getComponentsHierarchy(path) {
  try {
    const response = await fetch("/dir?path=" + path);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}
