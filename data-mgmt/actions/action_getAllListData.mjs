import { apiCallGet } from './apiCalls.mjs'

export async function action_getAllListData() {

      const response =  await apiCallGet("api/");

      return [{"title": response}]

}
