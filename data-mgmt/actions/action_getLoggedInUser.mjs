export async function action_getLoggedInUser() {
    let accessToken = sessionStorage.getItem("accessToken");
    const email = JSON.parse(atob(accessToken.split('.')[1])).email;
    return email
  };