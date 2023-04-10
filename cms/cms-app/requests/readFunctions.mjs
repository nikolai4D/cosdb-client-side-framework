export async function readFunctions(type) {
    try {
      const response = await fetch(`/functions`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  }
  