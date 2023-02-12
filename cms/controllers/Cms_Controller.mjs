import {Controller} from "../../core/Controller.mjs";
import {fetchModel} from "../functions/fetchModel.mjs";
import {Architect} from "../functions/Architect.mjs";

export async function Cms_Controller() {
    let schema = await fetchModel()
    console.log(schema)

    // Controller.call(this)
    // this.schema = schema
    let archi = new Architect()
    document.body.insertAdjacentElement("afterbegin", archi.getPanel())


}


// console.log("schema: ", Schema)