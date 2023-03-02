import {Router, route} from "../node_modules/cosdb-client-framework/core/Router.mjs";
import {Controller} from "../helpers/Controller.mjs";

console.log("HELLO")
export const router = new Router([
    route("", Controller)
])

const path = window.location.pathname.slice(1)
console.log("path: " , path)

router.goTo(path)

