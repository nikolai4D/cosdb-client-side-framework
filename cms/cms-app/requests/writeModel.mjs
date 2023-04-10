export async function writeModel(state) {
  const sendState = await state;

  try {
    const response = await fetch("/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: await JSON.stringify(sendState),
    });
    const result = await response.json();
    return await result;
  } catch (error) {
    console.error("An error occurred while saving the file:", error);
  }
}
