import {API_KEY} from '../constants.js';

export const GET_ALL_PROCESSES = async () => {
        const response = await fetch('https://uc1.cosdb.io/api/typeData?parentId=co_140ca73c-1275-4fa5-8e74-fa71e845afe3', {
          method: 'get',
        //   body: myBody, // string or object
          headers: {
            'Content-Type': 'application/json',
            'apikey': `${API_KEY}`
          },
        });
        const myJson = await response.json();
        console.log(myJson);
}