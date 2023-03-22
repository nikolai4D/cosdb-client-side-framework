import { apiCallPost } from './apiCalls.mjs'
import { mutation_setAllListData } from '../mutations/mutation_setAllListData.mjs';

export async function action_getAllListData(type) {
      const data =  await apiCallPost({url: "api/getListData", body: type});

      mutation_setAllListData({type, data})
}