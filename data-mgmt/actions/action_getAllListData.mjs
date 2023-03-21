// import {URL_PROCESS_1, URL_PROCESS_2} from '../constants.js';
import { apiCallGet } from './apiCalls.mjs'

export async function action_getAllListData() {

      const firstProcess =  await apiCallGet("/");
      console.log(firstProcess)

      return [{"title": "test"}]

      // const firstProcess =  await apiCallGet(URL_PROCESS_1);
      // const secondProcess = await apiCallGet(URL_PROCESS_2)

      // return [...firstProcess, ...secondProcess]
}