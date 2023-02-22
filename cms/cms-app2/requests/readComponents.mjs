export async function readComponents(type) {
    try {
      const response = await fetch(`/componentsdir/${type}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  }
  