import { apiCallPost } from './apiCalls.mjs'
import { mutation_setAllListData } from '../mutations/mutation_setAllListData.mjs';

export async function action_getAllListDataFromArray({type, urls}) {

    let data = []
    for (const url of urls){
      data.push(...await apiCallPost({url: "api/getListData", body: url}))
    }
      mutation_setAllListData({type, data})
}
