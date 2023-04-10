export async function readModel() {
  try {
    const response = await fetch("/read");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}
