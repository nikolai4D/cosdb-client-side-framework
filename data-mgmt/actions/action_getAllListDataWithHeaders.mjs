import { apiCallGet } from "./apiCalls.mjs";
import { State } from "../State.mjs";
import { transformer_trimAllElements } from "../etl/transfomer_trimAllElements.mjs";
import { transformer_groupByFirstLetter } from "../etl/transformer_groupByFirstLetter.mjs";
import { mutation_setAllListData } from "../mutations/mutation_setAllListData.mjs";

export async function action_getAllListDataWithHeaders({
  type = "type",
  parentIds = [],
}) {
  //for each parent id, get the list data

  const listData = [];

  for (const parentId of parentIds) {
    const url = `api/${type}/${parentId}`;
    try {
      const data = await apiCallGet(url);

      if (Array.isArray(data)) {
        listData.push(...data);
      } else {
        listData.push(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //transform data with header and content with array of title

  const structuredData = listData
    .reduce((accumulator, currentValue) => {
      const letter = currentValue.title[0].toUpperCase();
      const group = accumulator.find((item) => item.header === letter);
      if (group) {
        group.content.push(currentValue);
      } else {
        accumulator.push({
          header: letter,
          content: [currentValue],
        });
      }
      return accumulator;
    }, [])
    .sort((a, b) =>
      a.header.localeCompare(b.header, "sv", { sensitivity: "base" })
    );

  //set state
  State.items = await structuredData;
  console.log(State);
}
