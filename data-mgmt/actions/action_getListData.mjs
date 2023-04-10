import { apiCallGet } from "./apiCalls.mjs";
import { State } from "../State.mjs";

export async function action_getAllListDataWithHeaders(type, parentIds = []) {
  //for each parent id, get the list data

  const listData = [];

  for (const parentId of parentIds) {
    try {
      const data = await apiCallGet({ url: `api/${type}/${parentId}` });

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
  const structuredData = listData.reduce((accumulator, currentValue) => {
    const letter = currentValue.title[0].toUpperCase();
    const group = accumulator.find((item) => item.header === letter);
    if (group) {
      group.content.push(currentValue.title);
    } else {
      accumulator.push({ header: letter, content: [currentValue.title] });
    }
    return accumulator;
  }, []);

  //set state
  State.items = structuredData;
}
