import {Controller} from "../../core/Controller.mjs";
import {fetchModel} from "../functions/fetchModel.mjs";
import {Architect} from "../functions/Architect.mjs";
import { View } from "../../core/View.mjs";
import { t_Split } from "../../components/templates/t_Split.mjs";

export function Cms_Controller() {

    View.call(this)

    this.title = "CMS"
    const view = "cms"

    let schema = fetchModel()
    console.log(schema)

    this.template = new t_Split(view);
    // Controller.call(this)
    // this.schema = schema
    // let archi = new Architect()
    // document.body.insertAdjacentElement("afterbegin", archi.getPanel())


}


// console.log("schema: ", Schema)


