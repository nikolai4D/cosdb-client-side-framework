export async function getUuid() {
  try {
    const response = await fetch("/getuuid");
    // const data = await response.json();
    //console.log(data);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
}
