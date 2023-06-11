export async function action_getUsername() {
    let accessToken = sessionStorage.getItem("accessToken");
    const email = JSON.parse(atob(accessToken.split('.')[1])).email;
    console.log(email)
    return email
  };