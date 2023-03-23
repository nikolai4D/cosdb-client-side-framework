export async function getComponentsHierarchy() {
  try {
    const response = await fetch("/componentsdir");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}
