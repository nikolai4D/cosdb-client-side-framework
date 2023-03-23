import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
//import model_views
//import controller

export async function Router(viewPath) {
  //validate and authenticate path

  const newView = await apiCallGet(`/auth/${viewPath}`);
  console.log("newView", newView);

  window.location.pathname = await newView;

  //set browser history

  //create view
  //switch view
}
