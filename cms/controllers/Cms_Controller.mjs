import {Controller} from "../../core/Controller.mjs";
import {fetchModel} from "../functions/fetchModel.mjs";
import {Architect} from "../functions/Architect.mjs";

let schema = fetchModel()
console.log(schema)


// let archi = new Architect(controller)
// document.body.insertAdjacentElement("afterbegin", archi.getPanel(controller))

// console.log("schema: ", Schema)