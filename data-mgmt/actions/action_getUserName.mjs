export async function getUserName () {
    let accessToken = sessionStorage.getItem("accessToken");
    return JSON.parse(atob(accessToken.split('.')[1])).email;
  };