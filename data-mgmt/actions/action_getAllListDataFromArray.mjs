import { apiCallPost } from './apiCalls.mjs'
import { mutation_setAllListData } from '../mutations/mutation_setAllListData.mjs';

export async function action_getAllListDataFromArray({type, url}) {

    let data = []
    for (const api of url){
      data.push(...await apiCallPost({url: "api/getListData", body: api}))
    }
      mutation_setAllListData({type, data})
}
