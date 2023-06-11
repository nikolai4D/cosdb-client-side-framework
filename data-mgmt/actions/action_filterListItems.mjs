import { State } from "../State.mjs";

export async function action_filterListItems(filter = "") {
  const arrayOfData = await State.items;
  
  let filteredData = filter === "" 
    ? arrayOfData 
    : arrayOfData
        .map((group) => ({
          header: group.header, 
          content: group.content.filter((item) => item.title.toLowerCase().includes(filter.toLowerCase()))
        }))
        .filter((group) => group.content.length > 0);
  
  return filteredData
}

