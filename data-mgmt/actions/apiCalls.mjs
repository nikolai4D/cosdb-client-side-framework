export async function apiCallGet(url) {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
            },
    });
    return await response.json();
  }
  
