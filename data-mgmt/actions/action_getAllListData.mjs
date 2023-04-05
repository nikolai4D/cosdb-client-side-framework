import { apiCallPost } from './apiCalls.mjs'
import { mutation_setAllListData } from '../mutations/mutation_setAllListData.mjs';

export async function action_getAllListData({type, url}) {

      console.log(url)
      const data =  await apiCallPost({url: "api/getListData", body: url});
      console.log(data)
      mutation_setAllListData({type, data})
}
