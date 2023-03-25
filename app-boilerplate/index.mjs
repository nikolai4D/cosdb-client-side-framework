import {Router, route} from "../core/Router.mjs";
import {Controller} from "./helpers/Controller.mjs";
import { readModel } from "./helpers/readModel.mjs";

readModel();

const path = window.location.pathname.slice(1)
export const router = new Router([
    route(path, Controller)
])

router.goTo(path)