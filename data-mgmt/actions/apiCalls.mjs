import { API_KEY } from "../constants.mjs";

async function apiCallGet(url) {
    const response = await fetch(url, {
      method: 'get',
      //   body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json',
        'apikey': `${API_KEY}`
      },
    });
    return await response.json();
  }
  