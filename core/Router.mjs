import { apiCallGet } from "../data-mgmt/actions/apiCalls.mjs";
//import model_views
//import controller

async function Router(path) {
  //validate path
  const views = await apiCallGet("/read/views");
  console.log(path);
  const isValidPath = validatePath(path, views);
  console.log(isValidPath);
  //auth
  //set browser history
  //create view
  //switch view
}

function validatePath(path, views) {
  return views.some((view) => view.value === path);
}
