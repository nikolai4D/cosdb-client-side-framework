export async function readModel() {
    try {
      const response = await fetch("/read");
      // console.log(response);
  
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("An error occurred while fetching the data:", error);
    }
  }
