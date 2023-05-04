import { apiCallGet } from "./apiCalls.mjs";
import { transformer_trimAllElements } from "../etl/transfomer_trimAllElements.mjs";
import { transformer_groupByFirstLetter } from "../etl/transformer_groupByFirstLetter.mjs";
import { mutation_setAllListData } from "../mutations/mutation_setAllListData.mjs";
import { mutation_setParentIds } from "../mutations/mutation_setParentIds.mjs";

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

  //trim all elements
  const listDataTrimmed = await transformer_trimAllElements(listData, "title");

  //group by first letter
  const listDataGroupedByFirstLetter = await transformer_groupByFirstLetter(
    listDataTrimmed
  );

  //set state
  await mutation_setAllListData("items", listDataGroupedByFirstLetter);
  await mutation_setParentIds("parentIds", parentIds);
}
