import { State } from "../State.mjs";
import { apiCallGet } from "./apiCalls.mjs";
export async function action_getParentsList() {

    const parents = State.parentIds;

    const parentsList = [];

    for (const parent of parents) {
      const url = `api/getById/object/${parent}`;
      try {
        const data = await apiCallGet(url);

        if (Array.isArray(data)) {
          parentsList.push(...data);
        } else {
          parentsList.push(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return parentsList;
}