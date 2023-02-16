export async function writeModel(json) {
  try {
    const response = await fetch("/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    const result = await response.json();
    //console.log(result);
  } catch (error) {
    console.error("An error occurred while saving the file:", error);
  }
}
