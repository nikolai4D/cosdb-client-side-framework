import { readComponents } from "../requests/readComponents.mjs";

export async function getComponents(types) {
    let allComponents = {}

    for (const type of types) {
    
        let components = await readComponents(type)
    
            for (const component of components) {
                allComponents[type] = component;
        }
    }

    return allComponents;
}