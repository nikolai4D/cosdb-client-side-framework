import {Controller} from "../../core/Controller.mjs";
import {fetchModel} from "../functions/fetchModel.mjs";
import {Architect} from "../functions/Architect.mjs";
import { View } from "../../core/View.mjs";
import { t_Split } from "../../components/templates/t_Split.mjs";
import { addButton } from "../functions/addButton.mjs";
import { dataContent } from "../functions/dataContent.mjs";


export function Cms_Controller() {

    View.call(this)


    this.title = "CMS"
    const view = "cms"

    let schema = fetchModel()
    console.log(schema)


  const keys = Object.keys(schema);

  const body = document.querySelector("body");

  const buttonsContainer = document.createElement("div");
  body.appendChild(buttonsContainer);

  const contentContainer = document.createElement("div");
  body.appendChild(contentContainer);

  addButton(contentContainer, buttonsContainer, keys);
  dataContent(contentContainer, schema);


    this.template = new t_Split(view);
    // Controller.call(this)
    // this.schema = schema
    // let archi = new Architect()
    // document.body.insertAdjacentElement("afterbegin", archi.getPanel())


}


// console.log("schema: ", Schema)


