import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
//import model_views
//import controller

export async function Router(viewPath) {
  //validate and authenticate path

  console.log({ viewPath });
  const newView = await apiCallGet(`/auth/${viewPath}`);

  console.log(newView.viewPath);

  if (window.location.pathname !== newPath) {
    window.location.pathname = newPath;
  }

  //set browser history

  //create view
  //switch view
}
