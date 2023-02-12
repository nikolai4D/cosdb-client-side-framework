import {Controller} from "../core/Controller.mjs";
import {s_Default} from "../generics/models/s_Default.mjs";
import {Architect} from "../cms/Architect.mjs";


console.log('Hello World');

let Schema = s_Default

export function v_Start() {
    Controller.call(this)

    this.title = "Start"
    this.schema = Schema

}

let controller = new v_Start()


controller.setView()

let archi = new Architect(controller)
document.body.insertAdjacentElement("afterbegin", archi.getPanel(controller))

console.log("schema: ", Schema)