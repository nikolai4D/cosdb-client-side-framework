export async function apiCallGet(url) {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
            },
    });
    return await response.json();
  }


export async function apiCallPost({url, body}) {
    const response = await fetch(url, {
      method: 'post',
      body,
      headers: {
        'Content-Type': 'application/json'
            },
      credentials: "include",
      body: JSON.stringify({ body })
    });
    return await response.json();
  }
  