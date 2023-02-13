export async function writeModel() {
  const data = {};
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    data[input.id] = input.value;
  });
  try {
    const response = await fetch("/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    //console.log(result);
  } catch (error) {
    console.error("An error occurred while saving the file:", error);
  }
}
