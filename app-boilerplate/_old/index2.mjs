import { Router, route } from "../../core/Router.mjs";
import { Controller } from "./helpers/Controller.mjs";
import { readModel } from "./helpers/readModel.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";

const path = window.location.pathname.slice(1);
console.log("path: ", path);

readModel();

export const router = new Router([route(path, Controller)]);

router.goTo(path);
