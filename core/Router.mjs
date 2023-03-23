import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
//import model_views
//import controller

export async function Router(viewPath) {
  //validate and authenticate path

  console.log({ viewPath });
  const newView = await apiCallGet(`/auth/${viewPath}`);

  console.log(newView.viewPath);

  window.location.pathname = newView.viewPath;

  //set browser history

  //create view
  //switch view
}
