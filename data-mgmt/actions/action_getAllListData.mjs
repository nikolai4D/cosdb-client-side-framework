// import {URL_PROCESS_1, URL_PROCESS_2} from '../constants.js';
import { apiCallGet } from './apiCalls.mjs'

export async function action_getAllListData() {

      const response =  await apiCallGet("api/");

      console.log(response)

      return [{"title": data}]

      // const firstProcess =  await apiCallGet(URL_PROCESS_1);
      // const secondProcess = await apiCallGet(URL_PROCESS_2)

      // return [...firstProcess, ...secondProcess]
}