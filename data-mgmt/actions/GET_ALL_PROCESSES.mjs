import {URL_PROCESS_1, URL_PROCESS_2} from '../constants.mjs';
import { apiCallGet } from './apiCalls.mjs'

export const GET_ALL_PROCESSES = async () => {
      const firstProcess =  await apiCallGet(URL_PROCESS_1);
      const secondProcess = await apiCallGet(URL_PROCESS_2)

      return [...firstProcess, ...secondProcess]
}

