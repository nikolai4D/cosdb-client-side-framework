import { apiCallGet } from "../data-mgm/actions/apiCalls.mjs";
//import model_views
//import controller

export async function Router(path) {
  //validate path
  const views = apiCallGet("/read/views");
  console.log(path);
  console.log(views);

  //auth

  //set browser history

  //create view

  //switch view
}
