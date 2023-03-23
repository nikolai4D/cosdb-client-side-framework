import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
//import model_views
//import controller

export async function Router(path) {
  //validate and authenticate path

  const newView = await apiCallGet(`/auth/${path}`);

  window.location.pathname = newView;

  //set browser history

  //create view
  //switch view
}
