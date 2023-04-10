import { apiCallGet } from "./apiCalls.mjs";
import { State } from "../State.mjs";

export async function action_getAllListDataWithHeaders({
  type = "type",
  parentIds = [],
}) {
  console.log(type, parentIds);
  //for each parent id, get the list data

  const listData = [];

  for (const parentId of parentIds) {
    console.log(parentId);
    const url = `api/${type}/${parentId}`;
    console.log(url);
    try {
      const data = await apiCallGet(url);
      console.log(data);

      if (Array.isArray(data)) {
        listData.push(...data);
      } else {
        listData.push(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //transform data with header and content with array of titles
  const structuredData = listData
    .reduce((accumulator, currentValue) => {
      const letter = currentValue.title[0].toUpperCase();
      const group = accumulator.find((item) => item.header === letter);
      if (group) {
        group.content.push(currentValue.title);
      } else {
        accumulator.push({ header: letter, content: [currentValue.title] });
      }
      return accumulator;
    }, [])
    .sort((a, b) => a.header.localeCompare(b.header));

  //set state
  State.items = await structuredData;
  console.log(State);
}
