import {API_KEY} from '../constants.js';

export const GET_ALL_PROCESSES = async () => {
    console.log(API_KEY);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
          method: 'get',
        //   body: myBody, // string or object
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json();
        console.log(myJson);
}