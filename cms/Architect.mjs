import {constructorMap} from "./constructorMap.mjs";
import {buildArchitectPanel, buildElementPanelFromSchema} from "./PanelBuilder.mjs";
import {buildSchemaFromComponent} from "../core/helpers.mjs";

export function Architect(controller = null) {

    this.schema = {
        metadata:{
            "title": "Default",
            "url": "/",
        },
        root: {}
    }

    if (controller) {
        this.schema.root = buildSchemaFromComponent(controller.view)
    }

    this.controller = controller
    this.panel = this.getPanel()

}

Architect.prototype.getPanel = function() {
    this.panel = buildArchitectPanel(this.schema.root, this, constructorMap)
    return this.panel
}

Architect.prototype.outputJSON = function() {

    // This is for test purpose, but in the end it should probably output the json to the server which will store it.

    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.schema, null, 2));

    const a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'data.json';
    a.innerHTML = 'download JSON';

    a.click();
}

Architect.prototype.onConstructorUpdate = function(id, newConstructorKey) {

    let constructor = constructorMap.get(newConstructorKey)
    let component = new constructor()
    if(!component) throw new Error(`Component type ${newConstructorKey} not found in componentsMap`)
    component.id = id

    // swap schema
    let newSchema = buildSchemaFromComponent(component)
    let {parentSchema, key, schema} = getSchemaDataFromId(id, this.schema.root)

    if(!parentSchema && !key && schema){
        this.schema.root = newSchema
        this.controller.schema = newSchema
    }
    else{ 
        parentSchema.subComponents[key] = newSchema
        { 
            let {parentSchema, key, schema} = getSchemaDataFromId(id, this.controller.schema)
            parentSchema.subComponents[key] = newSchema
        }
    }

    // swap panel
    let newPanel = buildElementPanelFromSchema(newSchema, this, constructorMap)
    let panel = this.panel.querySelector(`[data-id="${id}"]`)
    panel.replaceWith(newPanel)

    // swap component
    document.getElementById("root").remove();
    this.controller.setView()
}


Architect.prototype.onOptionUpdate = function(id, optionKey, optionValue) {
    this.controller.updateComponentOption(id, optionKey, optionValue)
}

/**
 * @param id
 * @param rootSchema
 * @returns {parentSchema, key, schema}
 */
export function getSchemaDataFromId(id, rootSchema) {
    if(rootSchema.id === id) return { parentSchema: null, key: null, schema: rootSchema }

    for (let key in rootSchema.subComponents) {
        if(rootSchema.subComponents[key].id === id) {
            return { parentSchema: rootSchema, key: key, schema: rootSchema.subComponents[key] }
        }

        let result = getSchemaDataFromId(id, rootSchema.subComponents[key])
        if(result) return result
    }
}