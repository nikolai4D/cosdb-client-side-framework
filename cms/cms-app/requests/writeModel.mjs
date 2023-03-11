export async function writeModel(state) {
  console.log("writeModel: ", state);
  try {
    const response = await fetch("/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //body: await JSON.stringify(state),
      body: state,
    });
    const result = await response.json();
    return await result;
  } catch (error) {
    console.error("An error occurred while saving the file:", error);
  }
}
