import {constructorMap} from "../cms/constructorMap.mjs";

/**
 * Take a string and make it into an HTML element.
 * !!! Do not work with sub table tags (tr, td, thead, tbody) !!!
 * @param {string} string
 * @returns {Element}
 */
export function stringToHTMLElement (string) {

    const frame = document.createElement("div");

    frame.insertAdjacentHTML("afterbegin", string);

    return frame.firstElementChild
}


export function buildComponentFromSchema(componentSchema, parentSchema = null, name = "root") {

    try {
        let constructor = constructorMap.get(componentSchema.constructorKey)

        if(!constructor) {
            console.warn(`Component type ${componentSchema.constructorKey} not found in componentsMap`)
            return null
        }

        let component = new constructor(componentSchema.options)
        component.options = componentSchema.options
        component.id = name
        componentSchema.id = name
        for (let subComponent in componentSchema.subComponents) {
            if(componentSchema.subComponents[subComponent]) {
                component.subComponents[subComponent] = buildComponentFromSchema(componentSchema.subComponents[subComponent], componentSchema, name + "__" + subComponent)
            }
        }

        return component

    } catch (e) {
        let key = (!parentSchema) ? "template" : Object.keys(parentSchema.subComponents).find(key => parentSchema.subComponents[key] === componentSchema)

        console.error(`Error while creating component ${key}: ${e}`)
    }
}

export function buildSchemaFromComponent(component) {

    let subComponentsSchema = {}
    for (let key in component.subComponents) {
        if(!component.subComponents[key]) {
            console.warn(`No subComponent found for key ${key} in component ${component.id}`)
            subComponentsSchema[key] = {
                constructorKey: null,
                options: {},
                subComponents: {},
                id: component.id + "__" + key
            }
        }
        else {
            subComponentsSchema[key] = buildSchemaFromComponent(component.subComponents[key])
        }
    }

    return {
        "options": component.options,
        "constructorKey": component.constructorKey,
        "subComponents": subComponentsSchema,
        "id": component.id,
    }
}