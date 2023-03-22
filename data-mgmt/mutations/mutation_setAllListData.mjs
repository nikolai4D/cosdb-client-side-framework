import { State } from "../state.mjs";
import { transformer_trimAllElements } from "../etl/transfomer_trimAllElements.mjs";
import { transformer_groupByFirstLetter } from "../etl/transformer_groupByFirstLetter.mjs";

export async function mutation_setAllListData({type, data}) {

    let trimmedData = await transformer_trimAllElements(data, "title")
    console.log(trimmedData, data)
    let sortedData = await transformer_groupByFirstLetter(trimmedData)

    console.log(sortedData)

    State[type] = sortedData;

}