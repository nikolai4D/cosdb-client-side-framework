export async function apiCallGet(url) {
    const response = await fetch(url, {
      method: 'get',
      //   body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json'
            },
    });
    return await response.json();
  }
  