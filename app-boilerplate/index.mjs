import {Router, route} from "../core/Router.mjs";
import {Controller} from "./helpers/Controller.mjs";
import { State } from "./State.mjs";
import { readModel } from "./helpers/readModel.mjs";

export const router = new Router([
    route("", Controller)
])

console.log("readModel: ", readModel())

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path)

